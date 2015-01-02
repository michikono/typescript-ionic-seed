/// <reference path='./definitions.d.ts' />

// this hide message errors from compiler
interface Window {
    cordova: any;
    StatusBar: any;
}

module typeScriptIonicApp {

    export var app:ng.IModule = angular.module('typeScriptIonicApp', [
        'ionic',
        'templates',
        'typeScriptIonicApp.components.home',
        'typeScriptIonicApp.components.login'
    ]);

    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                window.StatusBar.styleDefault();
            }
        });
    });

    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'layout/menu/menu.html',
            controller: 'AppController'
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
}
