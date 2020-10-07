app.service('platformServiceApi',
  ['$http', 'COMPONENT_CONFIGURATION_BACKEND_URL',
    function ($http, COMPONENT_CONFIGURATION_BACKEND_URL) {

      var service_api = {};

      service_api.getPlatforms = function (clientId) {
        return $http({
          method: 'GET',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/platforms',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          }
        });
      };

      service_api.createPlatform = function (platform, clientId) {
        return $http({
          method: 'POST',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/platforms',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          },
          data: platform
        });
      };

      service_api.updatePlatform = function (platformId, platform, clientId) {
        return $http({
          method: 'PUT',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/platforms?platformId=' + platformId,
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          },
          data: platform
        });
      };

      service_api.deletePlatform = function (platformId, clientId) {
        return $http({
          method: 'DELETE',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/platforms?platformId=' + platformId,
          headers: {
            "Client-ID": clientId
          }
        });
      };

      service_api.consultTypes = function (clientId) {
        return $http({
          method: 'GET',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/platforms/platform-types',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          }
        });
      };

      service_api.loadPlatformTypes = function (clientId) {
        return $http({
          method: 'GET',
          url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/platforms/types',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          }
        });
      };

      return service_api;
    }
  ]
);

