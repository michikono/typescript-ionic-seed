/// <reference path="../lib/definitions/e2e-definitions/angular-protractor/angular-protractor.d.ts" />
/// <reference path="../lib/definitions/e2e-definitions/selenium-webdriver/selenium-webdriver.d.ts" />

'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('#');

    it('should automatically redirect to #/app/home when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch('/app/home');
    });

    describe('#/app/login', function () {

        beforeEach(function () {
            browser.get('#/app/login');
        });

        it('should render login page when user navigates to #/app/login', function () {
            expect(element(by.cssContainingText('h1', 'Login')).isPresent()).toBe(true);
            expect(element(by.buttonText('Login')).isPresent()).toBe(true);
        });

        it('should render login page with default username', function () {
            expect(element(by.model('vm.username')).getAttribute('value')).toBe('default');
        });

        it('should let me login via login button', function () {
            var input = element(by.model('vm.username'));
            input.sendKeys('Julie');
            expect(input.getAttribute('value')).toBe('defaultJulie');
            element(by.buttonText('Login')).click();
            expect(element(by.cssContainingText('h1', 'Home')).isPresent()).toBe(true);
        });
    });

    describe('#/app/home', function () {

        beforeEach(function () {
            browser.get('#/app/home');
        });

        it('should render view2 when user navigates to #/app/home', function () {
            expect(element(by.cssContainingText('h1', 'Home')).isPresent()).toBe(true);
            expect(element(by.partialButtonText('Logout')).isPresent()).toBe(true);
        });

        it('should let me log out via the link', function () {
            element(by.partialButtonText('Logout')).click();
            expect(element(by.cssContainingText('h1', 'Login')).isPresent()).toBe(true);
        });

    });
});
