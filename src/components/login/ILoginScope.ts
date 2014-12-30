interface ILoginScope extends ng.IScope {
    vm: {
        doLogin: () => void;
        username: string;
        password: string;
    }
}
