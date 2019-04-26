/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('maintenanceInfoCtrl',
  ['$location', 'deploymentServiceData', 'recordService', 'recordServiceData',
    function ($location, deploymentServiceData, recordService, recordServiceData) {

      var vm = this;

      vm.deploymentData = deploymentServiceData;
      vm.recordData = recordServiceData;

      vm.deleteRecord = function (elementId, recordId) {
        recordService.delete_record(elementId, recordId);
      };

      vm.updateRecord = function (record) {
        // TODO delete this line
        record.description = "updated";

        recordService.update_record(record);
      };

      vm.closeMaintenanceInfo = function () {
        $location.path('/main/maintenance_panel');
      };

      vm.goToAddMaintenance = function () {
        $location.path('/main/maintenance_panel/add_maintenance');
      };

      vm.goToUpdateMaintenance = function () {
        $location.path('/main/maintenance_panel/update_maintenance');
      };

      vm.goToDeleteMaintenance = function () {
        $location.path('/main/maintenance_panel/delete_maintenance');
      };

    }
  ]
);
