/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('deploymentInfoCtrl', ['$location', 'deploymentService', 'deploymentServiceData', function ($location, deploymentService, deploymentServiceData) {

  var vm = this;

  vm.deploymentService = deploymentService;
  vm.deploymentServiceData = deploymentServiceData;

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
    vm.deploymentService.deleteDeployment(vm.deploymentServiceData.currentDeployment.id);
  };

}]);
