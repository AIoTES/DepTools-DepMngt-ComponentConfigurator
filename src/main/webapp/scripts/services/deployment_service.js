app.service('deploymentService',
  ['deploymentServiceApi', 'deploymentServiceData', '$location',
    function (deploymentServiceApi, deploymentServiceData, $location) {

      var service = {};

      service.retrieveDeployments = function () {
        deploymentServiceData.retrievalStatus["deployments"] = deploymentServiceData.operationStatus.IN_PROGRESS;

        deploymentServiceApi.getDeployments()
          .then(
            function (response) {
              deploymentServiceData.deployments = response.data;
              deploymentServiceData.retrievalStatus["deployments"] = deploymentServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function (error) {
              console.log(error);
              deploymentServiceData.retrievalStatus["deployments"] = deploymentServiceData.operationStatus.FAILURE;
            }
          );
      };

      service.retrieveDevices = function () {
        deploymentServiceData.retrievalStatus["devices"] = deploymentServiceData.operationStatus.IN_PROGRESS;
        deploymentServiceApi.getDevices()
          .then(
            function (response) {
              deploymentServiceData.deploymentDevices = response.data;
              deploymentServiceData.retrievalStatus["devices"] = deploymentServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function (error) {
              console.log(error);
              deploymentServiceData.retrievalStatus["devices"] = deploymentServiceData.operationStatus.FAILURE;
            }
          );
      };

      /*service.getDeploymentById = function (deploymentId) {
        deploymentServiceData.retrievalStatus[deploymentId] = deploymentServiceData.operationStatus.IN_PROGRESS;

        deploymentServiceApi.getDeploymentById(deploymentId)
          .then(
            function (response) {
              var deployment = response.data;
              deploymentServiceData.retrievalStatus[deploymentId] = deploymentServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              deploymentServiceData.retrievalStatus[deploymentId] = deploymentServiceData.operationStatus.FAILURE;
            }
          )
      };*/

      service.addDeviceToDeployment = function (deploymentId, deviceId) {
        deploymentServiceData.addDeviceStatus = deploymentServiceData.operationStatus.IN_PROGRESS;
        deploymentServiceApi.addDeviceToDeployment(deploymentId, deviceId)
          .then(
            function (response) {
              if (response.status === 200) {
                var deployment = response.data;

                var deploymentIndex = deploymentServiceData.deployments.findIndex(
                  function (value) {
                    return value.id === deploymentId;
                  }
                );

                if (deploymentIndex !== -1) {
                  deploymentServiceData.deployments[deploymentIndex] = deployment;
                  deploymentServiceData.currentDeployment = deployment;
                  deploymentServiceData.addDeviceStatus = deploymentServiceData.operationStatus.SUCCESS;
                  $location.path('/main/deployment_manager/deployment_info');
                }
              }
            }
          )
          .catch(
            function(error) {
              console.log(error);
              deploymentServiceData.addDeviceStatus = deploymentServiceData.operationStatus.FAILURE;
            }
          )
      };

      service.deleteDeviceFromDeployment = function (deploymentId, deviceId) {
        deploymentServiceData.removeDeviceStatus[deviceId] = deploymentServiceData.operationStatus.IN_PROGRESS;
        deploymentServiceApi.deleteDeviceFromDeployment(deploymentId, deviceId)
          .then(
            function (response) {
              if (response.status === 200) {
                var deployment = response.data;

                var deploymentIndex = deploymentServiceData.deployments.findIndex(
                  function (value) {
                    return value.id === deploymentId;
                  }
                );

                if (deploymentIndex !== -1){
                  deploymentServiceData.deployments[deploymentIndex] = deployment;
                  deploymentServiceData.currentDeployment = deployment;
                  deploymentServiceData.removeDeviceStatus[deviceId] = deploymentServiceData.operationStatus.SUCCESS;
                }
              }
            }
          )
          .catch(
            function(error) {
              console.log(error);
              deploymentServiceData.removeDeviceStatus[deviceId] = deploymentServiceData.operationStatus.FAILURE;
            }
          )
      };

      service.createDeployment = function (deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices) {
        deploymentServiceData.createStatus = deploymentServiceData.operationStatus.IN_PROGRESS;
        deploymentServiceApi.createDeployment(deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices.split(","))
          .then(
            function (response) {
              console.log(response);
              if (response.status === 200) {
                var deployment = response.data;
                deploymentServiceData.deployments.push(deployment);
                deploymentServiceData.createStatus = deploymentServiceData.operationStatus.SUCCESS;
                $location.path('/main/deployment_manager');
              }
            }
          )
          .catch(
            function(error) {
              console.log(error);
              deploymentServiceData.createStatus = deploymentServiceData.operationStatus.FAILURE;
            }
          )
      };

      service.deleteDeployment = function (deploymentId) {
        deploymentServiceData.deleteStatus = deploymentServiceData.operationStatus.IN_PROGRESS;
        deploymentServiceApi.deleteDeployment(deploymentId)
          .then(
            function (response) {
              if (response.status === 200) {
                var deploymentIndex = deploymentServiceData.deployments.findIndex(
                  function (value) {
                    return value.id === deploymentId;
                  }
                );

                if (deploymentIndex !== -1) {
                  deploymentServiceData.deployments.splice(deploymentIndex, 1);
                  deploymentServiceData.deleteStatus = deploymentServiceData.operationStatus.SUCCESS;
                  $location.path('/main/deployment_manager');
                }
              }
            }
          )
          .catch(
            function(error) {
              console.log(error);
              deploymentServiceData.deleteStatus = deploymentServiceData.operationStatus.FAILURE;
            }
          )
      };

      return service;
    }
  ]
);
