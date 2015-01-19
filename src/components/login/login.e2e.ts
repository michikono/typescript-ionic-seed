module typeScriptIonicApp.components.login {
    export class LoginFeature {
        usernameInput = element(by.model('vm.username'));
        passwordInput = element(by.model('vm.password'));
        submitButton = element(by.buttonText('Login'));

        fillInForm(username:string, password:string) {
            this.usernameInput.sendKeys(username);
            this.passwordInput.sendKeys(password);
            return this;
        }

        submitForm() {
            this.submitButton.click();
            return this;
        }

        visit() {
            browser.get('#/app/login');
            return this;
        }

        isRendered() {
            return element(by.cssContainingText('h1', 'Login')).isPresent();
        }

        getUsername() {
            return this.usernameInput.getAttribute('value');
        }

        getPassword() {
            return this.passwordInput.getAttribute('value');
        }

        getCorrectUrl() {
            return '/app/login';
        }
    }

    describe('Login Feature', function () {
        var feature;

        beforeEach(function () {
            feature = new LoginFeature();
            feature.visit();
        });

        it('should render login page when user navigates to #/app/login', function () {
            expect(browser.getLocationAbsUrl()).toBe(feature.getCorrectUrl());
        });

        it('should render the correct contents', function () {
            expect(feature.isRendered()).toBe(true);
        });

        it('should render login page with default username', function () {
            expect(feature.getUsername()).toBe('default');
            expect(feature.getPassword()).toBe('');
        });

        it('should let me login via login button', function () {
            feature.fillInForm('Julie', 'myPassword');
            expect(feature.getUsername()).toBe('defaultJulie');
            expect(feature.getPassword()).toBe('myPassword');
            feature.submitForm();
            expect((new typeScriptIonicApp.components.home.HomeFeature()).isRendered()).toEqual([true, true, true]);
        });
    });
}
