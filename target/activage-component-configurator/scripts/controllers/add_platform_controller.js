'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activageDashboardApp
 */
app.controller('addPlatformCtrl',
  ['$location', 'platformService', 'platformServiceData', 'clientService',
    function ($location, platformService, platformServiceData, clientService) {

      var vm = this;

      vm.platformService = platformService;
      vm.clientService = clientService;
      vm.platformData = platformServiceData;


      vm.platformCreateRequest = {
        "platformId": "",
        "type": "",
        "baseEndpoint": "",
        "location": "",
        "name": "",
        "username": "",
        "encryptedPassword": "",
        "encryptionAlgorithm": "",
        "downstreamInputAlignmentName": "",
        "downstreamInputAlignmentVersion": "",
        "downstreamOutputAlignmentName": "",
        "downstreamOutputAlignmentVersion": "",
        "upstreamInputAlignmentName": "",
        "upstreamInputAlignmentVersion": "",
        "upstreamOutputAlignmentName": "",
        "upstreamOutputAlignmentVersion": ""
      };

      vm.closeDeviceInfo = function () {
        $location.path('/main/component_configurator/component_view');
      };

      vm.createPlatform = function () {
        if (vm.platformCreateRequest.platformId.substr(0, 7) !== 'http://')
          alert("El ID de la plataforma debe tener formato URI.");
        else if (vm.platformCreateRequest.baseEndpoint.substr(0, 7) !== 'http://')
          alert("El callbackURL (baseEndpoint) debe tener formato URI.");
        else if (vm.platformCreateRequest.location.substr(0, 7) !== 'http://')
          alert("El location de la plataforma debe tener formato URI.");
        else
          vm.platformService.createPlatform(vm.platformCreateRequest);
      };

    }
  ]);
