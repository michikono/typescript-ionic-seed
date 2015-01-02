/// <reference path="../../definitions.d.ts" />
declare module typeScriptIonicApp.components.login {
    export interface ILoginScope extends ng.IScope {
        vm: {
            doLogin: () => void;
            username: string;
            password: string;
        }
    }
}
