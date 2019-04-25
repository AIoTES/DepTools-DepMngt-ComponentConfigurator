/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('createDeploymentCtrl', ['$location', 'deploymentService', function ($location, deploymentService) {

  var vm = this;

  var date = Date.now();

  vm.deploymentService = deploymentService;

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
    vm.deploymentService.updateDeployment(vm.deployId, vm.deployDate, vm.location, vm.organizationId, vm.organizationLabel, vm.platformId, vm.platformLabel, vm.devices);//, vm.deviceId, vm.deviceLabel, vm.deviceType, vm.sensors, vm.sensorId, vm.sensorType, vm.clientService.getCurrentClientId());
  };

}]);
