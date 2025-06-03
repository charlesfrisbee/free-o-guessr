import { test, expect } from "@playwright/test";

test("complete game flow", async ({ page }) => {
  // Go to homepage
  await page.goto("http://localhost:3000/");

  // Wait for the panorama container to be present and visible
  await page.waitForSelector('div[class="absolute inset-0"]', {
    state: "visible",
  });

  // Give the Google Maps JavaScript time to initialize (adjust timeout if needed)
  await page.waitForTimeout(2000);

  // Find and hover over the map to expand it
  const map = await page
    .locator('div[class*="aspect-square md:aspect-video"]')
    .first();
  await map.hover();

  // Wait for the map expansion animation (delay-200 in the CSS)
  await page.waitForTimeout(300);

  // Verify the map is expanded and fully opaque on hover
  const mapStyle = await map.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return {
      width: style.width,
      opacity: style.opacity,
    };
  });
  expect(parseFloat(mapStyle.opacity)).toBeGreaterThan(0.95); // Should be fully opaque on hover

  // Click somewhere on the expanded map to make a guess
  const mapBounds = await map.boundingBox();
  if (mapBounds) {
    await page.mouse.click(
      mapBounds.x + mapBounds.width / 2,
      mapBounds.y + mapBounds.height / 2
    );
  }

  // Click the "Guess" button
  await page.getByRole("button", { name: /guess/i }).click();

  // Verify we're on the results page
  await expect(page.getByRole("button", { name: /next round/i })).toBeVisible();

  // Click "Next Round" to start a new game
  await page.getByRole("button", { name: /next round/i }).click();

  // Verify we're back to the game view
  // await page.waitForSelector('div[class*="panorama"]');
});
