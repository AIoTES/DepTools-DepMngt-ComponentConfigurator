'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activageDashboardApp
 */
app.controller('mainCtrl', ['platformService', 'deviceService', '$location', 'platformServiceData',
  function (platformService, deviceService, $location, platformServiceData) {

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
      $location.path('/main/device_manager/platform-info');
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

    vm.getCurrentPlatform = function () {
      return platformServiceData.currentPlatform;
    }

    vm.closeDeviceInfo = function () {
      $location.path('/main/device_manager/');
    };

    vm.updatePlatform = function () {
      if (platformServiceData.currentPlatform.platformId.substr(0, 7) !== 'http://')
        alert("El ID de la plataforma debe tener formato URI.");
      else if (platformServiceData.currentPlatform.type.substr(0, 7) !== 'http://')
        alert("El tipo de la plataforma debe tener formato URI.");
      else if (platformServiceData.currentPlatform.baseEndpoint.substr(0, 7) !== 'http://')
        alert("El callbackURL (baseEndpoint) debe tener formato URI.");
      else if (platformServiceData.currentPlatform.location.substr(0, 7) !== 'http://')
        alert("El location de la plataforma debe tener formato URI.");
      else
        vm.platform.updatePlatform(platformServiceData.currentPlatform.platformId, platformServiceData.currentPlatform.type, platformServiceData.currentPlatform.baseEndpoint, platformServiceData.currentPlatform.location, platformServiceData.currentPlatform.name, platformServiceData.currentPlatform.username, platformServiceData.currentPlatform.encryptedPassword, platformServiceData.currentPlatform.encryptedAlgorithm);
    };

  }
]);
