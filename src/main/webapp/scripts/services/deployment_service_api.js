app.service('deploymentServiceApi',
  ['$http', 'BACKEND_URL',
    function ($http, BACKEND_URL) {

      var service = {};

      service.getDevices = function (idPlatform, clientId) {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/devices?platformId=' + idPlatform,
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          }
        });
      };

      service.getDeployments = function (clientId) {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/deployments',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          }
        });
      };

      service.createDeployment = function (deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices, deviceId, deviceLabel, deviceType, sensors, sensorId, sensorType) {
        return $http({
          method: 'POST',
          url: BACKEND_URL + '/api/v1/devices/new',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          },
          data: {
            "deployment": [
              {
                "deployId": deployId,
                "deployDate": deployDate,
                "location": location,
                "organizationId": organizationId,
                "organizationLabel": organizationLabel,
                "platformId": platformId,
                "platformLabel": platformLabel,
                "devices": devices,
                "deviceId": deviceId,
                "deviceLabel": deviceLabel,
                "deviceType": deviceType,
                "sensors": sensors,
                "sensorId": sensorId,
                "sensorType": sensorType
              }
            ]
          }
        });
      };

      service.updateDevice = function (deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation, clientId) {
        return $http({
          method: 'PUT',
          url: BACKEND_URL + '/api/v1/devices?deviceId=' + deviceId,
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
      };

      service.deleteDevice = function (deviceId, clientId) {
        return $http({
          method: 'DELETE',
          url: BACKEND_URL + '/api/v1/devices?deviceId=' + deviceId,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Client-ID": clientId
          }
        });
      };

      return service;
    }
  ]
);
