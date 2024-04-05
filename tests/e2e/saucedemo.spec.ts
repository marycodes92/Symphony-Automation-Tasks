import { test, expect } from '@playwright/test';
import SauceDemo from '../Page_objects/SauceDemo';

test.describe('sorting', ()=>{
    let sauce: SauceDemo;
    let firstProduct: string;
    let lastProduct: string;
    
    test.beforeEach(async ({ baseURL, page })=>{
        await page.goto('https://www.saucedemo.com/');
        
        sauce  = new SauceDemo(page)
     
        await sauce.login("standard_user", "secret_sauce");
    })

    test('verify that items are sorted by name A - Z', async()=>{
        firstProduct = await sauce.product1.innerText();
        lastProduct = await sauce.lastProduct.innerText();

        const sortedAZ = await sauce.verifyItemsAreSortedFromAZ();
        
        expect(sortedAZ).toBe(true)
        expect(firstProduct).toBe('Sauce Labs Backpack');
        expect(lastProduct).toBe('Test.allTheThings() T-Shirt (Red)');
    })

    test('verify that items are sorted by name Z - A', async()=>{
        await sauce.sortItemsZA();
        firstProduct = await sauce.product1.innerText();
        lastProduct = await sauce.lastProduct.innerText();
        
        const sortedZA = await sauce.verifyItemsAreSortedFromZA();

        expect(sortedZA).toBe(true);
        expect(firstProduct).toBe('Test.allTheThings() T-Shirt (Red)')
        expect(lastProduct).toBe('Sauce Labs Backpack');
    })
})