/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateMaintenanceCtrl', ['$location', 'deploymentService', 'deploymentServiceData', 'clientService', 'recordServiceData',
  function ($location, deploymentService, deploymentServiceData, clientService, recordServiceData) {

  var vm = this;

  vm.deploymentService = deploymentService;
  vm.deploymentData = deploymentServiceData;
  vm.clientService = clientService;
  vm.recordData = recordServiceData;

  vm.currentRecord = {
    "id": vm.recordData.recordsByElementId[vm.recordData.selectedElementId].id,
    "elementId": vm.recordData.recordsByElementId[vm.recordData.selectedElementId].elementId,
    "description": vm.recordData.recordsByElementId[vm.recordData.selectedElementId].description,
    "status": vm.recordData.recordsByElementId[vm.recordData.selectedElementId].status,
    "type": vm.recordData.recordsByElementId[vm.recordData.selectedElementId].type,
    "timestamp": vm.recordData.recordsByElementId[vm.recordData.selectedElementId].timestamp
  };

  vm.closeAddMaintenance = function () {
    $location.path('/main/maintenance_panel');
  };

  vm.addTicket = function () {
    vm.deploymentService.updateDeployment(vm.deployId, vm.date, vm.location, vm.organizationId, vm.organizationLabel, vm.platformId, vm.platformLabel, vm.devices, vm.deviceId, vm.deviceLabel, vm.deviceType, vm.sensors, vm.sensorId, vm.sensorType, vm.clientService.getCurrentClientId());
  };

}]);
