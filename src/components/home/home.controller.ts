/// <reference path='../../definitions.d.ts' />
/// <reference path='IHomeScope.ts' />

module typeScriptIonicApp {

    // this export lets us directly initialize this during tests
    export class HomeCtrl {
        constructor(public $scope:IHomeScope, private $state:ng.ui.IStateService, private $ionicHistory) {
            console.log('home loaded');
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
                    controller: 'HomeCtrl'
                }
            }
        };

        $stateProvider.state('app.home', state);
    }

    export var app:ng.IModule = angular.module('typeScriptIonicApp.home', ['ionic']);
    app.controller('HomeCtrl', HomeCtrl);
    app.config(setRouteState);
}
