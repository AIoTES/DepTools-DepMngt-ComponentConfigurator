app.service('clientServiceApi', ['$http', 'COMPONENT_CONFIGURATION_BACKEND_URL', function ($http, COMPONENT_CONFIGURATION_BACKEND_URL) {
  this.getClients = function (clientId) {
    return $http({
      method: 'GET',
      url: COMPONENT_CONFIGURATION_BACKEND_URL + '/api/v1/clients',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      }
    });
  };

  this.getCurrentClientId = function () {
    return $http({
      method: 'GET',
      url: COMPONENT_CONFIGURATION_BACKEND_URL + '/api/v1/clients/me',
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  this.setCurrentClientId = function (clientId) {
    return $http({
      method: 'POST',
      url: COMPONENT_CONFIGURATION_BACKEND_URL + '/api/v1/clients/me',
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        "clientId": clientId
      }
    });
  };

}]);

