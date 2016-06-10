/// <reference path='../../definitions.d.ts' />

module typeScriptIonicApp.common.services {

    export interface ISampleData {
        getData: () => string;
    }

    export class SampleData implements ISampleData {
        
        /** @ngInject */
        constructor(private $log: ng.ILogService) {
        }

        getData():string {
            this.$log.log('getData() called');
            return 'LoremIpsum';
        }
    }

    export var app: ng.IModule = app || angular.module('typeScriptIonicApp.common.services', ['ionic']);
    app.service('SampleDataService', SampleData);
}
