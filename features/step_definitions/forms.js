var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var steps = function () {
  var Given = When = Then = this.defineStep

  Given(/press "([^"]*)"$/, function (text, next) {
    this.browser.findElement(this.by.cssContainingText('a,button,[ng-click]', text)).click();
    next();
  });

  this.Then(/^fill in "([^"]*)" with "([^"]*)"$/, function (fieldName, value, next) {
    this.browser.element(this.by.model('vm.' + fieldName)).sendKeys(value);
    next();
  });

  this.Then(/^"([^"]*)" should be "([^"]*)"$/, function (fieldName, value, next) {
    expect(this.browser.element(this.by.model('vm.' + fieldName)).getAttribute('value')).to.become(value).and.notify(next);
  });


};

module.exports = steps;