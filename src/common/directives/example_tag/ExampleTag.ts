module typeScriptIonicApp.common.directives {
    export interface IExampleTagDirectiveScope extends typeScriptIonicApp.common.ICoreScope {
        vm: {
        }
    }

    export class ExampleTagDirective implements ng.IDirective {
        public restrict = 'E';
        public templateUrl = 'common/directives/example_tag/index.html';
        public controller = 'ExampleTagDirectiveController';
        public scope = {};

        constructor() {
        }
    }

    export class ExampleTagDirectiveController {
        constructor(public $scope:IExampleTagDirectiveScope) {
            $scope.vm = this;
            console.log('controller constructor ran');
        }
    }

    export var app:ng.IModule = angular.module('typeScriptIonicApp.common.directives', ['templates']);
    app.directive('exampleTag', () => new ExampleTagDirective());
    app.controller('ExampleTagDirectiveController', ExampleTagDirectiveController);

}
