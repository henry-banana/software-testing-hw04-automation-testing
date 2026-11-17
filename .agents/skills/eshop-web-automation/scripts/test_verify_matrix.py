import base64
import io
import json
import tempfile
import unittest
from pathlib import Path
from zipfile import ZipFile

from verify_matrix import check_cell


ACTOR = "Draft run by: Codex"


class VerifyMatrixTest(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.folder = Path(temporary.name)
        (self.folder / "html" / "data").mkdir(parents=True)

    def seed(self, *, actor=ACTOR, html_id="FR09-01", tried="failed", skip=False, html_shift=0):
        outcome = "skipped" if skip else "unexpected"
        counts = dict(expected=0, unexpected=int(not skip), flaky=0, skipped=int(skip))
        raw = {
            "errors": [],
            "stats": {**counts, "startTime": "2026-11-17T00:00:00.000Z"},
            "suites": [{"suites": [{"specs": [{
                "title": "FR09-01 verify coupon",
                "tests": [{
                    "projectName": "chromium", "expectedStatus": "passed",
                    "status": outcome, "results": [{"status": tried}],
                }],
            }]}]}],
        }
        html = {
            "projectNames": ["chromium"],
            "startTime": 1794873600000 + html_shift,
            "stats": {"total": 1, **counts},
            "files": [{"tests": [{"title": f"{html_id} verify coupon", "outcome": outcome}]}],
            "options": {"title": f"{actor} | 2026-11-17T00:00:00Z | FR09 | chromium"},
        }
        (self.folder / "results.json").write_text(json.dumps(raw), encoding="utf-8")
        packed = io.BytesIO()
        with ZipFile(packed, "w") as archive:
            archive.writestr("report.json", json.dumps(html))
        payload = base64.b64encode(packed.getvalue()).decode("ascii")
        report = f'<template id="playwrightReportBase64">data:application/zip;base64,{payload}</template>'
        (self.folder / "html" / "index.html").write_text(report, encoding="utf-8")

    def check(self, scan=False):
        return check_cell(self.folder, "FR09", "chromium", 1, ACTOR, scan)

    def test_completed_failure_counts(self):
        self.seed()
        cases, counts, markers = self.check()
        self.assertEqual(cases, {"FR09-01"})
        self.assertEqual(counts["unexpected"], 1)
        self.assertFalse(markers)

    def test_rejects_actor_mismatch(self):
        self.seed(actor="Run by: 00000000")
        with self.assertRaisesRegex(ValueError, "actor"):
            self.check()

    def test_rejects_same_counts_from_different_cases(self):
        self.seed(html_id="FR09-02")
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


if __name__ == "__main__":
    unittest.main()
