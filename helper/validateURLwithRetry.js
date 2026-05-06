const globalVariable = require('../config/globalVariable')

function isUrlMatch(currentUrl, expected) {
  if (expected instanceof RegExp) {
    return expected.test(currentUrl)
  }

  if (typeof expected === 'string') {
    return currentUrl.includes(expected)
  }

  throw new Error('expectedURL harus string atau RegExp')
}

async function validateUrlWithRetry(
  page,
  expectedURL,
  maxRetries = globalVariable.setting.maxRetries,
  delay = globalVariable.setting.delayShort
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const currentUrl = page.url()

    if (isUrlMatch(currentUrl, expectedURL)) {
      console.log(`INFO: URL Match: ${currentUrl}`)
      return
    }

    console.log(
        `Percobaan: ${attempt}/${maxRetries} gagal. URL saat ini masih tidak cocok\n` +
        `Tunggu ${delay}ms sebelum mengulang...`
    )

    await page.waitForTimeout(delay)
  }

  throw new Error(
    `URL validation gagal setelah ${maxRetries} pengulangan\n` +
    `URL akhir yang tertangkap: ${page.url()}`
  )
}

module.exports = { validateUrlWithRetry }

