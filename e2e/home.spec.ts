import { test, expect } from "@playwright/test";
import { HomePage } from "./page/home.page";
import { LoginPage } from "./page/login.page";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);

    await loginpage.openLoginPage();
    await loginpage.fillUserAndPass("Tanakorn.doung", "Sak123456!");
    await loginpage.loginSuccess();
    await homepage.popup();
  });

  //   test("สร้างข้อมูลติดต่อ", async ({ page }) => {
  //     const homepage = new HomePage(page);
  //     await homepage.create();
  //     await homepage.create_input("test 2", "0981234567", "test", "test");
  //   });

  test('สร้าง "ความต้องการของลูกค้า"', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.customer_need_to_loan_input("300000");
  });
});
