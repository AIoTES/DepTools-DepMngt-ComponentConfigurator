/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('maintenanceCtrl',
  ['$location', 'deploymentService', 'deploymentServiceData', 'recordService', 'recordServiceData',
    function ($location, deploymentService, deploymentServiceData, recordService, recordServiceData) {

      var vm = this;

      if (deploymentServiceData.deployments.length === 0)
        deploymentService.retrieveDeployments();

      if (deploymentServiceData.deploymentDevices.length === 0)
        deploymentService.retrieveDevices();

      vm.deploymentData = deploymentServiceData;

      vm.selectDeployment = function (deployment) {
        deploymentServiceData.currentDeployment = deployment;
        deploymentServiceData.selected = 'deployment';
        recordService.retrieve_records_by_element_id(deployment.id);
        recordServiceData.selectedElementId = deployment.id;
        vm.goToMaintenanceInfo();
      };

      vm.selectDeviceDeployment = function (device) {
        deploymentServiceData.currentDeviceDeployment = device;
        deploymentServiceData.selected = 'device';
        recordService.retrieve_records_by_element_id(device.id);
        recordServiceData.selectedElementId = device.id;
        vm.goToMaintenanceInfo();
      };

      // console.log(vm.selectDeviceDeployment());

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
