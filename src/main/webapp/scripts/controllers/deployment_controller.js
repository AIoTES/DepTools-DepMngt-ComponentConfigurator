/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('deploymentCtrl', ['$location', 'deploymentService', 'deploymentServiceData', function ($location, deploymentService, deploymentServiceData) {

  deploymentService.retrieveDeployments();
  deploymentService.retrieveDevices();

  var vm = this;

  vm.deployment = deploymentService;
  vm.deploymentData = deploymentServiceData;

  vm.getDeployments = function () {
    return vm.deployment.getDeployments();
  };

  vm.selectDeployment = function (deployment) {
    vm.deployment.setCurrentDeployment(deployment);
    $location.path('/main/deployment_manager/deployment_info');
  };

  vm.goToCreateDeployment = function () {
    $location.path('/main/deployment_manager/create_deployment');
  };

  vm.goToUpdateDeployment = function (deployment) {
    vm.deployment.setCurrentDeployment(deployment);
    $location.path('/main/deployment_manager/update_deployment');
  };

  vm.goToDeleteDeployment = function () {
    $location.path('/main/deployment_manager/delete_deployment');
  };

}]);
