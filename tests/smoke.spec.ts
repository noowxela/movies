import { test, expect } from '@playwright/test';

test.describe('movies smoke', () => {
  test('home loads catalog content', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 30000 });
  });

  test('movie detail opens from the home grid', async ({ page }) => {
    await page.goto('/');
    const firstPoster = page.locator('a.poster-link').first();
    await expect(firstPoster).toBeVisible({ timeout: 30000 });
    await firstPoster.click();
    await expect(page).toHaveURL(/movie/);
    await expect(page.getByText(/where to watch|add to favorites|log in to favorite/i).first()).toBeVisible({ timeout: 30000 });
  });

  test('search returns a results page', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.locator('#search-input-desktop');
    await searchInput.click();
    await searchInput.fill('Inception');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/search/);
    await expect(page.getByText(/inception/i).first()).toBeVisible({ timeout: 30000 });
  });

  test('favorites requires login', async ({ page }) => {
    await page.goto('/favorites?page=1');
    await expect(page.getByRole('button', { name: /log in with tmdb/i })).toBeVisible({ timeout: 30000 });
  });
});
