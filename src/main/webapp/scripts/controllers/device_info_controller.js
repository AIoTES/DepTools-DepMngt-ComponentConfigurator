'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activageDashboardApp
 */
app.controller('deviceInfoCtrl', ['$location', 'LIST_OF_DEVICES', 'subscriptionService', 'dataService', 'deviceService', 'deviceServiceData', 'subscriptionServiceData',
    function ($location, LIST_OF_DEVICES, subscriptionService, dataService, deviceService, deviceServiceData, subscriptionServiceData) {

      var vm = this;

      vm.devices = LIST_OF_DEVICES;
      vm.subscription = subscriptionService;
      vm.data = dataService;
      vm.deviceService = deviceService;
      vm.deviceLastValuesIds = deviceServiceData.deviceLastValuesIds;
      vm.lastUpdate = deviceServiceData.deviceLastUpdate;

      vm.closeDeviceInfo = function () {
        $location.path('/main/device_manager/');
      };

      vm.getSelectedDevice = function () {
        return deviceServiceData.currentDevice;
      };

      var emptyObject = {};

      vm.getSimpleValues = function () {
        if (deviceServiceData.deviceValues.hasOwnProperty(deviceServiceData.currentDevice.deviceId)) {
          vm.devices=deviceServiceData.deviceValues[deviceServiceData.currentDevice.deviceId].simple;
          return deviceServiceData.deviceValues[deviceServiceData.currentDevice.deviceId].simple;
        }
        else
          return emptyObject;
      };

      vm.getOntologyValues = function () {
        return deviceServiceData.deviceValues.hasOwnProperty(deviceServiceData.currentDevice.deviceId) ?
          deviceServiceData.deviceValues[deviceServiceData.currentDevice.deviceId].ontology : emptyObject;
      };

      vm.stringify = function (value) {
        return JSON.stringify(value, null, '\t');
      };

      vm.isLastId = function (deviceId, valueName, id) {
        return id === deviceServiceData.deviceLastValuesIds[deviceId][valueName];
      };

      vm.getLastId = function(deviceId, valueName) {
        return deviceServiceData.deviceLastValuesIds[deviceId][valueName];
      }

      vm.isDeviceSubscribed = function(){
        return subscriptionServiceData.listSubscription[vm.getSelectedDevice().deviceId];
      }
    }
  ]
);
