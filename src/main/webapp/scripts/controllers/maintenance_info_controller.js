/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('maintenanceInfoCtrl', ['$location', function ($location) {

  var vm = this;

  vm.closeMaintenanceInfo = function () {
    $location.path('/main/maintenance_panel');
  };

  vm.goToAddMaintenance = function () {
    $location.path('/main/maintenance_panel/add_maintenance');
  };

  vm.goToUpdateMaintenance = function () {
    $location.path('/main/maintenance_panel/update_maintenance');
  };

  vm.goToDeleteMaintenance = function () {
    $location.path('/main/maintenance_panel/delete_maintenance');
  };

}]);
