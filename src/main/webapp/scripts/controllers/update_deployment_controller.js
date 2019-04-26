/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateDeploymentCtrl', ['$location', 'deploymentService', 'deploymentServiceData', function ($location, deploymentService, deploymentServiceData) {

  var vm = this;

  var date = Date.now();

  vm.deploymentService = deploymentService;
  vm.deploymentData = deploymentServiceData;

  vm.deviceIdSelected = "";
  vm.newDevicesId = "";

  vm.currentDeployment = {
    "id": vm.deploymentData.currentDeployment.id,
    "date": date,
    "location": vm.deploymentData.currentDeployment.location,
    "organizationId": vm.deploymentData.currentDeployment.organization.id,
    "organizationLabel": vm.deploymentData.currentDeployment.organization.label,
    "platformId": vm.deploymentData.currentDeployment.platform.id,
    "platformLabel": vm.deploymentData.currentDeployment.platform.label,
    "devices": vm.deploymentData.currentDeployment.platform.devices
  };

  vm.closeCreateDeployment = function () {
    $location.path('/main/deployment_manager');
  };

  vm.deleteDevice = function (deviceId) {
    vm.deploymentService.deleteDeviceFromDeployment(vm.id, deviceId);
  };

  vm.addDevices = function () {
    var devices = vm.newDevicesId.split(",");
    if (devices.length > 0) {
      devices.forEach(function(deviceId) {
        vm.deploymentService.addDeviceToDeployment(vm.id, deviceId);
      });
    }
  };

  vm.updateDeployment = function () {
    vm.deploymentService.updateDeployment(vm.id, vm.date, vm.location, vm.organizationId, vm.organizationLabel, vm.platformId, vm.platformLabel, vm.devices);
  };

}]);
