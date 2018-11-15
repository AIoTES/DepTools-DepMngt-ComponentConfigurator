'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activageDashboardApp
 */
app.controller('mainCtrl', ['platformService', 'deviceValueWs', 'deviceService', '$location', 'platformServiceData', function (platformService, deviceValueWs, deviceService, $location, platformServiceData) {

  platformService.retrievePlatforms();

  var vm = this;

  vm.platform = platformService;
  vm.deviceServ = deviceService;

  vm.getPlatforms = function () {
    return platformServiceData.platforms;
  };

  vm.selectPlatform = function (platform) {
    platformServiceData.currentPlatform = platform;
    deviceService.retrieveDevices(platform.platformId);
    $location.path('/main/device_manager/info_platform');
  };

  vm.getSelectedPlatform = function () {
    return platformServiceData.currentPlatform.name || "Filter by Platform";
  };

  vm.goToAddPlatform = function () {
    $location.path('/main/device_manager/add_platform');
  };

  vm.goToAddDevice = function () {
    $location.path('/main/device_manager/add_device');
  };

  vm.getCurrentPlatform = function() {
    return platformServiceData.currentPlatform;
  }

  vm.closeDeviceInfo = function () {
    $location.path('/main/device_manager/');
  };

}]);
