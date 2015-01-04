// protractor configuration file
exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './www/test/e2e.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};