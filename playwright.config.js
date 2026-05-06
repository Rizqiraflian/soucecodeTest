const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  /* Menurunkan batas pekerja paralel saat berada di CI untuk mencegah bottleneck CPU/RAM */
  workers: process.env.CI ? 1 : undefined,
  /* Pengaturan percobaan ulang jika terjadi kegagalan asertif yang langka */
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});