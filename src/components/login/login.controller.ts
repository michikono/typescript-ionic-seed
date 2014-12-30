/// <reference path='../../definitions.d.ts' />

module typeScriptIonicApp {

    // this export lets us directly initialize this during tests
    export class LoginCtrl {

        public username: string;
        public password: string;

        constructor(public $scope:ILoginScope, private $state:ng.ui.IStateService, private $ionicHistory) {
            this.username = 'default';
            console.log('Login loaded');
            // 'vm' stands for 'view model'. An additional benefit to this is to prevent primatives getting
            // assigned to the scope directly
            $scope.vm = this;
        }

        doLogin() {
            console.log('login called for ' + this.username);
            this.$state.go('app.home', {}, {location: 'replace'});
            this.$ionicHistory.nextViewOptions({
                disableBack: true
            });
        }
    }


    function loginConfig($stateProvider:ng.ui.IStateProvider) {
        var state:ng.ui.IState = {
            url: '/login',
            views: {
                menuContent: {
                    templateUrl: 'components/login/login.html',
                    controller: 'LoginCtrl'
                }
            }
        };

        $stateProvider.state('app.login', state);
    }


    export var app:ng.IModule = angular.module('typeScriptIonicApp.login', ['ionic']);
    app.controller('LoginCtrl', LoginCtrl);
    app.config(loginConfig);

}
