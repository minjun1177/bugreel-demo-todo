const { test, expect } = require('@playwright/test');

test('active todo counter decrements when an item is marked as completed', async ({ page }) => {
  await page.goto('http://localhost:4173');

  const newTodo = page.locator('.new-todo');

  await newTodo.fill('Buy milk');
  await newTodo.press('Enter');

  await newTodo.fill('Walk the dog');
  await newTodo.press('Enter');

  await newTodo.fill('Read a book');
  await newTodo.press('Enter');

  await expect(page.locator('.todo-count')).toHaveText('3 items left');

  const walkTheDogItem = page.locator('.todo-list li', { hasText: 'Walk the dog' });
  await walkTheDogItem.locator('.toggle').click();

  await expect(page.locator('.todo-count')).toHaveText('2 items left');
});
