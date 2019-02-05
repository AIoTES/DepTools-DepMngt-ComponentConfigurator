app.service('clientServiceApi', ['$http', 'BACKEND_URL', function ($http, BACKEND_URL) {
  this.getClients = function (clientId) {
    return $http({
      method: 'GET',
      url: BACKEND_URL+ '/api/v1/clients',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      }
    });
  };

  this.getCurrentClientId = function () {
    return $http({
      method: 'GET',
      url: BACKEND_URL+ '/api/v1/clients/actual',
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  this.setCurrentClientId = function (clientId) {
    return $http({
      method: 'POST',
      url: BACKEND_URL+ '/api/v1/clients/actual',
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        "clientId": clientId
      }
    });
  };

}]);

