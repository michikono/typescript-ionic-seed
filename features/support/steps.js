var pc = require('protractor-cucumber');

var steps = function () {
  this.World = pc.world('http://localhost:4444/wd/hub', {
    browser: 'chrome',
    timeout: 100000
  });

  this.After(function (callback) {
    this.quit(callback);
  });
};

module.exports = steps;