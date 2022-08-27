///<reference path="typings/angular.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />
var Manoir;
(function (Manoir) {
    var WelcomeApp;
    (function (WelcomeApp) {
        var DefaultPage = /** @class */ (function () {
            function DefaultPage($scope, $http, $timeout) {
                this.scope = $scope;
                this.http = $http;
                this.$timeout = $timeout;
                this.scope.Events = this;
                this.scope.Loading = true;
                var self = this;
                this.RefreshData();
                setInterval(function () { self.RefreshData(); }, 5000);
            }
            DefaultPage.prototype.RefreshData = function () {
                var self = this;
                var sc = self.scope;
                //let url = "api/presence?ts=" + (new Date).getTime();
                //fetch(url)
                //    .then(res => res.json())
                //    .then(json => {
                //        sc.currentPresence = json;
                //        self.updateUsersFromPresence(sc.allUsers, sc.currentPresence);
                //        sc.Loading = false;
                //        sc.$applyAsync(function () { });
                //    });
            };
            return DefaultPage;
        }());
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