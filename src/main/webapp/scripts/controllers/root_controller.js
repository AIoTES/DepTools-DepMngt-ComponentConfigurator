/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('rootCtrl', ['$location', function ($location) {

  var vm = this;

  vm.goToDeployManager = function () {
    $location.path('/main/deployment_manager');
  };

  vm.goToComponentConfigurator = function () {
    $location.path('/main/component_configurator/component_view');
  };

  vm.goToMaintenancePanel = function () {
    $location.path('/main/maintenance_panel');
  };

  vm.goToAbout = function () {
    $location.path('/main/about/deployment_manager');
  };

}]);
