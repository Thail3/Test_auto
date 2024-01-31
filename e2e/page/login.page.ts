import { test, expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly login_botton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.username = page.getByLabel("Username");
    this.password = page.getByLabel("Password");
    this.login_botton = page.getByRole("button", { name: "Sign In" });
  }

  async openLoginPage() {
    await this.page.goto(
      "https://sso.saksiam.net/auth/realms/devsaksiam/protocol/openid-connect/auth?client_id=crm-web-dev&redirect_uri=https%3A%2F%2Fdev-crm.saksiam.net%2F&state=8bf425b1-dcc3-4a4a-94d3-c9578ad330ac&response_mode=fragment&response_type=code&scope=openid&nonce=4771dce1-5130-4aec-89e9-680a045b2c01",
    );
  }

  async fillUserAndPass(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login_botton.click();
  }

  async loginSuccess() {
    await expect(this.page).toHaveURL("https://dev-crm.saksiam.net/");
  }
}
