/**
 * Menonaktifkan semua animasi dan transisi CSS secara global pada halaman
 * untuk mencegah flakiness akibat interaksi sebelum elemen selesai bergerak.
 * 
 * @param {import('@playwright/test').Page} page - Objek page dari Playwright
 */
async function matikanAnimasi(page) {
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.innerHTML = '* { transition: none !important; animation: none !important; }';
    document.head.appendChild(style);
  });
}

module.exports = { matikanAnimasi };