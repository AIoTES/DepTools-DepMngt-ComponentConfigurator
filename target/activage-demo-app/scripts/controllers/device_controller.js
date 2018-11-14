'use strict';

app.controller('deviceCtrl', ['$location', 'LIST_OF_DEVICES', 'subscriptionService', 'platformService', 'dataService', 'deviceService', 'platformServiceData', 'deviceServiceData', 'subscriptionServiceData',
  function ($location, LIST_OF_DEVICES, subscriptionService, platformService, dataService, deviceService, platformServiceData, deviceServiceData, subscriptionServiceData) {



    var vm = this;

    //vm.devices = LIST_OF_DEVICES;
    vm.subscription = subscriptionService;
    vm.platform = platformService;
    vm.data = dataService;
    vm.devicesService = deviceService;

    //vm.devices = deviceService.readDevices(vm.platform.platformChoise);

    vm.goToDevice = function (device_id, id) {
      console.log(id);

      $location.path('/main/device_manager/' + id);
      vm.subscription.getSubscriptions(device_id);
    };

    vm.getDevices = function () {
      return deviceServiceData.devices[platformServiceData.currentPlatform.platformId];
    };

    vm.isDeviceSelected = function (deviceId) {
      return deviceId === deviceServiceData.currentDevice.id;
    };

    vm.selectDevice = function (device) {
      deviceServiceData.currentDevice = device;
      //deviceService.retrieveSimpleDeviceValues(device.deviceId);
      //deviceService.retrieveOntologicDeviceValues(device.deviceId);
      vm.subscription.getSubscriptions(device.deviceId);
      $location.path('/main/device_manager/device_view');
    };

    vm.isDeviceSubscribed = function (deviceId){
      return subscriptionServiceData.listSubscription[deviceId];
    }

    vm.filter = function () {
      platformService.filterPlatform();
    }

  }]);
