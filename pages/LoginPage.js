const globalVariable = require('../config/globalVariable')
const { validateUrlWithRetry} = require('../helper/validateURLwithRetry')
const { expect } = require('@playwright/test');
const { matikanAnimasi } = require('../helper/uiHelper');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryContainer = page.locator('#inventory_container').first();
  }

  async navigasi() {
    await this.page.goto(globalVariable.url.baseUrl);
    await expect(this.usernameInput).toBeEnabled();
  }

  // Fungsi dinamis untuk mengisi kredensial
  async lakukanLogin(username, password) {
    if (username) await this.usernameInput.fill(username);
    if (password) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Menunggu berbasis kondisi untuk error
  async tungguPesanError() {
    await this.errorMessage.waitFor({ state: 'visible' });
  }

  // Menunggu berbasis kondisi - pengecekan URL halaman Inventory
  async tungguHalamanInventory() {
    await validateUrlWithRetry(
        this.page,
        globalVariable.url.inventoryUrl,
        globalVariable.setting.maxRetries,
        globalVariable.setting.delayShort
    )
    await this.inventoryContainer.waitFor({ state: 'visible' });
  }
}

module.exports = { LoginPage };