'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activageDashboardApp
 */
app.controller('addPlatformCtrl', ['$location', 'platformService', 'clientService',
  function ($location, platformService, clientService) {

    var vm = this;

    vm.platformService = platformService;
    vm.clientService = clientService;

    vm.platformId = "";
    vm.type = "";
    vm.baseEndpoint = "";
    vm.location = "";
    vm.name = "";
    vm.username = "";
    vm.encryptedPassword = "";
    vm.encryptedAlgorithm = "";

    vm.closeDeviceInfo = function () {
      $location.path('/main/device_manager/');
    };

    vm.createPlatform = function () {
      if (vm.platformId.substr(0, 7) !== 'http://')
        alert("El ID de la plataforma debe tener formato URI.");
      else if (vm.type.substr(0, 7) !== 'http://')
        alert("El tipo de la plataforma debe tener formato URI.");
      else if (vm.baseEndpoint.substr(0, 7) !== 'http://')
        alert("El callbackURL (baseEndpoint) debe tener formato URI.");
      else if (vm.location.substr(0, 7) !== 'http://')
        alert("El location de la plataforma debe tener formato URI.");
      else
        vm.platformService.createPlatform(vm.platformId, vm.type, vm.baseEndpoint, vm.location, vm.name, vm.username, vm.encryptedPassword, vm.encryptedAlgorithm, vm.clientService.getCurrentClientId());
    };

  }
]);
