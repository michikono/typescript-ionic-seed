/// <reference path='../../definitions.d.ts' />

module typeScriptIonicApp.components.home {
    export interface IHomeScope extends typeScriptIonicApp.common.ICoreScope {
        vm: {
            doLogout: () => void
        }
    }

    // this export lets us directly initialize this during tests
    export class HomeController {
        constructor(public $scope:IHomeScope, private $state:ng.ui.IStateService, private $ionicHistory) {
            console.log('home loaded!');
            // 'vm' stands for 'view model'. An additional benefit to this is to prevent primatives getting
            // assigned to the scope directly
            $scope.vm = this;
        }

        doLogout() {
            console.log('logout called');
            this.$state.go('app.login', {}, {location: 'replace'});
            this.$ionicHistory.nextViewOptions({
                disableBack: true
            });
        }
    }

    function setRouteState($stateProvider:ng.ui.IStateProvider) {
        var state:ng.ui.IState = {
            url: '/home',
            views: {
                menuContent: {
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeController'
                }
            }
        };

        $stateProvider.state('app.home', state);
    }

    export var app:ng.IModule = app || angular.module('typeScriptIonicApp.components.home', ['ionic']);
    app.controller('HomeController', HomeController);
    app.config(setRouteState);
}
