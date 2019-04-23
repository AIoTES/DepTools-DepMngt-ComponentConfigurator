'use strict';

app.controller('platformInfoCtrl',
  ['platformService', 'platformServiceData', '$location',
    function (platformService, platformServiceData, $location) {

      var vm = this;

      vm.platform = platformService;
      vm.platformData = platformServiceData;

      vm.platformUpdateRequest = {
        "baseEndpoint": vm.platformData.currentPlatform.baseEndpoint,
        "location": vm.platformData.currentPlatform.location,
        "name": vm.platformData.currentPlatform.name,
        "username": vm.platformData.currentPlatform.username,
        "encryptedPassword": vm.platformData.currentPlatform.encryptedPassword,
        "encryptionAlgorithm": vm.platformData.currentPlatform.encryptionAlgorithm,
        "downstreamInputAlignmentName": vm.platformData.currentPlatform.downstreamInputAlignmentName,
        "downstreamInputAlignmentVersion": vm.platformData.currentPlatform.downstreamInputAlignmentVersion,
        "downstreamOutputAlignmentName": vm.platformData.currentPlatform.downstreamOutputAlignmentName,
        "downstreamOutputAlignmentVersion": vm.platformData.currentPlatform.downstreamOutputAlignmentVersion,
        "upstreamInputAlignmentName": vm.platformData.currentPlatform.upstreamInputAlignmentName,
        "upstreamInputAlignmentVersion": vm.platformData.currentPlatform.upstreamInputAlignmentVersion,
        "upstreamOutputAlignmentName": vm.platformData.currentPlatform.upstreamOutputAlignmentName,
        "upstreamOutputAlignmentVersion": vm.platformData.currentPlatform.upstreamOutputAlignmentVersion
      };

      vm.closeDeviceInfo = function () {
        $location.path("/main/component_configurator/component_view/");
      };

      vm.goToUpdatePlatform = function () {
        $location.path("/main/component_configurator/component_view/update_platform");
      };

      vm.updatePlatform = function () {
        platformService.updatePlatform(vm.platformData.currentPlatform.platformId, vm.platformUpdateRequest);
      };

      vm.deletePlatform = function () {
        platformService.deletePlatform(vm.platformData.currentPlatform.platformId);
      }

    }
  ]
);
