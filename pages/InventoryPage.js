const { expect } = require('@playwright/test');

class InventoryPage {

  constructor(page) {

    this.page = page;

    // Parent container
    this.inventoryItems =
      page.locator('[data-test="inventory-item"]');
  }

  /**
   * Get inventory container by product name
   */
  getInventoryContainer(productName) {

    return this.inventoryItems.filter({
      has: this.page.locator(
        '[data-test="inventory-item-name"]',
        {
          hasText: productName
        }
      )
    });
  }

  /**
   * Child locators
   */
  getProductName(container) {

    return container.locator(
      '[data-test="inventory-item-name"]'
    );
  }

  getProductPrice(container) {

    return container.locator(
      '[data-test="inventory-item-price"]'
    );
  }

  getProductImage(container) {

    return container.locator(
      '.inventory_item_img img'
    );
  }

  /**
   * Verify all inventory products
   */
  async verifyInventoryProducts(products) {

    await expect(this.inventoryItems)
      .toHaveCount(products.length);

    for (const [index, product] of products.entries()) {
        const productNumber = index + 1;
        const container = this.getInventoryContainer(product.name);
        const productName = this.getProductName(container);
        const productPrice = this.getProductPrice(container);
        const productImage = this.getProductImage(container);

        // Verify product name
        await expect(productName).toHaveText(product.name);

        // Verify product price
        await expect(productPrice).toHaveText(product.price);

        // Verify image visible
        await expect(productImage).toBeVisible();

        // Verify image src
        const imageSrc = await productImage.getAttribute('src');

        expect(imageSrc).toContain(product.image);

        // Success log
        console.log(`
            ====================================
            [Product ${productNumber}] Verified 
            ------------------------------------
            product Number  : 
            Name            : ${product.name}
            Price           : ${product.price}
            Image           : ${product.image}
            ====================================
            `);
        }
  }
}

module.exports = { InventoryPage };