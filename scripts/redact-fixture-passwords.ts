import type { Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';

const fixturePassword = /HW04-[a-f0-9-]{36}!Aa1/gi;

export default class RedactFixturePasswords implements Reporter {
  onStepBegin(_test: TestCase, _result: TestResult, step: TestStep) {
    step.title = step.title.replace(fixturePassword, '[fixture password]');
  }

  printsToStdio() {
    return false;
  }
}
