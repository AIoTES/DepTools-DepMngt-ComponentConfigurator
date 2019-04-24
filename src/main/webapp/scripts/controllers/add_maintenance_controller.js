/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('addMaintenanceCtrl', ['$location', 'deploymentService', 'clientService', function ($location, deploymentService, clientService) {

  var vm = this;

  var date = Date.now();

  vm.deploymentService = deploymentService;
  vm.clientService = clientService;

  vm.deployId = "";
  vm.deviceId = "";
  vm.description = "";
  vm.status = "";
  vm.type = "";
  vm.date = date;

  vm.closeAddMaintenance = function () {
    $location.path('/main/maintenance_panel');
  };

  vm.addTicket = function () {
    vm.deploymentService.updateDeployment(vm.deployId, vm.date, vm.location, vm.organizationId, vm.organizationLabel, vm.platformId, vm.platformLabel, vm.devices, vm.deviceId, vm.deviceLabel, vm.deviceType, vm.sensors, vm.sensorId, vm.sensorType, vm.clientService.getCurrentClientId());
  };

}]);
