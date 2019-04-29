/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('addMaintenanceCtrl',
  ['$location', 'recordService', 'recordServiceData',
    function ($location, recordService, recordServiceData) {

      var vm = this;

      vm.recordData = recordServiceData;

      vm.recordToCreate = {
        "elementId": vm.recordData.selectedElementId,
        "description": "",
        "status": "",
        "type": ""
      };

      vm.closeAddMaintenance = function () {
        $location.path('/main/maintenance_panel');
      };

      vm.addTicket = function () {
        recordService.create_record(vm.recordToCreate);
      };

    }
  ]
);
