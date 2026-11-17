"""Check a Playwright HTML/JSON matrix without opening a browser."""

import argparse
import base64
import io
import json
import re
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path
from zipfile import BadZipFile, ZipFile


BROWSERS = ("chromium", "firefox", "webkit")
STATUSES = ("expected", "unexpected", "flaky", "skipped")
REPORT_DATA = re.compile(
    r'<template id="playwrightReportBase64">data:application/zip;base64,'
    r'([A-Za-z0-9+/=\s]+)</template>'
)
MARKERS = {
    "bearer": re.compile(rb"\bBearer\s+[A-Za-z0-9_.~-]{16,}", re.IGNORECASE),
    "jwt": re.compile(rb"\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b"),
    "password-field": re.compile(rb'"(?:password|passwd)"\s*:\s*"[^"\\]{4,}"', re.IGNORECASE),
    "fixture-password": re.compile(rb"HW04-[a-f0-9-]{36}!Aa1", re.IGNORECASE),
}


def specs(suites):
    for suite in suites:
        yield from suite.get("specs", [])
        yield from specs(suite.get("suites", []))


def open_html_report(path):
    match = REPORT_DATA.search(path.read_text(encoding="utf-8"))
    if not match:
        raise ValueError("expected the embedded Playwright HTML reporter archive")
    return ZipFile(io.BytesIO(base64.b64decode(match[1])))


def credential_markers(content):
    return {label for label, pattern in MARKERS.items() if pattern.search(content)}


def check_title(title, feature, browser, actor):
    parts = title.split(" | ") if isinstance(title, str) else []
    if len(parts) != 4 or parts[0] != actor or parts[2:] != [feature, browser]:
        raise ValueError("title actor, feature or browser does not match")
    timestamp = parts[1]
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z", timestamp):
        raise ValueError("title has no ISO UTC timestamp")
    datetime.fromisoformat(timestamp.replace("Z", "+00:00"))


def attachment_markers(folder):
    files = (folder / "html" / "data").rglob("*")
    suspected = set()
    for path in files:
        if not path.is_file():
            continue
        suffix = path.suffix.lower()
        if suffix == ".zip":
            with ZipFile(path) as archive:
                for member in archive.infolist():
                    if not member.is_dir() and Path(member.filename).suffix.lower() not in {
                        ".png", ".jpg", ".jpeg", ".webp", ".mp4", ".webm",
                    }:
                        suspected.update(credential_markers(archive.read(member)))
        elif suffix in {".trace", ".network", ".json", ".txt", ".md", ".har", ".log"}:
            suspected.update(credential_markers(path.read_bytes()))
    return suspected


def check_cell(folder, feature, browser, expected_count, actor, scan):
    json_bytes = (folder / "results.json").read_bytes()
    raw = json.loads(json_bytes)
    issues = set()
    with open_html_report(folder / "html" / "index.html") as archive:
        html = json.loads(archive.read("report.json"))
        if scan:
            issues.update(credential_markers(json_bytes))
            for member in archive.namelist():
                if member.endswith(".json"):
                    issues.update(credential_markers(archive.read(member)))
            issues.update(attachment_markers(folder))
    check_title(html.get("options", {}).get("title"), feature, browser, actor)
    if html.get("projectNames") != [browser]:
        raise ValueError("HTML report project does not match the selected browser")
    if raw.get("errors") or html.get("errors"):
        raise ValueError("report contains runner-level errors")
    started = datetime.fromisoformat(raw["stats"]["startTime"].replace("Z", "+00:00"))
    if started.tzinfo is None or round(started.timestamp() * 1000) != html["startTime"]:
        raise ValueError("HTML and JSON come from different run times")

    verdicts = {}
    counts = Counter()
    for spec in specs(raw["suites"]):
        title = spec["title"].strip()
        if not title:
            raise ValueError("test has no title or leading case ID")
        records = spec.get("tests", [])
        if len(records) != 1 or records[0].get("projectName") != browser:
            raise ValueError("each case must have one record for the selected browser")
        case_id = title.split()[0]
        if case_id in verdicts:
            raise ValueError(f"duplicate case ID {case_id}")
        record = records[0]
        outcome = record.get("status")
        attempts = [trial.get("status") for trial in record.get("results", [])]
        if record.get("expectedStatus") != "passed":
            raise ValueError(f"{case_id} has a test annotation that changes the expected status")
        if outcome not in ("expected", "unexpected") or len(attempts) != 1:
            raise ValueError(f"{case_id} has an incomplete, skipped, flaky or retried execution")
        if outcome == "expected" and attempts != ["passed"]:
            raise ValueError(f"{case_id} is marked expected without an actual pass")
        if outcome == "unexpected" and attempts != ["failed"]:
            raise ValueError(f"{case_id} stopped before a normal fail result")
        verdicts[case_id] = outcome
        counts[outcome] += 1

    if len(verdicts) != expected_count or html["stats"]["total"] != expected_count:
        raise ValueError(f"expected {expected_count} cases, found {len(verdicts)} in JSON")
    for status in STATUSES:
        if counts[status] != raw["stats"][status] or counts[status] != html["stats"][status]:
            raise ValueError(f"HTML/JSON count differs for status {status}")

    html_tests = [test for file in html["files"] for test in file["tests"]]
    html_verdicts = {test["title"].split()[0]: test["outcome"] for test in html_tests}
    if len(html_tests) != expected_count or html_verdicts != verdicts:
        raise ValueError("case IDs or verdicts differ between HTML and JSON")

    return set(verdicts), counts, sorted(issues)


