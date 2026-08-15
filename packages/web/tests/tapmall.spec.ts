import { test, expect } from '@playwright/test';

test.describe('Tapmall E2E', () => {
  test('Buyer Login and Add to Cart', async ({ page }) => {
    await page.goto('/');

    // Check if products loaded (at least one Add to Cart button exists)
    const addToCartBtns = page.getByRole('button', { name: 'Add to Cart' });
    await expect(addToCartBtns.first()).toBeVisible({ timeout: 10000 });
    
    // Add first product to cart without login -> should pop up modal
    await addToCartBtns.first().click();

    // Login Modal
    await expect(page.getByRole('heading', { name: 'Login to Tapmall' })).toBeVisible();
    await page.getByPlaceholder('Enter your email').fill('buyer@tapmall.com');
    await page.getByPlaceholder('Enter your password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Check if modal closed
    await expect(page.getByRole('heading', { name: 'Login to Tapmall' })).toBeHidden();

    // Click Add to Cart again now that we are logged in
    await addToCartBtns.first().click();

    // Verify Cart Sidebar opened and contains item
    const cartHeader = page.getByRole('heading', { name: 'Your Cart' });
    await expect(cartHeader).toBeVisible();
    
    const checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    await expect(checkoutBtn).toBeVisible();
  });

  test('Admin Login to Dashboard', async ({ page }) => {
    await page.goto('/');

    // Click Login button from header
    await page.getByRole('button', { name: 'Login' }).click();

    // Login as Admin
    await page.getByPlaceholder('Enter your email').fill('admin@tapmall.com');
    await page.getByPlaceholder('Enter your password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify Admin Dashboard
    await expect(page.getByRole('heading', { name: 'Tapmall Admin Dashboard' })).toBeVisible();
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('Total Products')).toBeVisible();
    await expect(page.getByText('Total Orders')).toBeVisible();
  });
});
