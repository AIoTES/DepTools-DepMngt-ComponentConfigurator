'use strict';

/**
 * @ngdoc function
 * @name activageDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activageDashboardApp
 */
app.controller('addPlatformCtrl', ['$location',
    function ($location) {

      var vm = this;

      vm.closeDeviceInfo = function () {
        $location.path('/main/device_manager/');
      };

    }
  ]
);
