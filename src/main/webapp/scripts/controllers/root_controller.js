/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('rootCtrl', ['$location', function ($location) {

  var vm = this;

  vm.webTitle = 'Interoperability Demo Application';

  vm.toggleMenu = function () {
    vm.openMenu = !vm.openMenu;
  };

  vm.goToDeployManager = function () {
    vm.webTitle = 'Deployment Manager';
    $location.path('/main/deployment_manager/device_list');
  };

  vm.goToComponentConfigurator = function () {
    vm.webTitle = 'Component Configurator';
    $location.path('/main/component_configurator/component_view');
  };

  vm.goToMaintenancePanel = function () {
    vm.webTitle = 'Maintenance Panel';
    $location.path('/main/maintenance_panel');
  };

  vm.goToUpdateManager = function () {
    vm.webTitle = 'Update Manager';
    $location.path('/main/update_manager');
  };

  vm.goToAbout = function () {
    vm.webTitle = 'Interoperability Demo Application';
    $location.path('/main/about/deployment_manager');
  };

}]);
