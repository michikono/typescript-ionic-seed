/// <reference path='../../definitions.d.ts' />

module typeScriptIonicApp.common.services {

    export class SampleData {
        getData():string {
            return 'mySampleData';
        }
    }

    export var app:ng.IModule = app || angular.module('typeScriptIonicApp.common.services', ['ionic']);
    app.service('SampleDataService', () => {
        return new SampleData();
    });
}
