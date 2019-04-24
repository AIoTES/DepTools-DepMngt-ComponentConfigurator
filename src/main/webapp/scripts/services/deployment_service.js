app.service('deploymentService',
  ['deploymentServiceApi', 'deploymentServiceData', '$location',
    function (deploymentServiceApi, deploymentServiceData, $location) {

      var service = {};

      service.retrieveDeployments = function (clientId) {
        deploymentServiceApi.getDeployments(clientId)
          .then(
            function (response) {
              deploymentServiceData.deployments = response.data;
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.getDeployments = function() {
        return deploymentServiceData.deployments;
      };

      service.getCurrentDeployment = function() {
        return deploymentServiceData.currentDeployment;
      };

      service.setCurrentDeployment = function(deployment) {
        deploymentServiceData.currentDeployment = deployment
      };

      service.createDeployment = function (clientId, deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices) {//, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType) {
        deploymentServiceApi.updateDeployment(clientId, deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices.split(","))//, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType)
          .then(
            function(response) {
              if (response.status === 200) {
                var deployment = response.data;
                deploymentServiceData.deployments.push(deployment);
                alert("Deployment created");
                $location.path('/main/deployment_manager');
              }
            }
          )
      };

      /*service.updateDeployment = function (clientId, deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices) {//, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType) {
        deploymentServiceApi.updateDeployment(clientId, deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices.split(","))//, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType);
      };*/

      service.deleteDeployment= function (deploymentId, clientId) {
        deploymentServiceApi.deleteDeployment(deploymentId, clientId)
          .then(
            function(response) {
              if (response.status === 204) {
                var deploymentIndex = deploymentServiceData.deployments.findIndex(
                  function (value) {
                    return value.id === deploymentId;
                  }
                );

                if (deploymentIndex !== -1)
                  deploymentServiceData.deployments.splice(deploymentIndex, 1);

                alert("Device deleted");
                $location.path('/main/deployment_manager');
              }
            }
          )
      };

      return service;
    }
  ]
);
