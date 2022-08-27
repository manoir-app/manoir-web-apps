///<reference path="typings/angular.d.ts" />
///<reference path="typings/manoirApp.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />
///<reference path="typings/signalr/index.d.ts" />
///<reference path="typings/manoirApp.d.ts" />
var Manoir;
(function (Manoir) {
    var DeviceHomeApp;
    (function (DeviceHomeApp) {
        class DefaultPage extends Manoir.Common.ManoirAppPage {
            constructor($scope, $http, $timeout) {
                super();
                this.scope = $scope;
                this.http = $http;
                this.$timeout = $timeout;
                this.scope.Loading = true;
                let self = this;
                this.init();
            }
            init() {
                this.connection = new signalR.HubConnectionBuilder()
                    .withUrl("/hubs/1.0/appanddevices")
                    .withAutomaticReconnect()
                    .build();
                this.connection.on("notifyMeshChange", this.onMeshChange);
                this.connection.start().catch(err => console.error(err));
            }
            onMeshChange(changeType, mesh) {
                console.log(mesh);
            }
            RefreshData() {
            }
        }
        DeviceHomeApp.DefaultPage = DefaultPage;
    })(DeviceHomeApp = Manoir.DeviceHomeApp || (Manoir.DeviceHomeApp = {}));
})(Manoir || (Manoir = {}));
var theApp = angular.module('DeviceHomeApp', []);
theApp.controller('DefaultPage', Manoir.DeviceHomeApp.DefaultPage);
theApp.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    };
});
//# sourceMappingURL=DeviceHomeApp.js.map