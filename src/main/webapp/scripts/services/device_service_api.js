app.service('deviceServiceApi',
  ['$http', 'COMPONENT_CONFIGURATION_BACKEND_URL',
    function ($http, COMPONENT_CONFIGURATION_BACKEND_URL) {

      var service = {};

      service.getDevices = function (idPlatform, clientId) {
        return $http({
          method: 'GET',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/devices?platformId=' + idPlatform,
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          }
        });
      };

      service.createDevice = function (deviceToCreate, clientId) {
        return $http({
          method: 'POST',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/devices',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          },
          data: deviceToCreate
        });
      };

      service.updateDevice = function (deviceToUpdate, clientId) {
        return $http({
          method: 'PUT',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/devices',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          },
          data: deviceToUpdate
        });
      };

      service.deleteDevice = function (deviceId, clientId) {
        return $http({
          method: 'DELETE',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/devices?deviceId=' + deviceId,
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
