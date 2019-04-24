/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('deploymentInfoCtrl', ['$location', 'deploymentService', 'clientService', function ($location, deploymentService, clientService) {

  var vm = this;

  vm.deploymentService = deploymentService;

  vm.currentDeployment = vm.deploymentService.getCurrentDeployment();

  vm.closeDeploymentInfo = function () {
    $location.path('/main/deployment_manager');
  };

  vm.goToCreateDeployment = function () {
    $location.path('/main/deployment_manager/create_deployment');
  };

  vm.goToUpdateDeployment = function () {
    $location.path('/main/deployment_manager/update_deployment');
  };

  vm.goToDeleteDeployment = function () {
    vm.deploymentService.deleteDeployment(vm.currentDeployment.id, clientService.getCurrentClientId())
    //$location.path('/main/deployment_manager/delete_deployment');
  };

}]);
