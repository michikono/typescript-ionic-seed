module typeScriptIonicApp {

    interface IAppScope extends ng.IScope {
        vm: {

        }
    }

    class AppCtrl {
        constructor(private $scope:IAppScope) {
            console.log('app loaded');
            // 'vm' stands for 'view model'. An additional benefit to this is to prevent primatives getting
            // assigned to the scope directly
            $scope.vm = this;
        }
    }

    export var app:ng.IModule = angular.module('typeScriptIonicApp');
    app.controller('AppCtrl', AppCtrl);
}
