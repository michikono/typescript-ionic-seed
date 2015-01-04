// protractor configuration file for cucumber
exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'features/**/*.feature'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'cucumber',
  cucumberOpts: {
    require: 'features/',
    format: "pretty"
  }
};