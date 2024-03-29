import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Search' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'register' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'login' })).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'FindAmusician' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Get your jam on' }),
  ).toBeVisible();

  await expect(page.getByText('Welcome to FindAmusician -')).toBeVisible();

  await expect(page.getByRole('link', { name: 'FAQs' })).toBeVisible();
});
