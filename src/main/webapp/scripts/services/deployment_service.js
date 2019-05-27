app.service('deploymentService',
  ['deploymentServiceApi', 'deploymentServiceData', '$location', '$interval',
    function (deploymentServiceApi, deploymentServiceData, $location, $interval) {

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
              if (deploymentServiceData.currentDeployment !== '') {
                deploymentServiceData.notDeploymentDevicesSelected = [];
                deploymentServiceData.deploymentDevices.forEach(function (device) {
                  if (!deploymentServiceData.currentDeployment.platform.devices.includes(device.id))
                    deploymentServiceData.notDeploymentDevicesSelected.push(device.id);
                });
              }
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

      service.addDeviceToDeployment = function (deploymentId, deviceId) {
        deploymentServiceData.addStatus[deviceId] = deploymentServiceData.operationStatus.IN_PROGRESS;
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
                  deploymentServiceData.addStatus[deviceId] = deploymentServiceData.operationStatus.SUCCESS;
                  var promise_interval = $interval(
                    function () {
                      deploymentServiceData.addStatus[deviceId] = deploymentServiceData.operationStatus.NOT_STARTED;
                      $interval.cancel(promise_interval);
                    }, 1500
                  );
                }

                deploymentServiceData.notDeploymentDevicesSelected = deploymentServiceData.notDeploymentDevicesSelected.filter(function (value) {
                  return value !== deviceId;
                });
                console.log("AddDevice");
                console.log("Assigned devices: " + deploymentServiceData.currentDeployment.platform.devices);
                console.log("Unassigned devices: " + deploymentServiceData.notDeploymentDevicesSelected);
              }
            }
          )
          .catch(
            function (error) {
              console.log(error);
              deploymentServiceData.addStatus[deviceId] = deploymentServiceData.operationStatus.FAILURE;
              var promise_interval = $interval(
                function () {
                  deploymentServiceData.addStatus[deviceId] = deploymentServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, 1500
              );
            }
          )
      };

      service.deleteDeviceFromDeployment = function (deploymentId, deviceId) {
        deploymentServiceData.removeDeviceStatus[deviceId] = deploymentServiceData.operationStatus.IN_PROGRESS;
        deploymentServiceApi.deleteDeviceFromDeployment(deploymentId, deviceId)
          .then(
            function (response) {
              var deployment = response.data;

              var deploymentIndex = deploymentServiceData.deployments.findIndex(
                function (value) {
                  return value.id === deploymentId;
                }
              );

              if (deploymentIndex !== -1) {
                deploymentServiceData.deployments[deploymentIndex].platform.devices = deployment.platform.devices;

                // var deviceIndex = deploymentServiceData.currentDeployment.platform.devices.findIndex(
                //   function (value) {
                //     return value === deviceId;
                //   }
                // );
                //
                // if (deviceIndex !== -1) {
                //   deploymentServiceData.currentDeployment.platform.devices.splice(deviceIndex, 1);
                // }

                deploymentServiceData.removeDeviceStatus[deviceId] = deploymentServiceData.operationStatus.SUCCESS;
                var promise_interval = $interval(
                  function () {
                    deploymentServiceData.removeDeviceStatus[deviceId] = deploymentServiceData.operationStatus.NOT_STARTED;
                    $interval.cancel(promise_interval);
                  }, 1500
                );
              }

              deploymentServiceData.notDeploymentDevicesSelected.push(deviceId);
              console.log("DeleteDevice");
              console.log("Assigned devices: " + deploymentServiceData.currentDeployment.platform.devices);
              console.log("Unassigned devices: " + deploymentServiceData.notDeploymentDevicesSelected);
            }
          )
          .catch(
            function (error) {
              console.log(error);
              deploymentServiceData.removeDeviceStatus[deviceId] = deploymentServiceData.operationStatus.FAILURE;
              var promise_interval = $interval(
                function () {
                  deploymentServiceData.removeDeviceStatus[deviceId] = deploymentServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, 1500
              );
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
                var promise_interval = $interval(
                  function () {
                    deploymentServiceData.createStatus = deploymentServiceData.operationStatus.NOT_STARTED;
                    $interval.cancel(promise_interval);
                  }, 1500
                );
                $location.path('/main/deployment_manager');
              }
            }
          )
          .catch(
            function (error) {
              console.log(error);
              deploymentServiceData.createStatus = deploymentServiceData.operationStatus.FAILURE;
              var promise_interval = $interval(
                function () {
                  deploymentServiceData.createStatus = deploymentServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, 1500
              );

            }
          )
      };

      service.deleteDeployment = function (deploymentId) {
        deploymentServiceData.deleteStatus = deploymentServiceData.operationStatus.IN_PROGRESS;
        deploymentServiceApi.deleteDeployment(deploymentId)
          .then(
            function () {
              var deploymentIndex = deploymentServiceData.deployments.findIndex(
                function (value) {
                  return value.id === deploymentId;
                }
              );

              if (deploymentIndex !== -1) {
                deploymentServiceData.deployments.splice(deploymentIndex, 1);
                deploymentServiceData.deleteStatus = deploymentServiceData.operationStatus.SUCCESS;
                var promise_interval = $interval(
                  function () {
                    deploymentServiceData.deleteStatus = deploymentServiceData.operationStatus.NOT_STARTED;
                    $interval.cancel(promise_interval);
                  }, 1500
                );

                $location.path('/main/deployment_manager');
              }
            }
          )
          .catch(
            function (error) {
              console.log(error);
              deploymentServiceData.deleteStatus = deploymentServiceData.operationStatus.FAILURE;
              var promise_interval = $interval(
                function () {
                  deploymentServiceData.deleteStatus = deploymentServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, 1500
              );
            }
          )
      };

      return service;
    }
  ]
);
