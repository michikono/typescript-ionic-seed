/// <reference path='../../definitions.d.ts' />

describe('Login Controller', function () {
    var controller:typeScriptIonicApp.LoginCtrl;
    var scope:ILoginScope;
    var $location:ng.ILocationService;
    var $state:ng.ui.IStateService;
    var $ionicHistory:any;

    beforeEach(function () {
        angular.mock.module('typeScriptIonicApp.login');
    });

    beforeEach(inject(function ($rootScope:ng.IRootScopeService,
                                _$location_:ng.ILocationService,
                                _$state_:ng.ui.IStateService,
                                _$ionicHistory_:any) {
        scope = <any>$rootScope.$new();
        $location = _$location_;
        $state = _$state_;
        $ionicHistory = _$ionicHistory_;
    }));

    it('should have a default username', () => {
        controller = new typeScriptIonicApp.LoginCtrl(scope, $state, $ionicHistory);
        expect(controller).not.toBeNull();
        expect(scope.vm.username).toEqual('default');
        expect(scope.vm.password).toBeUndefined();
    });
});
