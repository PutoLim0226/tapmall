# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seller.spec.ts >> Seller flow: Login, open Seller Centre, and upload product
- Location: tests/seller.spec.ts:3:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('header')
Expected substring: "Welcome, seller"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('header')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Seller flow: Login, open Seller Centre, and upload product', async ({ page }) => {
  4  |   // Mock login by setting localStorage directly, then reloading
  5  |   await page.goto('/');
  6  |   await page.evaluate(() => {
  7  |     localStorage.setItem('token', 'dummy-token');
  8  |     localStorage.setItem('email', 'seller@tapmall.com');
  9  |   });
  10 |   await page.reload();
  11 | 
  12 |   // Wait for header to reflect logged-in state (Welcome, seller)
> 13 |   await expect(page.locator('header')).toContainText('Welcome, seller');
     |                                        ^ Error: expect(locator).toContainText(expected) failed
  14 | 
  15 |   // Click Seller Centre link
  16 |   await page.click('text=Seller Centre');
  17 | 
  18 |   // We should see the Seller Dashboard
  19 |   await expect(page.locator('h1')).toHaveText('Seller Centre - Upload Product');
  20 | 
  21 |   // Fill in the form
  22 |   await page.fill('input[name="name"]', 'Test Product');
  23 |   await page.fill('textarea[name="description"]', 'Test Description');
  24 |   await page.fill('input[name="price"]', '9.99');
  25 |   await page.fill('input[name="stock"]', '100');
  26 |   await page.fill('input[name="imageUrl"]', 'https://via.placeholder.com/150');
  27 |   
  28 |   // Note: we can't fully submit without a backend running or mocking the API,
  29 |   // but we can mock the API response.
  30 |   await page.route('/api/products', async route => {
  31 |     const json = { id: 'new-prod', name: 'Test Product' };
  32 |     await route.fulfill({ json, status: 201 });
  33 |   });
  34 |   
  35 |   // Override alert to check if it's called
  36 |   let alertMessage = '';
  37 |   page.on('dialog', async dialog => {
  38 |     alertMessage = dialog.message();
  39 |     await dialog.accept();
  40 |   });
  41 | 
  42 |   await page.click('button[type="submit"]');
  43 | 
  44 |   // Wait a little for the API and alert
  45 |   await page.waitForTimeout(500);
  46 | 
  47 |   expect(alertMessage).toBe('Product uploaded successfully!');
  48 | });
  49 | 
```