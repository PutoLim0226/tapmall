# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tapmall.spec.ts >> Tapmall E2E >> Admin Login to Dashboard
- Location: tests/tapmall.spec.ts:34:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Login' }) resolved to 2 elements:
    1) <button class="btn-logout">Login</button> aka getByRole('button', { name: 'Login' }).first()
    2) <button class="btn-primary">Login</button> aka getByRole('button', { name: 'Login' }).nth(1)

Call log:
  - waiting for getByRole('button', { name: 'Login' })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "Tapmall" [level=1] [ref=e5]
    - generic [ref=e6]:
      - button "Cart" [ref=e7] [cursor=pointer]
      - button "Login" [ref=e8] [cursor=pointer]
  - generic [ref=e9]:
    - generic [ref=e10]:
      - img "Electronic Rubber Pizza" [ref=e11]
      - generic [ref=e12]:
        - heading "Electronic Rubber Pizza" [level=3] [ref=e13]
        - generic [ref=e14]: Tapmall Official Store
        - generic [ref=e15]:
          - generic [ref=e16]: $860.65
          - generic [ref=e17]: "Stock: 23"
        - button "Add to Cart" [ref=e18] [cursor=pointer]
    - generic [ref=e19]:
      - img "Ergonomic Wooden Pants" [ref=e20]
      - generic [ref=e21]:
        - heading "Ergonomic Wooden Pants" [level=3] [ref=e22]
        - generic [ref=e23]: Tapmall Official Store
        - generic [ref=e24]:
          - generic [ref=e25]: $184.69
          - generic [ref=e26]: "Stock: 82"
        - button "Add to Cart" [ref=e27] [cursor=pointer]
    - generic [ref=e28]:
      - img "Handcrafted Bamboo Towels" [ref=e29]
      - generic [ref=e30]:
        - heading "Handcrafted Bamboo Towels" [level=3] [ref=e31]
        - generic [ref=e32]: Tapmall Official Store
        - generic [ref=e33]:
          - generic [ref=e34]: $599.69
          - generic [ref=e35]: "Stock: 32"
        - button "Add to Cart" [ref=e36] [cursor=pointer]
    - generic [ref=e37]:
      - img "Gorgeous Concrete Gloves" [ref=e38]
      - generic [ref=e39]:
        - heading "Gorgeous Concrete Gloves" [level=3] [ref=e40]
        - generic [ref=e41]: Tapmall Official Store
        - generic [ref=e42]:
          - generic [ref=e43]: $828
          - generic [ref=e44]: "Stock: 41"
        - button "Add to Cart" [ref=e45] [cursor=pointer]
    - generic [ref=e46]:
      - img "Frozen Marble Mouse" [ref=e47]
      - generic [ref=e48]:
        - heading "Frozen Marble Mouse" [level=3] [ref=e49]
        - generic [ref=e50]: Tapmall Official Store
        - generic [ref=e51]:
          - generic [ref=e52]: $266.29
          - generic [ref=e53]: "Stock: 59"
        - button "Add to Cart" [ref=e54] [cursor=pointer]
    - generic [ref=e55]:
      - img "Electronic Steel Cheese" [ref=e56]
      - generic [ref=e57]:
        - heading "Electronic Steel Cheese" [level=3] [ref=e58]
        - generic [ref=e59]: Tapmall Official Store
        - generic [ref=e60]:
          - generic [ref=e61]: $679.69
          - generic [ref=e62]: "Stock: 88"
        - button "Add to Cart" [ref=e63] [cursor=pointer]
    - generic [ref=e64]:
      - img "Refined Rubber Soap" [ref=e65]
      - generic [ref=e66]:
        - heading "Refined Rubber Soap" [level=3] [ref=e67]
        - generic [ref=e68]: Tapmall Official Store
        - generic [ref=e69]:
          - generic [ref=e70]: $305.29
          - generic [ref=e71]: "Stock: 39"
        - button "Add to Cart" [ref=e72] [cursor=pointer]
    - generic [ref=e73]:
      - img "Soft Aluminum Car" [ref=e74]
      - generic [ref=e75]:
        - heading "Soft Aluminum Car" [level=3] [ref=e76]
        - generic [ref=e77]: Tapmall Official Store
        - generic [ref=e78]:
          - generic [ref=e79]: $532.75
          - generic [ref=e80]: "Stock: 32"
        - button "Add to Cart" [ref=e81] [cursor=pointer]
    - generic [ref=e82]:
      - img "Bespoke Ceramic Keyboard" [ref=e83]
      - generic [ref=e84]:
        - heading "Bespoke Ceramic Keyboard" [level=3] [ref=e85]
        - generic [ref=e86]: Tapmall Official Store
        - generic [ref=e87]:
          - generic [ref=e88]: $688.59
          - generic [ref=e89]: "Stock: 25"
        - button "Add to Cart" [ref=e90] [cursor=pointer]
    - generic [ref=e91]:
      - img "Incredible Gold Bacon" [ref=e92]
      - generic [ref=e93]:
        - heading "Incredible Gold Bacon" [level=3] [ref=e94]
        - generic [ref=e95]: Tapmall Official Store
        - generic [ref=e96]:
          - generic [ref=e97]: $290.75
          - generic [ref=e98]: "Stock: 67"
        - button "Add to Cart" [ref=e99] [cursor=pointer]
    - generic [ref=e100]:
      - img "Recycled Wooden Chips" [ref=e101]
      - generic [ref=e102]:
        - heading "Recycled Wooden Chips" [level=3] [ref=e103]
        - generic [ref=e104]: Tapmall Official Store
        - generic [ref=e105]:
          - generic [ref=e106]: $371.39
          - generic [ref=e107]: "Stock: 49"
        - button "Add to Cart" [ref=e108] [cursor=pointer]
    - generic [ref=e109]:
      - img "Elegant Wooden Tuna" [ref=e110]
      - generic [ref=e111]:
        - heading "Elegant Wooden Tuna" [level=3] [ref=e112]
        - generic [ref=e113]: Tapmall Official Store
        - generic [ref=e114]:
          - generic [ref=e115]: $484.85
          - generic [ref=e116]: "Stock: 21"
        - button "Add to Cart" [ref=e117] [cursor=pointer]
  - generic [ref=e118]:
    - generic [ref=e119]:
      - heading "Your Cart" [level=2] [ref=e120]
      - button "×" [ref=e121] [cursor=pointer]
    - paragraph [ref=e123]: Your cart is empty.
  - generic [ref=e125]:
    - heading "Login to Tapmall" [level=1] [ref=e126]
    - generic [ref=e127]:
      - text: Email
      - textbox "Enter your email" [ref=e128]: admin@tapmall.com
    - generic [ref=e129]:
      - text: Password
      - textbox "Enter your password" [active] [ref=e130]: password
    - button "Login" [ref=e131]
    - paragraph [ref=e132]: Don't have an account? Register
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Tapmall E2E', () => {
  4  |   test('Buyer Login and Add to Cart', async ({ page }) => {
  5  |     await page.goto('/');
  6  | 
  7  |     // Check if products loaded (at least one Add to Cart button exists)
  8  |     const addToCartBtns = page.getByRole('button', { name: 'Add to Cart' });
  9  |     await expect(addToCartBtns.first()).toBeVisible({ timeout: 10000 });
  10 |     
  11 |     // Add first product to cart without login -> should pop up modal
  12 |     await addToCartBtns.first().click();
  13 | 
  14 |     // Login Modal
  15 |     await expect(page.getByRole('heading', { name: 'Login to Tapmall' })).toBeVisible();
  16 |     await page.getByPlaceholder('Enter your email').fill('buyer@tapmall.com');
  17 |     await page.getByPlaceholder('Enter your password').fill('password');
  18 |     await page.getByRole('button', { name: 'Login' }).click();
  19 |     
  20 |     // Check if modal closed
  21 |     await expect(page.getByRole('heading', { name: 'Login to Tapmall' })).toBeHidden();
  22 | 
  23 |     // Click Add to Cart again now that we are logged in
  24 |     await addToCartBtns.first().click();
  25 | 
  26 |     // Verify Cart Sidebar opened and contains item
  27 |     const cartHeader = page.getByRole('heading', { name: 'Your Cart' });
  28 |     await expect(cartHeader).toBeVisible();
  29 |     
  30 |     const checkoutBtn = page.getByRole('button', { name: 'Checkout' });
  31 |     await expect(checkoutBtn).toBeVisible();
  32 |   });
  33 | 
  34 |   test('Admin Login to Dashboard', async ({ page }) => {
  35 |     await page.goto('/');
  36 | 
  37 |     // Click Login button from header
  38 |     await page.getByRole('button', { name: 'Login' }).click();
  39 | 
  40 |     // Login as Admin
  41 |     await page.getByPlaceholder('Enter your email').fill('admin@tapmall.com');
  42 |     await page.getByPlaceholder('Enter your password').fill('password');
> 43 |     await page.getByRole('button', { name: 'Login' }).click();
     |                                                       ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Login' }) resolved to 2 elements:
  44 | 
  45 |     // Verify Admin Dashboard
  46 |     await expect(page.getByRole('heading', { name: 'Tapmall Admin Dashboard' })).toBeVisible();
  47 |     await expect(page.getByText('Total Users')).toBeVisible();
  48 |     await expect(page.getByText('Total Products')).toBeVisible();
  49 |     await expect(page.getByText('Total Orders')).toBeVisible();
  50 |   });
  51 | });
  52 | 
```