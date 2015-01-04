var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var steps = function () {
  var Given = When = Then = this.defineStep

  Then(/^I? ?(should )?see heading "([^"]*)"$/, function (ignore1, text, next) {
    expect(this.browser.isElementPresent(this.by.cssContainingText('h1,h2,h3,h4,h5,h6', text))).to.become(true).and.notify(next);
  });

  Then(/^I? ?(should )?not see heading "([^"]*)"$/, function (ignore1, text, next) {
    expect(this.browser.isElementPresent(this.by.cssContainingText('h1,h2,h3,h4,h5,h6', text))).to.become(false).and.notify(next);
  });

  Then(/^I? ?(should )?see a "([^"]*)" control$/, function (ignore1, text, next) {
    expect(this.browser.isElementPresent(this.by.cssContainingText('a,button,[ng-click]', text))).to.become(true).and.notify(next);
  });

  Then(/^I? ?(should )?not see a "([^"]*)" control$/, function (ignore1, text, next) {
    expect(this.browser.isElementPresent(this.by.cssContainingText('a,button,[ng-click]', text))).to.become(false).and.notify(next);
  });

  Then(/^I? ?(should )?see a "([^"]*)" button$/, function (ignore1, text, next) {
    expect(this.browser.isElementPresent(this.by.partialButtonText(text))).to.become(true).and.notify(next);
  });

  Then(/^I? ?(should )?not see a "([^"]*)" button$/, function (ignore1, text, next) {
    expect(this.browser.isElementPresent(this.by.partialButtonText(text))).to.become(false).and.notify(next);
  });

  Then(/^I? ?(should )?not see an instance of "([^"]*)"$/, function (ignore1, cssClass, next) {
    expect(this.browser.isElementPresent(this.by.css('.' + cssClass))).to.become(false).and.notify(next);
  });

  Then(/^I? ?(should )?see an instance of "([^"]*)"$/, function (ignore1, cssClass, next) {
    expect(this.browser.isElementPresent(this.by.css('.' + cssClass))).to.become(true).and.notify(next);
  });

  Then(/^I? ?(should )?see "([^"]*)"$/, function (ignore1, text, next) {
    expect(this.browser.isElementPresent(this.by.cssContainingText('body', text))).to.become(true).and.notify(next);
  });

  Then(/^I? ?(should )?not see "([^"]*)"$/, function (ignore1, text, next) {
    expect(this.browser.isElementPresent(this.by.cssContainingText('body', text))).to.become(false).and.notify(next);
  });
};

module.exports = steps;