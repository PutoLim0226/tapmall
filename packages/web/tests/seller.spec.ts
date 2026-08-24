import { test, expect } from '@playwright/test';

test('Seller flow: Login, open Seller Centre, and upload product', async ({ page }) => {
  // Mock login by setting localStorage directly, then reloading
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('email', 'seller@tapmall.com');
  });
  await page.reload();

  // Wait for header to reflect logged-in state (Welcome, seller)
  await expect(page.locator('header')).toContainText('Welcome, seller');

  // Click Seller Centre link
  await page.click('text=Seller Centre');

  // We should see the Seller Dashboard
  await expect(page.locator('h1')).toHaveText('Seller Centre - Upload Product');

  // Fill in the form
  await page.fill('input[name="name"]', 'Test Product');
  await page.fill('textarea[name="description"]', 'Test Description');
  await page.fill('input[name="price"]', '9.99');
  await page.fill('input[name="stock"]', '100');
  await page.fill('input[name="imageUrl"]', 'https://via.placeholder.com/150');
  
  // Note: we can't fully submit without a backend running or mocking the API,
  // but we can mock the API response.
  await page.route('/api/products', async route => {
    const json = { id: 'new-prod', name: 'Test Product' };
    await route.fulfill({ json, status: 201 });
  });
  
  // Override alert to check if it's called
  let alertMessage = '';
  page.on('dialog', async dialog => {
    alertMessage = dialog.message();
    await dialog.accept();
  });

  await page.click('button[type="submit"]');

  // Wait a little for the API and alert
  await page.waitForTimeout(500);

  expect(alertMessage).toBe('Product uploaded successfully!');
});
