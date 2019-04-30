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

  $routeProvider.otherwise({redirectTo: '/main/about/deployment_manager'});

  $routeSegmentProvider
    .when('/main', 'main')
    .when('/main/deployment_manager', 'main.deployment_manager')
    .when('/main/deployment_manager/device_list', 'main.deployment_manager.device_list')
    .when('/main/deployment_manager/deployment_info', 'main.deployment_manager.deployment_info')
    .when('/main/deployment_manager/create_deployment', 'main.deployment_manager.create_deployment')
    .when('/main/deployment_manager/update_deployment', 'main.deployment_manager.update_deployment')
    .when('/main/deployment_manager/delete_deployment', 'main.deployment_manager.delete_deployment')
    .when('/main/component_configurator', 'main.component_configurator')
    .when('/main/component_configurator/component_view', 'main.component_configurator.component_view')
    .when('/main/component_configurator/component_view/add_platform', 'main.component_configurator.component_view.add_platform')
    .when('/main/component_configurator/component_view/add_device', 'main.component_configurator.component_view.add_device')
    .when('/main/component_configurator/component_view/add_service', 'main.component_configurator.component_view.add_service')
    .when('/main/component_configurator/component_view/platform_info', 'main.component_configurator.component_view.platform_info')
    .when('/main/component_configurator/component_view/update_platform', 'main.component_configurator.component_view.update_platform')
    .when('/main/component_configurator/component_view/device_info', 'main.component_configurator.component_view.device_info')
    .when('/main/component_configurator/component_view/update_device', 'main.component_configurator.component_view.update_device')
    .when('/main/maintenance_panel', 'main.maintenance_panel')
    .when('/main/maintenance_panel/maintenance_info', 'main.maintenance_panel.maintenance_info')
    .when('/main/maintenance_panel/add_maintenance', 'main.maintenance_panel.add_maintenance')
    .when('/main/maintenance_panel/update_maintenance', 'main.maintenance_panel.update_maintenance')
    .when('/main/maintenance_panel/delete_maintenance', 'main.maintenance_panel.delete_maintenance')
    .when('/main/about', 'main.about')
    .when('/main/about/deployment_manager', 'main.about.deployment_manager')
    .when('/main/about/component_configurator', 'main.about.component_configurator')
    .when('/main/about/maintenance_panel', 'main.about.maintenance_panel')

    .segment('main', {
      templateUrl: 'views/main.html',
      // controller: 'mainCtrl',
      // controllerAs: 'main'
    })

    .within()

    .segment('deployment_manager', {
      templateUrl: 'views/deployment-manager.html',
      controller: 'deploymentCtrl',
      controllerAs: 'deployCtrl'
    })

    .within()

    .segment('device_list', {
      templateUrl: 'views/device-list.html',
      controller: 'deviceListCtrl',
      controllerAs: 'deviceList'
    })

    .segment('deployment_info', {
      templateUrl: 'views/deployment-info.html',
      controller: 'deploymentInfoCtrl',
      controllerAs: 'deployInfo'
    })

    .segment('create_deployment', {
      templateUrl: 'views/create-deployment.html',
      controller: 'createDeploymentCtrl',
      controllerAs: 'createDeploy'
    })

    .segment('update_deployment', {
      templateUrl: 'views/update-deployment.html',
      controller: 'updateDeploymentCtrl',
      controllerAs: 'updateCtrl'
    })

    .segment('delete_deployment', {
      templateUrl: 'views/delete-deployment.html',
      // controller: 'deploymentCtrl',
      // controllerAs: 'deployCtrl'
    })

    .up()

    .segment('component_configurator', {
      templateUrl: 'views/component-configuration.html',
      controller: 'componentCtrl',
      controllerAs: 'component'
    })

    .within()

    .segment('component_view', {
      templateUrl: 'views/component-view.html',
      controller: 'componentViewCtrl',
      controllerAs: 'componentView'
    })

    .within()

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

    .segment('add_service', {
      templateUrl: 'views/add-service.html',
      controller: 'addServiceCtrl',
      controllerAs: 'addService'
    })

    .segment('platform_info', {
      templateUrl: 'views/platform-info.html',
      controller: 'platformInfoCtrl',
      controllerAs: 'platformInfo'
    })

    .segment('update_platform', {
      templateUrl: 'views/update-platform-info.html',
      controller: 'platformInfoCtrl',
      controllerAs: 'platformInfo'
    })

    .segment('device_info', {
      templateUrl: 'views/device-info.html',
      controller: 'componentDeviceCtrl',
      controllerAs: 'componentDevice'
    })

    .segment('update_device', {
      templateUrl: 'views/update_device.html',
      controller: 'componentUpdateCtrl',
      controllerAs: 'componentUpdate'
    })

    .up()
    .up()

    .segment('maintenance_panel', {
      templateUrl: 'views/maintenance-panel.html',
      controller: 'maintenanceCtrl',
      controllerAs: 'maintenance'
    })

    .within()

    .segment('maintenance_info', {
      templateUrl: 'views/maintenance-info.html',
      controller: 'maintenanceInfoCtrl',
      controllerAs: 'maintenanceInfo'
    })

    .segment('add_maintenance', {
      templateUrl: 'views/add-maintenance.html',
      controller: 'addMaintenanceCtrl',
      controllerAs: 'addMaintenance'
    })

    .segment('update_maintenance', {
      templateUrl: 'views/update-maintenance.html',
      controller: 'updateMaintenanceCtrl',
      controllerAs: 'updateMaintenance'
    })

    .segment('delete_maintenance', {
      templateUrl: 'views/delete-maintenance.html',
      controller: 'deleteMaintenanceCtrl',
      controllerAs: 'deleteMaintenance'
    })

    .up()

    .segment('about', {
      templateUrl: 'views/about.html',
      controller: 'aboutCtrl',
      controllerAs: 'about'
    })

    .within()

    .segment('deployment_manager', {
      templateUrl: 'views/about-deployment-manager.html',
      // controller: 'aboutCtrl',
      // controllerAs: 'about'
    })

    .segment('component_configurator', {
      templateUrl: 'views/about-component-configurator.html',
      // controller: 'aboutCtrl',
      // controllerAs: 'about'
    })

    .segment('maintenance_panel', {
      templateUrl: 'views/about-maintenance-panel.html',
      // controller: 'aboutCtrl',
      // controllerAs: 'about'
    });

}]);
