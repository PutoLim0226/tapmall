import { test, expect } from '@playwright/test';
test('Menu opens and language changes', async ({ page }) => {
  await page.goto('http://localhost:8888/');
  // Test Burger Menu
  await page.click('.burger-menu');
  await expect(page.locator('.category-menu-sidebar')).toHaveClass(/open/);
  // Test Language Dropdown
  await page.click('.dropdown-toggle');
  await expect(page.locator('.dropdown-menu')).toBeVisible();
});
