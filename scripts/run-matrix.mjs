import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const features = ['fr04', 'fr09', 'fr17'];
const browsers = ['chromium', 'firefox', 'webkit'];
const args = process.argv.slice(2);
const draftRun = args[0] === '--draft';
if (draftRun) args.shift();
const [feature = 'all', browser = 'all'] = args;

if (
  args.length > 2 ||
  (feature !== 'all' && !features.includes(feature)) ||
  (browser !== 'all' && !browsers.includes(browser))
) {
  console.error('Usage: npm test -- [--draft] [all|fr04|fr09|fr17] [all|chromium|firefox|webkit]');
  process.exit(2);
}

const studentId = process.env.HW04_STUDENT_ID;
if (!draftRun && !/^\d{8}$/.test(studentId ?? '')) {
  console.error('Set HW04_STUDENT_ID to your 8-digit student ID before running tests.');
  process.exit(2);
}

const require = createRequire(import.meta.url);
const playwrightCli = require.resolve('@playwright/test/cli');
const root = fileURLToPath(new URL('../', import.meta.url));
const batch = new Date().toISOString().replaceAll(':', '-');
const reportRoot = draftRun ? join(root, 'test-results', 'draft-reports') : join(root, 'reports');
const actor = draftRun ? 'Draft run by: Codex' : `Run by: ${studentId}`;
const selectedFeatures = feature === 'all' ? features : [feature];
const selectedBrowsers = browser === 'all' ? browsers : [browser];

for (const selectedFeature of selectedFeatures) {
  for (const selectedBrowser of selectedBrowsers) {
    const startedAt = new Date().toISOString();
    const runFolder = join(reportRoot, batch, selectedFeature, selectedBrowser);
    const title = `${actor} | ${startedAt} | ${selectedFeature.toUpperCase()} | ${selectedBrowser}`;
    console.log(`\n${title}`);

    const result = spawnSync(
      process.execPath,
      [
        playwrightCli,
        'test',
        `tests/${selectedFeature}/`,
        '--project',
        selectedBrowser,
        '--output',
        join(root, 'test-results', batch, selectedFeature, selectedBrowser),
      ],
      {
        cwd: root,
        stdio: 'inherit',
        env: {
          ...process.env,
          HW04_RUN_FOLDER: runFolder,
          HW04_RUN_TITLE: title,
        },
      },
    );

    if (result.error) throw result.error;
    if (result.signal) {
      console.error(`Playwright was interrupted by ${result.signal}.`);
      process.exit(1);
    }
    if (result.status !== 0) process.exitCode = 1;
  }
}
