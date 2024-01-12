import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173/"


//before each test we define below this test
test.beforeEach(async ({ page }) => {

    await page.goto(UI_URL);

    //get sign-in button
    await page.getByRole("link", { name: "Sign In"}).click();
  
    //WHEN IT GETS TO THE SIGN-IN PAGE, THERE SHOULD BE A HEADING WITH LOGIN
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  
    await page.locator("[name=email]").fill("reus@gmail.com");
    await page.locator("[name=password]").fill("marcoreus11");
  
    await page.getByRole("button", { name: "Login" }).click();
  
    await expect(page.getByText("Login Succesful")).toBeVisible();
})

test("user can add hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`)

    await page.locator('[name="name"]').fill("Hacienda Napoles");
    await page.locator('[name="city"]').fill("Bogota");
    await page.locator('[name="country"]').fill("Kasoa");
    await page.locator('[name="description"]').fill("A simple desc for the hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption("select[name='starRating']", "3")

    await page.getByText("Apartments").click()
    await page.getByLabel("Free Wifi").check()
    await page.getByLabel("Safe").check()

    await page.locator('[name="adultCount"]').fill("2")
    await page.locator('[name="childCount"]').fill("4")

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "levi.PNG"),
        path.join(__dirname, "files", "levi1.PNG"),
    ])

    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Created")).toBeVisible();

})