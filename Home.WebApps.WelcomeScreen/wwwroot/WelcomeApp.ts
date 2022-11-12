///<reference path="typings/angular.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />

module Manoir.WelcomeApp {

    interface IDefaultPageScope extends ng.IScope {
        Loading: boolean;
    }

    export class DefaultPage extends Manoir.Common.ManoirAppPage {
        scope: IDefaultPageScope;
        $timeout: ng.ITimeoutService;
        http: any;
        constructor($scope: IDefaultPageScope, $http: any, $timeout: ng.ITimeoutService) {
            super();
            this.scope = $scope;
            this.http = $http;
            this.$timeout = $timeout;
            this.scope.Events = this;
            this.scope.Loading = true;
            let self = this;
            this.RefreshData();
            setInterval(function () { self.RefreshData(); }, 5000);
        }

        public RefreshData(): void {
            let self = this;
            let sc = self.scope;
        }
    }
}

var theApp = angular.module('WelcomeApp', []);

theApp.controller('DefaultPage', Manoir.WelcomeApp.DefaultPage);
theApp.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    }
});
