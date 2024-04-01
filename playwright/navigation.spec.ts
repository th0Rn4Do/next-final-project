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

  await expect(page.getByRole('link', { name: 'Site notice' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Contact us' })).toBeVisible();

  await expect(page.getByText('Copyright')).toBeVisible();

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('link', { name: 'Search' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  await page.getByRole('link', { name: 'register' }).click();
  await expect(page).toHaveURL('http://localhost:3000/register');

  await page.getByRole('link', { name: 'login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  await page.getByRole('link', { name: 'FAQs' }).click();
  await expect(page).toHaveURL('http://localhost:3000/faqs');

  await page.getByRole('link', { name: 'Site notice' }).click();
  await expect(page).toHaveURL('http://localhost:3000/sitenotice');

  await page.getByRole('link', { name: 'Contact us' }).click();
  await expect(page).toHaveURL('http://localhost:3000/contactus');
});
