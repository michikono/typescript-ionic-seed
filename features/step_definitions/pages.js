var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var steps = function () {
  var Given = When = Then = this.defineStep

  // centralize page definitions and navigation to them
  var pages = {
    'home': '/app/home',
    'login': '/app/login'
  }

  Given(/visit the (\w+) page$/, function (pageName, next) {
    this.browser.get('http://localhost:8000/#' + pages[pageName]);
    next();
  });

  Given(/visit "([^"]*)"$/, function (link, next) {
    this.browser.get('http://localhost:8000/#' + link);
    next();
  });

  Given(/click on "([^"]*)"$/, function (text, next) {
    this.browser.findElement(this.by.cssContainingText('a,button,[ng-click]', text)).click();
    next();
  });

  Then(/^I? ?(should )?be redirected to "([^"]*)"$/, function (ignore1, newLink, next) {
    expect(this.browser.getLocationAbsUrl()).to.become(newLink).and.notify(next);
  });

  Then(/^I? ?(should )?be redirected to the (\w+) page$/, function (ignore1, pageName, next) {
    expect(this.browser.getLocationAbsUrl()).to.become(pages[pageName]).and.notify(next);
  });
};

module.exports = steps;