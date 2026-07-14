# Playwright E2E Testing Setup for Vehloom

This project is configured with end-to-end testing using Playwright, integrated with GitHub Actions CI/CD and the Speclane AI Self-Healing webhook.

## 📋 Test Setup Overview

### Test Files
- **`tests/homepage.spec.ts`** - Homepage integration tests:
  - ✅ Homepage loads successfully
  - ✅ Email input field exists and is visible
  - ✅ Join Waitlist button exists and is visible

### Configuration Files
- **`playwright.config.ts`** - Playwright test configuration
  - Automatically starts Vite dev server before tests (`npm run dev`)
  - Configures base URL: `http://localhost:8081`
  - Runs tests in Chromium, Firefox, and WebKit browsers
  - Collects traces on failed tests for debugging
  - Retries failed tests in CI environment

- **`.github/workflows/playwright.yml`** - GitHub Actions CI/CD workflow
  - Triggers on `push` and `pull_request` to `main` and `develop` branches
  - Installs Node.js 22 and project dependencies
  - Installs Playwright browsers with system dependencies
  - Runs Playwright tests
  - Uploads HTML test reports as artifacts
  - Sends webhook to Speclane on test failure

## 🚀 Quick Start

### Local Development

#### Run tests (headless, fastest)
```bash
npm test
```

#### Run tests with browser UI (see what's happening)
```bash
npm run test:headed
```

#### Run tests with interactive UI
```bash
npm run test:ui
```

#### Run a specific test file
```bash
npx playwright test tests/homepage.spec.ts
```

#### Run a specific test
```bash
npx playwright test -g "homepage loads"
```

### First Time Setup

If you haven't installed Playwright browsers yet:

```bash
npx playwright install
```

If you face system dependency issues on Linux:
```bash
sudo npx playwright install-deps
```

## 🔄 GitHub Actions Workflow

The workflow is automatically triggered when you push to `main` or `develop`, or when creating a pull request.

### Workflow Steps
1. ✅ Checkout repository
2. ✅ Setup Node.js 22
3. ✅ Install dependencies (`npm ci`)
4. ✅ Install Playwright browsers
5. ✅ Run Playwright tests
6. ✅ Upload test report (if available)
7. ✅ Send webhook on failure

### Webhook Integration

When tests fail in GitHub Actions, a POST request is sent to:
```
https://big-provinces-composed-stakeholders.trycloudflare.com/api/self-healing/webhook?projectId=453035a2-59f1-4000-b74d-9d2d4d9f225d
```

**Payload includes:**
```json
{
  "branch": "main",
  "commitSha": "abc123...",
  "workflowName": "Playwright Tests",
  "actor": "username",
  "status": "failed"
}
```

## 📊 Test Reports

After running tests locally or in CI, view the HTML report:

```bash
npx playwright show-report
```

This opens an interactive report showing:
- Test pass/fail status
- Screenshots and videos (if configured)
- Execution times
- Stack traces for failures

Test reports are stored in `playwright-report/` directory.

## 🐛 Debugging Failed Tests

### View trace from failed test
```bash
npx playwright show-trace trace.zip
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run with more logging
```bash
npx playwright test --reporter=verbose
```

## 📝 Writing New Tests

Create new test files in the `tests/` directory with `.spec.ts` extension:

```typescript
import { test, expect } from '@playwright/test';

test('my new feature', async ({ page }) => {
  await page.goto('/');
  // Add your test assertions here
  await expect(page.locator('selector')).toBeVisible();
});
```

See [Playwright Documentation](https://playwright.dev/docs/intro) for more examples.

## 🔧 Configuration

### Modify test settings
Edit `playwright.config.ts` to:
- Change base URL
- Adjust timeouts
- Add/remove browsers
- Configure reporters
- Change webServer startup command

### Modify CI/CD behavior
Edit `.github/workflows/playwright.yml` to:
- Change trigger branches
- Adjust Node.js version
- Modify test commands
- Update webhook URL or payload

## 🆘 Troubleshooting

### Tests hang or timeout
- Ensure Vite dev server can start: `npm run dev`
- Check if port 8081 is available
- Increase `webServer.timeout` in `playwright.config.ts`

### "Cannot find browsers" error
```bash
npx playwright install --with-deps
```

### GitHub Actions fails but tests pass locally
- Ensure `.github/workflows/playwright.yml` has correct steps
- Check Node.js version compatibility
- Verify webhook URL is accessible

### Webhook not triggering
- Check GitHub Actions logs for curl errors
- Verify webhook URL and projectId are correct
- Ensure network allows outbound HTTPS to the webhook endpoint

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Test Best Practices](https://playwright.dev/docs/best-practices)

## 🎯 Next Steps

1. **Commit all changes:**
   ```bash
   git add -A
   git commit -m "Add Playwright E2E tests with GitHub Actions integration"
   ```

2. **Push to repository:**
   ```bash
   git push origin main
   ```

3. **GitHub Actions will automatically:**
   - Run tests on push/PR
   - Send webhook notifications on failure
   - Upload test reports as artifacts

4. **Monitor your tests:**
   - Check GitHub Actions tab in your repository
   - View workflow runs and test reports
   - Monitor webhook deliveries

---

**Last Updated:** 2026-07-14
