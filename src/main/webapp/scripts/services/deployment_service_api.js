app.service('deploymentServiceApi',
  ['$http', 'DEPLOYMENT_MANAGER_BACKEND_URL',
    function ($http, DEPLOYMENT_MANAGER_BACKEND_URL) {

      var service = {};

      service.getDevices = function () {
        return $http({
          method: 'GET',
          url: DEPLOYMENT_MANAGER_BACKEND_URL + 'api/v1/deployments/devices',
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.getDeployments = function () {
        return $http({
          method: 'GET',
          url: DEPLOYMENT_MANAGER_BACKEND_URL + 'api/v1/deployments',
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.getDeploymentById = function (deploymentId) {
        return $http({
          method: 'GET',
          url: DEPLOYMENT_MANAGER_BACKEND_URL + 'api/v1/deployments/' + deploymentId,
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.addDeviceToDeployment = function (deploymentId, deviceId) {
        return $http({
          method: 'PUT',
          url: DEPLOYMENT_MANAGER_BACKEND_URL + 'api/v1/deployments/' + deploymentId + '/devices/' + deviceId,
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.deleteDeviceFromDeployment = function (deploymentId, deviceId) {
        return $http({
          method: 'DELETE',
          url: DEPLOYMENT_MANAGER_BACKEND_URL + 'api/v1/deployments/' + deploymentId + '/devices/' + deviceId,
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.createDeployment = function (deployId, deployDate, location, organizationId, organizationLabel, platformId, platformLabel, devices) {
        return $http({
          method: 'POST',
          url: DEPLOYMENT_MANAGER_BACKEND_URL + 'api/v1/deployments',
          headers: {
            "Content-Type": "application/json"
          },
          data: {
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
        });
      };

      service.deleteDeployment = function (deploymentId) {
        return $http({
          method: 'DELETE',
          url: DEPLOYMENT_MANAGER_BACKEND_URL + 'api/v1/deployments/' + deploymentId,
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        });
      };

      return service;
    }
  ]
);
