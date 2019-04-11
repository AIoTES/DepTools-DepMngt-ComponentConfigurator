/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('deploymentInfoCtrl', ['$location', function ($location) {

  var vm = this;

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
    $location.path('/main/deployment_manager/delete_deployment');
  };

}]);
