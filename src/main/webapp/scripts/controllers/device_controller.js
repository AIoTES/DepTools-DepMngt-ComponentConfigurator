'use strict';

app.controller('deviceCtrl', ['$location', 'platformService', 'deviceService', 'clientService',
  function ($location, platformService, deviceService, clientService) {

    var vm = this;

    vm.platform = platformService;
    vm.deviceService = deviceService;
    vm.clientService = clientService;

    vm.getDevices = function () {
      return vm.deviceService.getDevices();
    };

    vm.isDeviceSelected = function (deviceId) {
      return deviceId === deviceService.getCurrentDevice().id;
    };

    vm.selectDevice = function (device) {
      deviceService.setCurrentDevice(device)
      $location.path('/main/device_manager/device-info');
    };

    vm.getSelectedDevice = function () {
      return deviceService.getCurrentDevice();
    }

    vm.closeDeviceInfo = function () {
      $location.path('/main/device_manager/');
    };

    vm.updateDevice = function () {
      var device = deviceService.getCurrentDevice();
      if (device.deviceTypes[0] === '')
        alert("Debes seleccionar un tipo de dispositivo.");
      else if (device.deviceId.substr(0, 7) !== 'http://')
        alert("El ID del dispositivo debe tener formato URI.");
      else if (device.hostedBy.substr(0, 7) !== 'http://')
        alert("Hosted By debe tener formato URI.");
      else if (device.location.substr(0, 7) !== 'http://')
        alert("Location debe tener formato URI.");
      else
        vm.deviceService.updateDevice(device.deviceTypes[0], device.deviceId, device.hostedBy, device.location, device.name, device.hosts, device.forProperty, device.madeActuation, device.implementsProcedure, device.observes, device.detects, device.madeObservation ,vm.clientService.getCurrentClientId());
    };

  }
]);
