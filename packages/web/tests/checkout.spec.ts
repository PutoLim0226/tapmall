import { test, expect } from '@playwright/test';

test('Checkout flow works for logged-in user', async ({ page }) => {
  await page.goto('http://localhost:8888/');
  
  // Create a random user and login
  const randomEmail = `test_${Date.now()}@example.com`;
  
  // Click Sign Up
  await page.click('text=Sign Up');
  await page.fill('input[type="email"]', randomEmail);
  await page.fill('input[type="password"]', 'password123');
  await page.click('.auth-card button:has-text("Sign Up")');
  
  // Wait for login to complete (Welcome text appears)
  await expect(page.locator('text=Welcome, test_')).toBeVisible({ timeout: 10000 });
  
  // Add a product to cart (first product card)
  await page.click('.product-card:first-child');
  
  // Wait a moment for cart API to finish (simplification)
  await page.waitForTimeout(1000);
  
  // Open cart
  await page.click('.cart-icon');
  
  // Accept the alert dialog before clicking checkout
  page.on('dialog', dialog => dialog.accept());
  
  // Click checkout
  await page.click('.btn-checkout');
  
  // Wait for alert to resolve and cart to clear
  await page.waitForTimeout(1000);
  
  // Verify cart is empty
  await expect(page.locator('.cart-items')).toContainText('Your cart is empty', { timeout: 10000 });
});
