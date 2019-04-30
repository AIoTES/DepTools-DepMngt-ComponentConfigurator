/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('deploymentCtrl', ['$location', 'deploymentService', 'deploymentServiceData', function ($location, deploymentService, deploymentServiceData) {

  deploymentService.retrieveDeployments();
//  deploymentService.retrieveDevices();

  var vm = this;

  vm.deployment = deploymentService;
  vm.deploymentData = deploymentServiceData;

  vm.selectDeployment = function (deployment) {
    vm.deploymentData.deleteStatus = vm.deploymentData.operationStatus.NOT_STARTED;
    vm.deploymentData.currentDeployment = deployment;
    vm.goToDeploymentInfo();
  };

  vm.createDeployment = function () {
    vm.deploymentData.createStatus = vm.deploymentData.operationStatus.NOT_STARTED;
    vm.goToCreateDeployment();
  };

  vm.updateDeployment = function (deployment) {
    vm.deploymentData.addDeviceStatus = vm.deploymentData.operationStatus.NOT_STARTED;
    vm.deploymentData.currentDeployment = deployment;
    vm.goToUpdateDeployment();

  };

  vm.goToDeploymentInfo = function () {
    $location.path('/main/deployment_manager/deployment_info');
  };

  vm.goToCreateDeployment = function () {
    $location.path('/main/deployment_manager/create_deployment');
  };

  vm.goToUpdateDeployment = function () {
    $location.path('/main/deployment_manager/update_deployment');
  };

  vm.goToDeleteDeployment = function () {
    $location.path('/main/deployment_manager/delete_deployment');
  };

}]);
