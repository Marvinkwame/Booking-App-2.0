import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow user to sign-in', async ({ page }) => {

  await page.goto(UI_URL);

  //get sign-in button
  await page.getByRole("link", { name: "Sign In"}).click();

  //WHEN IT GETS TO THE SIGN-IN PAGE, THERE SHOULD BE A HEADING WITH LOGIN
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("reus@gmail.com");
  await page.locator("[name=password]").fill("marcoreus11");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login Succesful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  
});


//Registration tests
test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 9000) + 1000}@test.com`
  await page.goto(UI_URL);
  
  await page.getByRole("link", { name: "Sign Up"}).click();
  

  //get heading in the register page. its an assertion
  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();

  await page.locator("[name=firstName]").fill("Paul");
  await page.locator("[name=lastName]").fill("Pogba");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("Paul1234");
  await page.locator("[name=confirmPassword]").fill("Paul1234");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Succesful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
})
