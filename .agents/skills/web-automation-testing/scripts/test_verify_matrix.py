import base64
import io
import json
import tempfile
import unittest
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path
from zipfile import ZipFile

from verify_matrix import check_cell, main


ACTOR = "Run by: QA CI"


class VerifyMatrixTest(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.folder = Path(temporary.name)
        (self.folder / "html" / "data").mkdir(parents=True)

    def seed(self, *, actor=ACTOR, html_id="INVITES-01", tried="failed", skip=False, html_shift=0,
             step=None, feature="INVITES", project="chromium"):
        outcome = "skipped" if skip else "unexpected"
        counts = dict(expected=0, unexpected=int(not skip), flaky=0, skipped=int(skip))
        raw = {
            "errors": [],
            "stats": {**counts, "startTime": "2026-11-17T00:00:00.000Z"},
            "suites": [{"suites": [{"specs": [{
                "title": f"{feature}-01 verify behavior",
                "tests": [{
                    "projectName": project, "expectedStatus": "passed",
                    "status": outcome, "results": [{"status": tried}],
                }],
            }]}]}],
        }
        html = {
            "projectNames": [project],
            "startTime": 1794873600000 + html_shift,
            "stats": {"total": 1, **counts},
            "files": [{"tests": [{"title": f"{html_id} verify behavior", "outcome": outcome}]}],
            "options": {"title": f"{actor} | 2026-11-17T00:00:00Z | {feature} | {project}"},
        }
        (self.folder / "results.json").write_text(json.dumps(raw), encoding="utf-8")
        packed = io.BytesIO()
        with ZipFile(packed, "w") as archive:
            archive.writestr("report.json", json.dumps(html))
            if step is not None:
                archive.writestr("step-details.json", json.dumps({"title": step}))
        payload = base64.b64encode(packed.getvalue()).decode("ascii")
        report = f'<template id="playwrightReportBase64">data:application/zip;base64,{payload}</template>'
        (self.folder / "html" / "index.html").write_text(report, encoding="utf-8")

    def check(self, scan=False):
        return check_cell(self.folder, "INVITES", "chromium", 1, ACTOR, scan)

    def test_completed_failure_counts(self):
        self.seed()
        cases, counts, markers = self.check()
        self.assertEqual(cases, {"INVITES-01"})
        self.assertEqual(counts["unexpected"], 1)
        self.assertFalse(markers)

    def test_rejects_actor_mismatch(self):
        self.seed(actor="Run by: nightly CI")
        with self.assertRaisesRegex(ValueError, "actor"):
            self.check()

    def test_rejects_same_counts_from_different_cases(self):
        self.seed(html_id="INVITES-02")
        with self.assertRaisesRegex(ValueError, "case IDs"):
            self.check()

    def test_rejects_same_counts_from_different_runs(self):
        self.seed(html_shift=1000)
        with self.assertRaisesRegex(ValueError, "run times"):
            self.check()

    def test_reports_skipped_result(self):
        self.seed(skip=True, tried="skipped")
        with self.assertRaisesRegex(ValueError, "skipped"):
            self.check()

    def test_reports_interrupted_result_instead_of_counting_fail(self):
        self.seed(tried="interrupted")
        with self.assertRaisesRegex(ValueError, "stopped"):
            self.check()

    def test_scans_nested_attachments_without_returning_values(self):
        self.seed()
        path = self.folder / "html" / "data" / "trace.zip"
        with ZipFile(path, "w") as attachment:
            attachment.writestr("network.trace", '{"Authorization":"Bearer synthetic-no-secret-value"}')
        self.assertEqual(self.check(scan=True)[2], ["bearer"])

    def test_custom_credential_pattern_scans_embedded_steps(self):
        batch = self.folder
        self.folder = batch / "invites" / "chromium"
        (self.folder / "html").mkdir(parents=True)
        self.seed(step='Fill "synthetic-credential-1234"')
        stderr = io.StringIO()
        with redirect_stdout(io.StringIO()), redirect_stderr(stderr):
            status = main([
                "--run-label", ACTOR, "--projects", "chromium", "--batch", str(batch),
                "--expect", "INVITES=1", "--scan-attachments",
                "--credential-pattern", r"synthetic-credential-\d+",
            ])
        self.assertEqual(status, 1)
        self.assertIn("credential-pattern-1", stderr.getvalue())
        self.assertNotIn("synthetic-credential-1234", stderr.getvalue())

    def test_cli_accepts_non_course_label_and_custom_projects(self):
        batch = self.folder
        actor = "Run by: QA CI"
        projects = ["desktop-chrome", "Mobile Safari"]
        for project in projects:
            self.folder = batch / "invites" / project
            (self.folder / "html").mkdir(parents=True)
            self.seed(actor=actor, html_id="INVITES-01", feature="INVITES", project=project)
        with redirect_stdout(io.StringIO()):
            status = main([
                "--run-label", actor, "--projects", *projects, "--batch", str(batch),
                "--expect", "INVITES=1", "--scan-attachments",
            ])
        self.assertEqual(status, 0)


if __name__ == "__main__":
    unittest.main()
