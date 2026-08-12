const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const inventoryData = require('../test-data/inventoryData.json');
const globalVariable = require('../config/globalVariable');
const { matikanAnimasi } = require('../helper/uiHelper');

test.describe('Inventory Validation', () => {
    let loginPage;
    test.beforeEach(async ({ page }) => {
        // Memanggil helper anti-flaky pada css
        await matikanAnimasi(page);
        loginPage = new LoginPage(page);
        await loginPage.navigasi();
    });

    test('Verify inventory products', async ({ page }) => {

        const inventoryPage =
        new InventoryPage(page);

        // Login
        await loginPage.lakukanLogin(globalVariable.credentials.userValid, globalVariable.credentials.password);

        // Verify inventory products
        await inventoryPage.verifyInventoryProducts(
        inventoryData
        );
    });
    });