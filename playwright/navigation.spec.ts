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

  await expect(
    page.getByRole('heading', { name: 'FindAmusician - FAQs' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'What does ...?' }),
  ).toBeVisible();

  await expect(
    page.getByText('Lorem ipsum dolor sit amet,').first(),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'How do ...?' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'When can ...?' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Site notice' }).click();
  await expect(page).toHaveURL('http://localhost:3000/sitenotice');

  await expect(
    page.getByRole('heading', { name: 'FindAmusician - Site notice' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Our address' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Email: customersupport@' }),
  ).toBeVisible();

  await expect(page.getByText('FindAmusician LLCLorem ipsum')).toBeVisible();

  await page.getByRole('link', { name: 'Contact us' }).click();
  await expect(page).toHaveURL('http://localhost:3000/contactus');

  await expect(
    page.getByRole('heading', { name: 'FindAmusician - Contact us' }),
  ).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Legal' })).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Authorised process agent' }),
  ).toBeVisible();

  await expect(page.getByText('Lorem ipsum dolor Rechtsanwä')).toBeVisible();
});

test('register test', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'register' }).click();
  await expect(page).toHaveURL('http://localhost:3000/register');

  await page
    .locator('div')
    .filter({ hasText: /^Username$/ })
    .getByRole('textbox')
    .fill('endtoendtest1');

  await page.locator('input[type="password"]').fill('endtoendtest1-pw');
});
