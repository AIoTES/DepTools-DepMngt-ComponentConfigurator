'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activageDashboardApp
 */
app.controller('addDeviceCtrl', ['$location', 'deviceService',
    function ($location, deviceService) {

      var vm = this;

      vm.deviceService = deviceService;

      vm.deviceTypes = "";
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

      vm.createDevice = function() {
        vm.deviceService.createDevice(vm.deviceTypes, vm.deviceId, vm.hostedBy, vm.location, vm.name, vm.hosts, vm.forProperty, vm.madeActuation, vm.implementsProcedure, vm.observes, vm.detects, vm.madeObservation);
      };

    }
  ]
);
