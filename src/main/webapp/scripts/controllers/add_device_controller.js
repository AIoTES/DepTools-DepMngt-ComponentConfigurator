'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activageDashboardApp
 */
app.controller('addDeviceCtrl', ['$location', 'deviceService', 'clientService',
  function ($location, deviceService, clientService) {

    var vm = this;

    vm.deviceService = deviceService;
    vm.clientService = clientService;

    vm.deviceType = "";
    vm.deviceId = "";
    vm.hostedBy = "";
    vm.location = "";
    vm.name = "";
    vm.hosts = "";
    vm.forProperty = "";
    vm.madeActuation = "";
    vm.implementsProcedure = "";
    vm.observes = "";
    vm.detects = "";
    vm.madeObservation = "";


    vm.closeDeviceInfo = function () {
      $location.path('/main/device_manager/');
    };

    vm.createDevice = function () {
      if (vm.deviceType === '')
        alert("Debes seleccionar un tipo de dispositivo.");
      else if (vm.deviceId.substr(0, 7) !== 'http://')
        alert("El ID del dispositivo debe tener formato URI.");
      else if (vm.hostedBy.substr(0, 7) !== 'http://')
        alert("Hosted By debe tener formato URI.");
      else if (vm.location.substr(0, 7) !== 'http://')
        alert("Location debe tener formato URI.");
      else
        vm.deviceService.createDevice(vm.deviceType, vm.deviceId, vm.hostedBy, vm.location, vm.name, vm.hosts, vm.forProperty, vm.madeActuation, vm.implementsProcedure, vm.observes, vm.detects, vm.madeObservation, vm.clientService.getCurrentClientId());
    };

  }
]);
