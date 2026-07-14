import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  const response = await page.goto('/');
  expect(response && response.ok()).toBeTruthy();
});

test('email input exists', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('input[type="email"]')).toBeVisible();
});

test('Join Waitlist button exists', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /join waitlist/i })).toBeVisible();
});
