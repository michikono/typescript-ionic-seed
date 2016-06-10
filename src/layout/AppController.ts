/// <reference path="../definitions.d.ts" />
module typeScriptIonicApp {
    class AppController {
        constructor(private $scope: IAppScope) {
            console.log('app loaded');
            // 'vm' stands for 'view model'. An additional benefit to this is to prevent primatives getting
            // assigned to the scope directly
            $scope.vm = this;
        }
    }

    export var app: ng.IModule = app || angular.module('typeScriptIonicApp');
    app.controller('AppController', AppController);
}
