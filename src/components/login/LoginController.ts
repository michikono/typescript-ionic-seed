/// <reference path='../../definitions.d.ts' />

module typeScriptIonicApp.components.login {
    export interface ILoginScope extends typeScriptIonicApp.common.ICoreScope {
        vm: {
            doLogin: () => void;
            username: string;
            password: string;
        }
    }

    export class LoginController {
        public username: string;
        public password: string;

        constructor(public $scope: ILoginScope, 
                    private $state: ng.ui.IStateService, 
                    private $ionicHistory: ionic.navigation.IonicHistoryService) {
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
                    controller: 'LoginController'
                }
            }
        };

        $stateProvider.state('app.login', state);
    }

    export var app:ng.IModule = app || angular.module('typeScriptIonicApp.components.login', ['ionic']);
    app.controller('LoginController', LoginController);
    app.config(loginConfig);
}
