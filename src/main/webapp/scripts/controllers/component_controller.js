'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activageDashboardApp
 */
app.controller('componentCtrl', ['platformService', 'deviceService', '$location', 'clientService', 'platformServiceData',
  function (platformService, deviceService, $location, clientService, platformServiceData) {

    platformService.retrievePlatforms(clientService.getCurrentClientId());
    clientService.retrieveClients(clientService.getCurrentClientId());

    var vm = this;

    vm.platform = platformService;
    vm.platformData = platformServiceData;
    vm.deviceServ = deviceService;
    vm.clientService = clientService;

    vm.platform.consultPlatformTypes(clientService.getCurrentClientId());
    vm.platform.loadPlatformTypes();

    vm.getClients = function () {
      return vm.clientService.getClients();
    };

    vm.selectPlatform = function (platform) {
      platformServiceData.currentPlatform = platform;
      platformServiceData.currentPlatformName = platform.name;
      deviceService.retrieveDevices(platform.platformId);
      $location.path('/main/component_configurator/component_view/platform_info');
    };

    vm.selectClient = function (client) {
      vm.clientService.setCurrentClientId(client);
    };

    vm.getSelectedClient = function () {
      return vm.clientService.getCurrentClientId() || "Select Client";
    };

    vm.getCurrentPlatform = function () {
      return vm.platform.getCurrentPlatform();
    };

    vm.closeDeviceInfo = function () {
      $location.path('/main/component_configurator/');
    };

    vm.updatePlatform = function () {
      if (vm.platform.getCurrentPlatform().platformId === undefined) {
        alert("No platform selected.");
      } else {
        var platform = vm.platform.getCurrentPlatform();
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
      var platformId = vm.platform.getCurrentPlatform().platformId;

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
