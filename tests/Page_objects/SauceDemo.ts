import { Locator, Page, } from "@playwright/test";

export default class SauceDemo {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly product1: Locator
    readonly lastProduct: Locator

    constructor(page: Page){
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password')
        this.loginBtn = page.locator('#login-button')
        this.product1 = page.locator('.inventory_item_name').first();
        this.lastProduct = page.locator('.inventory_item_name').nth(5);
    }

    async login(username: string, password: string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async verifyItemsAreSortedFromAZ() {
        await this.page.waitForSelector('.inventory_container');
        const products = await this.page.$$('.inventory_item_name');
        let sortedByNameAZ = true;

        for (let i = 1; i < products.length; i++) {
          const productName1 = await products[i - 1].innerText();
          const productName2 = await products[i].innerText();
          if (productName1.localeCompare(productName2) > 0) {
            sortedByNameAZ = false;
            break;
          }
        }
        return sortedByNameAZ;
    }

    async sortItemsZA() {
        await this.page.selectOption('.product_sort_container', { label: 'Name (Z to A)' });
        await this.page.waitForSelector('.inventory_container');
    }
    
    async verifyItemsAreSortedFromZA() {
        const reverseItems = await this.page.$$('.inventory_item_name');
        let sortedByNameZA = true;

        for (let i = 1; i < reverseItems.length; i++) {
            const productName1 = await reverseItems[i - 1].innerText();
            const productName2 = await reverseItems[i].innerText();
            if (productName1.localeCompare(productName2) < 0) {
                sortedByNameZA = false;
            break;
            }
        }
        return sortedByNameZA;
    }
}