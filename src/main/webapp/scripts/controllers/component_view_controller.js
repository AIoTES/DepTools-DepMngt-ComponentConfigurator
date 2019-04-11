'use strict';

app.controller('componentViewCtrl', ['$location', 'platformService', 'deviceService', 'clientService',
  function ($location, platformService, deviceService, clientService) {

    var vm = this;

    vm.platformService = platformService;
    vm.deviceService = deviceService;
    vm.clientService = clientService;

    vm.getPlatformsId = function() {
      var x = vm.platformService.getPlatforms();
      return x;
    }

    vm.getDevices = function () {
      return vm.deviceService.getDevices();
    };

    vm.isDeviceSelected = function (deviceId) {
      return deviceId === deviceService.getCurrentDevice().id;
    };

    vm.selectDevice = function (device) {
      deviceService.setCurrentDevice(device)
      $location.path('/main/component_configurator/component_view/device_info');
    };

    vm.goToDeviceInfo = function () {
      $location.path('/main/component_configurator/component_view/device_info');
    };

    vm.getSelectedDevice = function () {
      return deviceService.getCurrentDevice();
    }

    vm.closeDeviceInfo = function () {
      $location.path('/main/component_configurator/component_view/');
    };

    vm.updateDevice = function () {
      var device = deviceService.getCurrentDevice();

      if (device.deviceId === undefined)
        alert("No Device selected.");
      else {
        if (device.deviceTypes[0] === '')
          alert("Debes seleccionar un tipo de dispositivo.");
        else if (device.deviceId.substr(0, 7) !== 'http://')
          alert("El ID del dispositivo debe tener formato URI.");
        else if (device.hostedBy.substr(0, 7) !== 'http://')
          alert("Hosted By debe tener formato URI.");
        else if (device.location.substr(0, 7) !== 'http://')
          alert("Location debe tener formato URI.");
        else
          vm.deviceService.updateDevice(device.deviceTypes[0], device.deviceId, device.hostedBy, device.location, device.name, device.hosts, device.forProperty, device.madeActuation, device.implementsProcedure, device.observes, device.detects, device.madeObservation, vm.clientService.getCurrentClientId())
      }
    };

    vm.deleteDevice = function () {
      var deviceId = deviceService.getCurrentDevice().deviceId;

      if (deviceId === undefined)
        alert("No Device selected.");
      else
        vm.deviceService.deleteDevice(deviceId, vm.clientService.getCurrentClientId());
    };

    vm.goToAddPlatform = function () {
      $location.path('/main/component_configurator/component_view/add_platform');
    };

    vm.goToAddDevice = function () {
      $location.path('/main/component_configurator/component_view/add_device');
    };

    vm.goToAddService = function () {
      $location.path('/main/component_configurator/component_view/add_service');
    };

  }
]);
