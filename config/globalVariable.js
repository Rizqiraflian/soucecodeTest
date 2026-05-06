const globalVariable = {
  setting: {
    maxRetries: 15,
    delayShort: 1000,
    delayMedium: 3000,
    delayLong: 5000,
  },

  url: {
    baseUrl: 'https://www.saucedemo.com/',
    inventoryUrl : 'https://www.saucedemo.com/inventory.html'
  },

  //untuk best practice nya credential di simpan di .env
  credentials: {
    userValid: 'standard_user',
    userLock: 'locked_out_user',
    password: 'secret_sauce',
    invalidPass : 'invalid'
  }
}

module.exports = globalVariable;