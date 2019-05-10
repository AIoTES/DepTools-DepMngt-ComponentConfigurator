/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('aboutCtrl', ['$location', function ($location) {

  var vm = this;

  vm.goToDeployManager = function () {
    $location.path('/main/about/deployment_manager');
  };

  vm.goToComponentConfigurator = function () {
    $location.path('/main/about/component_configurator');
  };

  vm.goToMaintenancePanel = function () {
    $location.path('/main/about/maintenance_panel');
  };

}]);
