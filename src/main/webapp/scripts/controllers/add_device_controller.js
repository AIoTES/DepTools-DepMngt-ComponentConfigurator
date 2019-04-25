'use strict';

app.controller('addDeviceCtrl',
  ['$location', 'deviceService', 'platformService', 'platformServiceData',
    function ($location, deviceService, platformService, platformServiceData) {

      var vm = this;

      vm.deviceService = deviceService;

      vm.platformData = platformServiceData;

      vm.deviceToCreate = {
        "deviceId": "",
        "deviceTypes": [],
        "hostedBy": "",
        "location": "",
        "name": "",
        "hosts": [],
        "forProperty": [],
        "madeActuation": "",
        "implementsProcedure": "",
        "observes": [],
        "detects": "",
        "madeObservation": ""
      };

      vm.closeDeviceInfo = function () {
        $location.path('/main/component_configurator/component_view');
      };

      vm.createDevice = function () {
        if (vm.deviceToCreate.deviceType === '')
          alert("Debes seleccionar un tipo de dispositivo.");
        else if (vm.deviceToCreate.deviceId.substr(0, 7) !== 'http://')
          alert("El ID del dispositivo debe tener formato URI.");
        else if (vm.deviceToCreate.hostedBy.substr(0, 7) !== 'http://')
          alert("Hosted By debe tener formato URI.");
        else if (vm.deviceToCreate.location.substr(0, 7) !== 'http://')
          alert("Location debe tener formato URI.");
        else
          deviceService.createDevice(vm.deviceToCreate);
      };

    }
  ]
);
