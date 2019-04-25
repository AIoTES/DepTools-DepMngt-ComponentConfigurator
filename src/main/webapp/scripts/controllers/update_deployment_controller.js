/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateDeploymentCtrl', ['$location', 'deploymentService', function ($location, deploymentService) {

  var vm = this;

  var date = Date.now();

  vm.deploymentService = deploymentService;

  vm.currentDeployment = vm.deploymentService.getCurrentDeployment();

  vm.deviceIdSelected = "";
  vm.newDevicesId = "";

  vm.id = vm.currentDeployment.id;
  vm.date = date;
  vm.location = vm.currentDeployment.location;
  vm.organizationId = vm.currentDeployment.organization.id;
  vm.organizationLabel = vm.currentDeployment.organization.label;
  vm.platformId = vm.currentDeployment.platform.id;
  vm.platformLabel = vm.currentDeployment.platform.label;
  vm.devices = vm.currentDeployment.platform.devices;
/*  vm.deviceId = "";
  vm.deviceLabel = "";
  vm.deviceType = "";
  vm.sensors = "";
  vm.sensorId = "";
  vm.sensorType = "";*/

  vm.closeCreateDeployment = function () {
    $location.path('/main/deployment_manager');
  };
  vm.deleteDevice = function (deviceid) {
    $location.path('/main/deployment_manager');
  };
  vm.addDevices = function () {
    let devices = vm.newDevicesId.split(",");
    if (devices.length > 0) {
      devices.forEach(function(deviceId) {
        vm.deploymentService.addDeviceToDeployment(vm.id, deviceId);
      });
    }

  //  $location.path('/main/deployment_manager');
  };

  vm.updateDeployment = function () {
    vm.deploymentService.updateDeployment(vm.id, vm.date, vm.location, vm.organizationId, vm.organizationLabel, vm.platformId, vm.platformLabel, vm.devices);//, vm.deviceId, vm.deviceLabel, vm.deviceType, vm.sensors, vm.sensorId, vm.sensorType, vm.clientService.getCurrentClientId());
  };

}]);
