/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('deploymentCtrl', ['$location', 'deploymentService', 'deploymentServiceData', 'clientService', function ($location, deploymentService, deploymentServiceData, clientService) {

  deploymentService.retrieveDeployments(clientService.getCurrentClientId());

  var vm = this;

  vm.deployment = deploymentService;
  vm.deploymentData = deploymentServiceData;

  vm.getDeployments = function () {
    var x = vm.deployment.getDeployments();
    return x;
  };

  vm.selectDeployment = function (deployment) {
    vm.deployment.setCurrentDeployment(deployment);
    vm.goToDeploymentInfo();
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
