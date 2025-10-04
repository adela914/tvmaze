import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('home loads and shows at least one carousel', async ({ page }) => {
  await page.waitForResponse(
    (res) =>
      res.url().includes('/shows') && res.request().method() === 'GET' && res.status() === 200,
  )

  const anyCarouselHeader = page.locator('.carousels .header').first()
  await expect(anyCarouselHeader).toBeVisible()
})

test('clicking a result navigates to /show/:id', async ({ page }) => {
  await page.waitForResponse((res) => res.url().includes('/shows') && res.ok())

  const firstImage = page.locator('.carousels img[alt]').first()
  await expect(firstImage).toBeVisible()
  await firstImage.click()

  await expect(page).toHaveURL(/\/show\/\d+$/)
})

test('typing in header toggles to search results', async ({ page }) => {
  const input = page.getByPlaceholder('Search...')
  await input.fill('down')

  await expect(page.locator('.carousels')).toHaveCount(0)

  const resultsImg = page.locator('main .container img[alt]').first()
  await expect(resultsImg).toBeVisible()

  await resultsImg.click()
  await expect(page).toHaveURL(/\/show\/\d+$/)
})
