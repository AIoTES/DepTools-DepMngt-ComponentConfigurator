'use strict';

app.controller('componentUpdateCtrl',
  ['$location', 'platformService', 'platformServiceData', 'deviceService', 'deviceServiceData', 'clientService',
    function ($location, platformService, platformServiceData, deviceService, deviceServiceData, clientService) {

      var vm = this;

      vm.platformService = platformService;
      vm.deviceService = deviceService;
      vm.clientService = clientService;

      vm.platformData = platformServiceData;
      vm.deviceData = deviceServiceData;

      vm.deviceToUpdate = {
        "deviceId": deviceServiceData.deviceValues.deviceId,
        "deviceTypes": deviceServiceData.deviceValues.deviceTypes,
        "hostedBy": deviceServiceData.deviceValues.hostedBy,
        "location": deviceServiceData.deviceValues.location,
        "name": deviceServiceData.deviceValues.name,
        "hosts": deviceServiceData.deviceValues.hosts,
        "forProperty": deviceServiceData.deviceValues.forProperty,
        "madeActuation": deviceServiceData.deviceValues.madeActuation,
        "implementsProcedure": deviceServiceData.deviceValues.implementsProcedure,
        "observes": deviceServiceData.deviceValues.observes,
        "detects": deviceServiceData.deviceValues.detects,
        "madeObservation": deviceServiceData.deviceValues.madeObservation
      };

      vm.closeDeviceInfo = function () {
        $location.path('/main/component_configurator/component_view/');
      };

      vm.updateDevice = function () {
        if (vm.deviceToUpdate.deviceTypes[0] === '')
          alert("Debes seleccionar un tipo de dispositivo.");
        else if (vm.deviceToUpdate.deviceId.substr(0, 7) !== 'http://')
          alert("El ID del dispositivo debe tener formato URI.");
        else if (vm.deviceToUpdate.hostedBy.substr(0, 7) !== 'http://')
          alert("Hosted By debe tener formato URI.");
        else if (vm.deviceToUpdate.location.substr(0, 7) !== 'http://')
          alert("Location debe tener formato URI.");
        else
          vm.deviceService.updateDevice(vm.deviceToUpdate, platformServiceData.currentPlatform.platformId);
      };

    }
  ]
);
