import { test, expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  // หน้า pop up ขึ้นมาตอน login เสร็จ
  readonly pop_up_button: Locator;
  readonly pop_up_done: Locator;

  // ปุ่ม + เพื่อสร้างข้อมูล
  readonly button_add: Locator;
  readonly add_contact: Locator;

  // ยืนยัน PDPA
  readonly button_consending: Locator;
  readonly signature: Locator;
  readonly submit_signature: Locator;

  // หน้า ข้อมูลติดต่อ
  readonly nick_name: Locator;
  readonly phone_number: Locator;
  readonly first_name: Locator;
  readonly last_name: Locator;
  readonly save_info: Locator;

  // หน้า ความต้องการของลูกค้า
  readonly title: Locator;
  readonly customer_need_to_loan: Locator;
  readonly money_borrow: Locator;
  readonly installment: Locator;
  readonly time_period: Locator;
  readonly save_customer_need_to_loan: Locator;

  constructor(page: Page) {
    this.page = page;
    // หน้า pop up ขึ้นมาตอน login เสร็จ
    this.pop_up_button = page.getByRole("button", { name: "ถัดไป" });
    this.pop_up_done = page.getByRole("button", { name: "เสร็จสิ้น" });

    // ปุ่ม + เพื่อสร้างข้อมูล
    this.button_add = page.getByLabel("add");
    this.add_contact = page.getByText("+ กดเพื่อเพิ่มรายชื่อติดต่อ, ,");

    // ยืนยัน PDPA
    this.button_consending = page
      .locator("div")
      .filter({ hasText: /^ยอมรับเงื่อนไข$/ })
      .getByRole("radio");
    this.signature = page.locator("#signature-canvas");
    this.submit_signature = page.getByRole("button", { name: "บันทึก" }).nth(1);

    // หน้า ข้อมูลติดต่อ
    this.nick_name = page.getByPlaceholder("เช่น ลุงคำ");
    this.phone_number = page.getByPlaceholder("เช่น 0981234567");
    this.first_name = page.getByPlaceholder("กรอกชื่อ");
    this.last_name = page.getByPlaceholder("กรอกนามสกุล");
    this.save_info = page.getByRole("button", { name: "บันทึก" }).first();

    // หน้า ความต้องการของลูกค้า
    this.title = page
      .locator("#root > div.w-full > div:nth-child(5) > div > div:nth-child(1)")
      .first();
    this.customer_need_to_loan = page.locator(".my-2 > div").first();
    this.money_borrow = page.getByPlaceholder("เช่น 1,000 บาท");
    this.installment = page.getByTestId("button-60");
    this.time_period = page.getByTestId("button-มากกว่า 3 เดือน");
    this.save_customer_need_to_loan = page
      .getByRole("button", { name: "บันทึก" })
      .first();
  }

  // หน้า pop up ขึ้นมาตอน login เสร็จ
  async popup() {
    await this.pop_up_button.click();
    await this.pop_up_done.click();
  }

  // ปุ่ม + เพื่อสร้างข้อมูล และ PAPD
  async create() {
    await this.button_add.click();
    await this.add_contact.click();
    await this.nick_name.click();
    await this.button_consending.check();
    await this.signature.click({
      position: {
        x: 655,
        y: 175,
      },
    });
    await this.submit_signature.click();
  }

  // หน้า ข้อมูลติดต่อ
  async create_input(
    nick_name: string,
    phone_number: string,
    first_name: string,
    last_name: string,
  ) {
    await this.nick_name.fill(nick_name);
    await this.phone_number.fill(phone_number);
    await this.first_name.fill(first_name);
    await this.last_name.fill(last_name);
    await this.save_info.click();
  }

  // หน้า ความต้องการของลูกค้า
  async customer_need_to_loan_input(money: string) {
    await this.title.click();
    await this.customer_need_to_loan.click();
    await this.money_borrow.fill(money);
    await this.installment.click();
    await this.time_period.click();
    await this.save_customer_need_to_loan.click();
  }
}
