'use strict';

app.controller('componentDeviceCtrl',
  ['$location', 'platformService', 'platformServiceData', 'deviceService', 'deviceServiceData', 'clientService',
    function ($location, platformService, platformServiceData, deviceService, deviceServiceData, clientService) {

      var vm = this;

      vm.platformService = platformService;
      vm.deviceService = deviceService;
      vm.clientService = clientService;
      vm.deviceData = deviceServiceData;
      vm.platformData = platformServiceData;

      vm.goToDeviceInfo = function () {
        $location.path('/main/component_configurator/component_view/device_info');
      };

      vm.closeDeviceInfo = function () {
        $location.path('/main/component_configurator/component_view/');
      };

      vm.deleteDevice = function () {
        deviceService.deleteDevice(deviceServiceData.deviceValues.deviceId, platformServiceData.currentPlatform.platformId);
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

      vm.goToUpdateDevice = function () {
        $location.path('/main/component_configurator/component_view/update_device');
      };

    }
  ]
);