def parse_mapping(values, label, parser):
    mapping = {}
    for value in values:
        name, separator, payload = value.partition("=")
        if not separator or not re.fullmatch(r"[A-Za-z][A-Za-z0-9_-]*", name) or not payload:
            parser.error(f"{label} must be FEATURE=value")
        key = name.upper()
        if key in mapping:
            parser.error(f"duplicate {label} for {key}")
        mapping[key] = payload
    return mapping


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=("draft", "official"), required=True)
    parser.add_argument("--student-id", help="required for official mode")
    parser.add_argument("--batch", type=Path, required=True, help="default batch directory")
    parser.add_argument("--feature-batch", action="append", default=[], metavar="FEATURE=PATH")
    parser.add_argument("--expect", required=True, action="append", metavar="FEATURE=COUNT")
    parser.add_argument("--scan-attachments", action="store_true")
    args = parser.parse_args(argv)

    if args.mode == "official" and not re.fullmatch(r"[0-9]{8}", args.student_id or ""):
        parser.error("--mode official requires an eight-digit --student-id")
    actor = "Draft run by: Codex" if args.mode == "draft" else f"Run by: {args.student_id}"
    expectations = parse_mapping(args.expect, "--expect", parser)
    batches = parse_mapping(args.feature_batch, "--feature-batch", parser)
    if not batches.keys() <= expectations.keys():
        parser.error("--feature-batch references a feature absent from --expect")

    totals = Counter()
    errors = 0
    for feature, count in expectations.items():
        if not re.fullmatch(r"[1-9]\d*", count):
            parser.error(f"case count for {feature} must be a positive integer")
        reference_ids = None
        for browser in BROWSERS:
            folder = Path(batches.get(feature, args.batch)) / feature.lower() / browser
            try:
                ids, stats, markers = check_cell(
                    folder, feature, browser, int(count), actor, args.scan_attachments,
                )
                if reference_ids is None:
                    reference_ids = ids
                elif ids != reference_ids:
                    raise ValueError("case IDs differ across browsers")
                totals.update(stats)
                print(f"{feature}/{browser}: {len(ids)} cases, {stats['expected']} pass, {stats['unexpected']} fail")
                if markers:
                    errors += 1
                    print(f"{feature}/{browser}: inspect attachments for {', '.join(markers)}", file=sys.stderr)
            except (OSError, BadZipFile, TypeError, KeyError, ValueError) as exc:
                errors += 1
                print(f"{feature}/{browser}: {exc}", file=sys.stderr)
    print(f"Totals: {totals.total()} executions, {totals['expected']} pass, {totals['unexpected']} fail")
    return int(errors > 0)


if __name__ == "__main__":
    raise SystemExit(main())
