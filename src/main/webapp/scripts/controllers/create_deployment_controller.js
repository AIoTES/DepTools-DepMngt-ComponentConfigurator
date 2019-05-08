/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('createDeploymentCtrl', ['$location', 'deploymentService', 'deploymentServiceData', function ($location, deploymentService, deploymentServiceData) {

  var vm = this;

  var date = new Date();

  vm.deploymentService = deploymentService;
  vm.deploymentData = deploymentServiceData;

  vm.currentDeployment = {
    "id": "",
    "date": date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay(),
    "location": "",
    "organizationId": "",
    "organizationLabel": "",
    "platformId": "",
    "platformLabel": "",
    "devices": ""
  };

  vm.closeCreateDeployment = function () {
    $location.path('/main/deployment_manager');
  };

  vm.createDeployment = function () {
    vm.deploymentService.createDeployment(vm.currentDeployment.id, vm.currentDeployment.date, vm.currentDeployment.location, vm.currentDeployment.organizationId, vm.currentDeployment.organizationLabel, vm.currentDeployment.platformId, vm.currentDeployment.platformLabel, vm.currentDeployment.devices);//, vm.deviceId, vm.deviceLabel, vm.deviceType, vm.sensors, vm.sensorId, vm.sensorType, vm.clientService.getCurrentClientId());
  };

}]);
