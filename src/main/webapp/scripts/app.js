'use strict';

/**
 * @ngdoc overview
 * @name activageDashboardApp
 * @description
 * # activageDashboardApp
 *
 * Main module of the application.
 */
var app = angular
  .module('activageDashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'route-segment',
    'view-segment'
  ]);

app.config(['$locationProvider', '$routeSegmentProvider', '$routeProvider', function ($locationProvider, $routeSegmentProvider, $routeProvider) {

  $locationProvider.html5Mode({
    enabled: false,
    requireBase: true,
    rewriteLinks: true
  }).hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/main/device_manager'});

  $routeSegmentProvider
    .when('/main', 'main')
    .when('/main/device_manager', 'main.device_manager')
    .when('/main/device_manager/device_view', 'main.device_manager.device_id')
    .when('/main/device_manager/add_platform', 'main.device_manager.add_platform')
    .when('/main/device_manager/add_device', 'main.device_manager.add_device')
    .when('/main/device_manager/info_platform', 'main.device_manager.info_platform')
    .when('/main/device_manager/modify_device', 'main.device_manager.modify_device')

    .segment('main', {
      templateUrl: 'views/main.html',
      controller: 'mainCtrl',
      controllerAs: 'main'
    })

    .within()

    .segment('device_manager', {
      templateUrl: 'views/device-manager.html',
      controller: 'deviceCtrl',
      controllerAs: 'devCtrl'
    })

    .within()

    .segment('device_id', {
      templateUrl: 'views/device-info.html',
      controller: 'deviceInfoCtrl',
      controllerAs: 'deviceInfo'
    })

    .segment('add_platform', {
      templateUrl: 'views/add-platform.html',
      controller: 'addPlatformCtrl',
      controllerAs: 'addPlatform'
    })

    .segment('add_device', {
      templateUrl: 'views/add-device.html',
      controller: 'addDeviceCtrl',
      controllerAs: 'addDevice'
    })

    .segment('info_platform', {
      templateUrl: 'views/platform-info.html',
      controller: 'mainCtrl',
      controllerAs: 'main'
    })

    .segment('modify_device', {
      templateUrl: 'views/modify-device.html',
      controller: 'deviceCtrl',
      controllerAs: 'devCtrl'
    });

}]);
