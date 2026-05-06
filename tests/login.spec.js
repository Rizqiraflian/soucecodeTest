const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { matikanAnimasi } = require('../helper/uiHelper');
const globalVariable = require('../config/globalVariable')

test.describe('Fokus Validasi Fitur Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    // Memanggil helper anti-flaky pada css
    await matikanAnimasi(page);
    loginPage = new LoginPage(page);
    await loginPage.navigasi();
  });

  test('Skenario Positif: Akses diterima dengan kredensial yang tepat', async ({ page }) => {
    await loginPage.lakukanLogin(globalVariable.credentials.userValid, globalVariable.credentials.password);
    
    // Menahan skrip hingga URL match dan DOM mendeteksi kontainer produk muncul
    await loginPage.tungguHalamanInventory();

    // Assertion
    await test.step('Standard User sukses login dan melihat halaman inventory', async () => {
        expect(page.url()).toContain('/inventory.html');
        await expect(loginPage.inventoryContainer).toBeVisible();
        console.log('INFO: Login berhasil dan user melihat daftar inventasi produk.');
    });
  });

  test('Skenario Negatif: Akses ditolak akibat kombinasi sandi tidak valid', async () => {
    await loginPage.lakukanLogin(globalVariable.credentials.userValid, globalVariable.credentials.invalidPass);
    
    await loginPage.tungguPesanError();

    // Assertion
    await test.step('Check message validation kombinasi sandi tidak valid', async () => {
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
        console.log('INFO: Validasi berfungsi dan pesan error yang ditampilkan sesuai');
    })
  });

  test('Skenario Negatif: Akses ditolak karena status akun terkunci (locked out)', async () => {
    await loginPage.lakukanLogin(globalVariable.credentials.userLock, globalVariable.credentials.password);
    
    await loginPage.tungguPesanError();
    await test.step('Check message validation akses ditolak karena account locked out', async () => {
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        console.log('INFO: Validasi berfungsi dan pesan error yang ditampilkan sesuai')
    })
  });

  test('Skenario Negatif: Akses ditolak saat menekan tombol login tanpa inputan', async () => {
    // Simulasi mengosongkan kedua field
    await loginPage.lakukanLogin('', '');
    await loginPage.tungguPesanError();

    // Assertion
    await test.step('Check message validation ketika user tidak memasukan inputan', async () => {
        await expect(loginPage.errorMessage, 'Peringatan kolom wajib diisi harus tertampil').toContainText('Username is required'); 
        console.log('INFO: Validasi berfungsi dan pesan error yang ditampilkan sesuai')
    })
  });
});