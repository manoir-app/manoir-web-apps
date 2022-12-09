///<reference path="typings/angular.d.ts" />
///<reference path="typings/manoirApp.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />
///<reference path="typings/signalr/index.d.ts" />
var Manoir;
(function (Manoir) {
    var WelcomeApp;
    (function (WelcomeApp) {
        class DefaultPage extends Manoir.Common.ManoirAppPage {
            constructor($scope, $http, $timeout) {
                super();
                this.scope = $scope;
                this.http = $http;
                this.$timeout = $timeout;
                this.scope.Events = this;
                this.scope.Loading = true;
                this.init();
                let self = this;
                this.RefreshData();
                setInterval(function () { self.RefreshData(); }, 5000);
            }
            init() {
                try {
                    super.checkLogin(true);
                }
                catch (e) {
                    document.location.reload(true);
                }
                this.connection = new signalR.HubConnectionBuilder()
                    .withUrl("/hubs/1.0/appanddevices")
                    .withAutomaticReconnect()
                    .build();
                this.connection.on("notifyMeshChange", this.onMeshChange);
            }
            onMeshChange(changeType, mesh) {
                console.log(mesh);
            }
            RefreshData() {
                let self = this;
                let sc = self.scope;
            }
        }
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