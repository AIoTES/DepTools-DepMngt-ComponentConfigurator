'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activageDashboardApp
 */
app.controller('mainCtrl', ['platformService', 'deviceService', '$location', 'clientService',
  function (platformService, deviceService, $location, clientService) {

    platformService.retrievePlatforms();
    clientService.getCurrentClientId();
    clientService.retrieveClients(clientService.getCurrentClientId());

    var vm = this;

    vm.platform = platformService;
    vm.deviceServ = deviceService;
    vm.clientService = clientService;

    vm.platform.consultPlatformTypes(clientService.getCurrentClientId());
    vm.platform.loadPlatformTypes();

    vm.retrievePlatforms = function() {
      platformService.retrievePlatforms();
    };

    vm.getPlatforms = function () {
      return vm.platform.getPlatforms();
    };

    vm.getClients = function () {
      return vm.clientService.getClients();
    };

    vm.selectPlatform = function (platform) {
      vm.platform.setCurrentPlatform(platform);
      vm.deviceServ.retrieveDevices(platform.platformId, vm.clientService.getCurrentClientId());
      $location.path('/main/device_manager/platform-info');
    };

    vm.selectClient = function (client) {
      vm.clientService.setCurrentClientId(client);
    };

    vm.getSelectedPlatform = function () {
      return vm.platform.getCurrentPlatform().name || "Filter by Platform";
    };

    vm.getSelectedClient = function () {
      return vm.clientService.getCurrentClientId() || "Select Client";
    };

    vm.goToAddPlatform = function () {
      $location.path('/main/device_manager/add_platform');
    };

    vm.goToAddDevice = function () {
      $location.path('/main/device_manager/add_device');
    };

    vm.getCurrentPlatform = function () {
      return vm.platform.getCurrentPlatform();
    }

    vm.closeDeviceInfo = function () {
      $location.path('/main/device_manager/');
    };

    vm.updatePlatform = function () {
      if (vm.platform.getCurrentPlatform().platformId === undefined) {
        alert("No platform selected.");
      }
      else {
        let platform = vm.platform.getCurrentPlatform();
        if (platform.platformId.substr(0, 7) !== 'http://')
          alert("El ID de la plataforma debe tener formato URI.");
        else if (platform.baseEndpoint.substr(0, 7) !== 'http://')
          alert("El callbackURL (baseEndpoint) debe tener formato URI.");
        else if (platform.location.substr(0, 7) !== 'http://')
          alert("El location de la plataforma debe tener formato URI.");
        else
          vm.platform.updatePlatform(platform.platformId, platform.type, platform.baseEndpoint, platform.location, platform.name, platform.username, platform.encryptedPassword, platform.encryptedAlgorithm, vm.clientService.getCurrentClientId());
      }
    };

    vm.deletePlatform = function () {
      let platformId = vm.platform.getCurrentPlatform().platformId;

      if (platformId === undefined)
        alert("No platform selected.");
      else
        vm.platform.deletePlatform(platformId, vm.clientService.getCurrentClientId());

    };

    vm.getPlatformsType = function () {
      return vm.platform.getPlatformsTypes();
    }
  }
]);
