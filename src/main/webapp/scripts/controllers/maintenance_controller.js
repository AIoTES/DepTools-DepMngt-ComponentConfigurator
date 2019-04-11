/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('maintenanceCtrl', ['$location', function ($location) {

  var vm = this;

  vm.goToMaintenanceInfo = function () {
    $location.path('/main/maintenance_panel/maintenance_info');
  };

  vm.goToAddMaintenance = function () {
    $location.path('/main/maintenance_panel/add_maintenance');
  };

  vm.goToUpdateDeployment = function () {
    $location.path('/main/deployment_manager/update_deployment');
  };

  vm.goToDeleteDeployment = function () {
    $location.path('/main/deployment_manager/delete_deployment');
  };

}]);
