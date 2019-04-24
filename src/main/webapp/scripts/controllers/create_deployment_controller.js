/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('createDeploymentCtrl', ['$location', 'deploymentService', 'clientService', function ($location, deploymentService, clientService) {

  var vm = this;

  var date = Date.now();

  vm.deploymentService = deploymentService;
  vm.clientService = clientService;

  vm.deployId = "";
  vm.deployDate = date;
  vm.location = "";
  vm.organizationId = "";
  vm.organizationLabel = "";
  vm.platformId = "";
  vm.platformLabel = "";
  vm.devices = "";
  /*vm.deviceId = "";
  vm.deviceLabel = "";
  vm.deviceType = "";
  vm.sensors = "";
  vm.sensorId = "";
  vm.sensorType = "";
*/
  vm.closeCreateDeployment = function () {
    $location.path('/main/deployment_manager');
  };

  vm.createDeployment = function () {
    vm.deploymentService.createDeployment(clientService.getCurrentClientId(), vm.deployId, vm.deployDate, vm.location, vm.organizationId, vm.organizationLabel, vm.platformId, vm.platformLabel, vm.devices);//, vm.deviceId, vm.deviceLabel, vm.deviceType, vm.sensors, vm.sensorId, vm.sensorType, vm.clientService.getCurrentClientId());
  };

}]);
