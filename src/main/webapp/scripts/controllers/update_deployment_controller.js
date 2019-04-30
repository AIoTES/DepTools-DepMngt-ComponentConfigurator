/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateDeploymentCtrl', ['$location', 'deploymentService', 'deploymentServiceData', function ($location, deploymentService, deploymentServiceData) {

  var vm = this;

  vm.deploymentService = deploymentService;
  vm.deploymentData = deploymentServiceData;

  vm.deviceIdSelected = "";
  vm.newDeviceId = "";

  vm.currentDeployment = {
    "id": vm.deploymentData.currentDeployment.id,
    "date": vm.deploymentData.currentDeployment.date,
    "location": vm.deploymentData.currentDeployment.location,
    "organizationId": vm.deploymentData.currentDeployment.organization.id,
    "organizationLabel": vm.deploymentData.currentDeployment.organization.label,
    "platformId": vm.deploymentData.currentDeployment.platform.id,
    "platformLabel": vm.deploymentData.currentDeployment.platform.label,
    "devices": vm.deploymentData.currentDeployment.platform.devices
  };

  vm.currentDeployment.devices.forEach(
    function (device) {
      vm.deploymentData.removeDeviceStatus[device] = vm.deploymentData.operationStatus.NOT_STARTED;
    }
  );

  vm.closeCreateDeployment = function () {
    $location.path('/main/deployment_manager');
  };

  vm.deleteDevice = function (deviceId) {
    vm.deploymentService.deleteDeviceFromDeployment(vm.currentDeployment.id, deviceId);
  };

  vm.addDevice = function () {
    vm.deploymentService.addDeviceToDeployment(vm.currentDeployment.id, vm.newDeviceId);
  };

  vm.updateDeployment = function () {
    vm.deploymentService.updateDeployment(vm.currentDeployment.id, vm.currentDeployment.date, vm.currentDeployment.location, vm.currentDeployment.organizationId, vm.currentDeployment.organizationLabel, vm.currentDeployment.platformId, vm.currentDeployment.platformLabel, vm.currentDeployment.devices);
  };

}]);
