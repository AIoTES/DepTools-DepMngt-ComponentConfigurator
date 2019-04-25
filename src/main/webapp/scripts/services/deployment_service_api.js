app.service('deploymentServiceApi',
  ['$http', 'BACKEND_URL',
    function ($http, BACKEND_URL) {

      var service = {};

      service.getDevices = function () {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/deployments/devices',
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.getDeployments = function () {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/deployments',
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.addDeviceToDeployment = function (deploymentId, deviceId) {
        return $http({
          method: 'PUT',
          url: BACKEND_URL + '/api/v1/deployments/' + deploymentId + '/devices/' + deviceId,
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.deleteDeviceFromDeployment = function (deploymentId, deviceId) {
        return $http({
          method: 'DELETE',
          url: BACKEND_URL + '/api/v1/deployments/' + deploymentId + '/devices/' + deviceId,
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.createDeployment = function (deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices) {//}, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType) {
        return $http({
          method: 'POST',
          url: BACKEND_URL + '/api/v1/deployments',
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            "deployment": [
              {
                "id": deployId,
                "date": deployDate,
                "location": location,
                "organization" : {
                  "id": organizationId,
                  "label": organizationLabel
                },
                "platform" : {
                  "id": platformId,
                  "label": platformLabel,
                  "devices": devices
                }
              }
            ]
          }
        });
      };

      /*service.updateDeployment = function (clientId, deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices) {
        return $http({
          method: 'PUT',
          url: BACKEND_URL + '/api/v1/deployments?deviceId=' + deviceId,
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          },
          data: {
            "deviceTypes": [deviceTypes],
            "deviceId": deviceId,
            "hostedBy": hostedBy,
            "location": location,
            "name": name,
            "hosts": [hosts],
            "forProperty": forProperty,
            "madeActuation": madeActuation,
            "implementsProcedure": implementsProcedure,
            "observes": observes,
            "detects": detects,
            "madeObservation": madeObservation
          }
        });
      };*/

      service.deleteDeployment = function (deploymentId) {
        return $http({
          method: 'DELETE',
          url: BACKEND_URL + '/api/v1/deployments/' + deploymentId,
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        });
      };

      return service;
    }
  ]
);
