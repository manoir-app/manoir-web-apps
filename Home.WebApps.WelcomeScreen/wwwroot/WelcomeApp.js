///<reference path="typings/angular.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Manoir;
(function (Manoir) {
    var WelcomeApp;
    (function (WelcomeApp) {
        var DefaultPage = /** @class */ (function (_super) {
            __extends(DefaultPage, _super);
            function DefaultPage($scope, $http, $timeout) {
                var _this = _super.call(this) || this;
                _this.scope = $scope;
                _this.http = $http;
                _this.$timeout = $timeout;
                _this.scope.Events = _this;
                _this.scope.Loading = true;
                var self = _this;
                _this.RefreshData();
                setInterval(function () { self.RefreshData(); }, 5000);
                return _this;
            }
            DefaultPage.prototype.RefreshData = function () {
                var self = this;
                var sc = self.scope;
            };
            return DefaultPage;
        }(Manoir.Common.ManoirAppPage));
        WelcomeApp.DefaultPage = DefaultPage;
    })(WelcomeApp = Manoir.WelcomeApp || (Manoir.WelcomeApp = {}));
})(Manoir || (Manoir = {}));
var theApp = angular.module('WelcomeApp', []);
theApp.controller('DefaultPage', Manoir.WelcomeApp.DefaultPage);
theApp.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    };
});
//# sourceMappingURL=WelcomeApp.js.map