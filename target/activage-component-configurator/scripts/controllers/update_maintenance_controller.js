/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateMaintenanceCtrl', ['$location', 'recordService', 'recordServiceData',
  function ($location, recordService, recordServiceData) {

  var vm = this;

  vm.recordService = recordService;
  vm.recordData = recordServiceData;

  vm.currentRecord = {
    "id": vm.recordData.currentRecord.id,
    "elementId": vm.recordData.currentRecord.elementId,
    "description": vm.recordData.currentRecord.description,
    "status": vm.recordData.currentRecord.status,
    "type": vm.recordData.currentRecord.type,
    "timestamp": vm.recordData.currentRecord.timestamp
  };

  vm.closeAddMaintenance = function () {
    $location.path('/main/maintenance_panel');
  };

  vm.updateRecord = function () {
    vm.recordService.update_record(vm.currentRecord);
  };

}]);
