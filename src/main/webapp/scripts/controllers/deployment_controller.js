/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('deploymentCtrl', ['$location', function ($location) {

  var vm = this;

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
