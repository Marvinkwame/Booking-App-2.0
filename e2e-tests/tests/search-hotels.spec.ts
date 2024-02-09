import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({ page }) => {

  await page.goto(UI_URL);

  //get sign-in button
  await page.getByRole("link", { name: "Sign In" }).click();

  //WHEN IT GETS TO THE SIGN-IN PAGE, THERE SHOULD BE A HEADING WITH LOGIN
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("reus@gmail.com");
  await page.locator("[name=password]").fill("marcoreus11");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login Succesful")).toBeVisible();
});

test('should display searched hotels', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Enter Destination").fill("Bogota")
  await page.getByRole("button", { name: "Search" }).click()

  await expect(page.getByText("Hotels Found in Bogota")).toBeVisible() //assertion
  await expect(page.getByText("Hacienda Kasoa")).toBeVisible()
})

test('view detail page for a hotel', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Enter Destination").fill("Bogota")
  await page.getByRole("button", { name: "Search" }).click()

  await page.getByText("Hacienda Kasoa").click() //becos we can click the title
  await expect(page).toHaveURL(/hotel-details/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible()
})

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Enter Destination").fill("Bogota")
  
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0]
  await page.getByPlaceholder("Check-out Date").fill(formattedDate)

  await page.getByRole("button", { name: "Search" }).click()

  await page.getByText("Hacienda Kasoa").click() //becos we can click the title
  await page.getByRole("button", { name: "Book Now" }).click()

  await expect(page.getByText("Total Cost: $300.00")).toBeVisible()

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242")
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30")
  await stripeFrame.locator('[placeholder="CVC"]').fill("424")
  await stripeFrame.locator('[placeholder="ZIP"]').fill("24232")

  await page.getByRole('button', { name: "Confirm Reservation" }).click()
  
  await expect(page.getByText("Reservation Successful")).toBeVisible();
})