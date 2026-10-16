const { test, expect } = require('@playwright/test');

test('footer counter decreases from 3 items left to 2 items left when one todo is checked off', async ({ page }) => {
  await page.goto('http://localhost:4173');

  const newTodo = page.locator('input.new-todo');
  await newTodo.click();

  await newTodo.fill('Buy milks');
  await newTodo.press('Enter');

  await newTodo.fill('Buy eggs');
  await newTodo.press('Enter');

  await newTodo.fill('Buy chicken');
  await newTodo.press('Enter');

  await expect(page.locator('.todo-count')).toHaveText('3 items left');

  const buyMilksCheckbox = page.locator('.todo-list li', { hasText: 'Buy milks' }).locator('input.toggle');
  await buyMilksCheckbox.click();

  await expect(page.locator('.todo-list li', { hasText: 'Buy milks' })).toHaveClass(/completed/);
  await expect(page.locator('.todo-count')).toHaveText('2 items left');
});
