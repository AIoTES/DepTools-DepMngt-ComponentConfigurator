/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('deviceListCtrl', ['$location', 'deviceService', 'deviceServiceData', 'deploymentService', 'deploymentServiceData',
  function ($location, deviceService, deviceServiceData, deploymentService, deploymentServiceData) {

  var vm = this;

  vm.deploymentService = deploymentService;
  vm.deploymentData = deploymentServiceData;

  vm.deviceService = deviceService;
  vm.deviceData = deviceServiceData;

  vm.deploymentService.retrieveDeployments();

  vm.closeDeploymentInfo = function () {
    $location.path('/main/deployment_manager');
  };

  vm.goToCreateDeployment = function () {
    $location.path('/main/deployment_manager/create_deployment');
  };

  vm.goToUpdateDeployment = function () {
    vm.deploymentData.addDeviceStatus = deploymentServiceData.operationStatus.NOT_STARTED;
    $location.path('/main/deployment_manager/update_deployment');
  };

  vm.goToDeleteDeployment = function () {
    vm.deploymentService.deleteDeployment(vm.deploymentData.currentDeployment.id);
  };

}]);
