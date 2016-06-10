/// <reference path='../../definitions.d.ts' />

module typeScriptIonicApp.common.services {
    describe('SampleDataService', function () {
        var $log: ng.ILogService, SampleDataService: ISampleData;

        beforeEach(function () {
            angular.mock.module('typeScriptIonicApp.common.services');
        });

        beforeEach(inject(function (_SampleDataService_: ISampleData, _$log_: ng.ILogService) {
            $log = _$log_;
            SampleDataService = _SampleDataService_;
        }));

        describe('getData()', () => {
            it('should call $log.log and return "LoremIpsum"', () => {
                spyOn($log, 'log');
                expect(SampleDataService.getData()).toEqual('LoremIpsum');
                expect($log.log).toHaveBeenCalledWith('getData() called');
            });
        });
    });
}

