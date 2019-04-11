app.service('deploymentService',
  ['deploymentServiceApi', 'deploymentServiceData',
    function (deploymentServiceApi, deploymentServiceData) {

      var service = {};

      service.retrieveDevices = function (idPlatform, clientId) {
        deploymentServiceApi.getDevices(idPlatform, clientId)
          .then(
            function (response) {
              deploymentServiceData.devices = response.data;
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.getCurrentDevice = function() {
        return deploymentServiceData.currentDevice;
      }

      service.setCurrentDevice = function(device) {
        deploymentServiceData.currentDevice = device
      }

      service.getDevices = function() {
        return deploymentServiceData.devices;
      }

      service.createDeployment = function (deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType) {
        deploymentServiceApi.createDeployment(deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType)
          .then(
            function(response) {
              if (response.status === 200) {
                alert("Deployment created");
                $location.path('/main/deployment_manager');
              }
            }
          )
      };

      service.updateDevice = function (deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType) {
        deploymentServiceApi.updateDeployment(deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType);
      };

      service.deleteDevice = function (deviceId, clientId) {
        deploymentServiceApi.deleteDevice(deviceId, clientId)
          .then(
            function(response) {
              if (response.status === 200) {
                alert("Device deleted");
                $location.path('/main/device_manager');
              }
            }
          )
      };

      return service;
    }
  ]
);
