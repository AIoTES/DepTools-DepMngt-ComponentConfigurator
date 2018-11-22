'use strict';

app.controller('deviceCtrl', ['$location', 'platformService', 'deviceService', 'platformServiceData', 'deviceServiceData',
  function ($location, platformService, deviceService, platformServiceData, deviceServiceData) {

    var vm = this;

    vm.platform = platformService;
    vm.devicesService = deviceService;

    vm.getDevices = function () {
      return deviceServiceData.devices;//[platformServiceData.currentPlatform.platformId];
    };

    vm.isDeviceSelected = function (deviceId) {
      return deviceId === deviceServiceData.currentDevice.id;
    };

    vm.selectDevice = function (device) {
      deviceServiceData.currentDevice = device;
      $location.path('/main/device_manager/device-info');
    };

    vm.getSelectedDevice = function () {
      return deviceServiceData.currentDevice;
    }

    vm.closeDeviceInfo = function () {
      $location.path('/main/device_manager/');
    };

    vm.updateDevice = function () {
      if (deviceServiceData.currentDevice.deviceTypes[0] === '')
        alert("Debes seleccionar un tipo de dispositivo.");
      else if (deviceServiceData.currentDevice.deviceId.substr(0, 7) !== 'http://')
        alert("El ID del dispositivo debe tener formato URI.");
      else if (deviceServiceData.currentDevice.hostedBy.substr(0, 7) !== 'http://')
        alert("Hosted By debe tener formato URI.");
      else if (deviceServiceData.currentDevice.location.substr(0, 7) !== 'http://')
        alert("Location debe tener formato URI.");
      else
        vm.devicesService.updateDevice(deviceServiceData.currentDevice.deviceTypes[0], deviceServiceData.currentDevice.deviceId, deviceServiceData.currentDevice.hostedBy, deviceServiceData.currentDevice.location, deviceServiceData.currentDevice.name, deviceServiceData.currentDevice.hosts, deviceServiceData.currentDevice.forProperty, deviceServiceData.currentDevice.madeActuation, deviceServiceData.currentDevice.implementsProcedure, deviceServiceData.currentDevice.observes, deviceServiceData.currentDevice.detects, deviceServiceData.currentDevice.madeObservation);
    };

  }
]);
