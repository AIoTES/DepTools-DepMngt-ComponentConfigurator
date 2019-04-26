/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('addMaintenanceCtrl',
  ['$location', 'recordService', 'recordServiceData',
    function ($location, recordService, recordServiceData) {

      var vm = this;

      vm.recordToCreate = {
        "elementId": recordServiceData.selectedElementId,
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
