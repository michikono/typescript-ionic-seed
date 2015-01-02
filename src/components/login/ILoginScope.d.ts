/// <reference path="../../definitions.d.ts" />

declare module typeScriptIonicApp.components.login {
    export interface ILoginScope extends typeScriptIonicApp.core.ICoreScope {
        vm: {
            doLogin: () => void;
            username: string;
            password: string;
        }
    }
}
