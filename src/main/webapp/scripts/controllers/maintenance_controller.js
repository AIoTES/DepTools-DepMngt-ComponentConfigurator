/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('maintenanceCtrl',
  ['$location', 'deploymentService', 'deploymentServiceData',
    function ($location, deploymentService, deploymentServiceData) {

      var vm = this;

      if (deploymentServiceData.deployments.length === 0)
        deploymentService.retrieveDeployments();

      vm.deploymentData = deploymentServiceData;

      vm.selectDeployment = function (deployment) {
        deploymentServiceData.currentDeployment = deployment;
        vm.goToMaintenanceInfo();
      };

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

    }
  ]
);
