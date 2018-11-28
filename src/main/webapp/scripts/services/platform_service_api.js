app.service('platformServiceApi', ['$http', 'BACKEND_URL', function ($http, BACKEND_URL) {
  this.getPlatforms = function (clientId) {
    return $http({
      method: 'GET',
      url: BACKEND_URL+ '/api/v1/platforms',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      }
    });
  };

  this.createPlatform = function (platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId) {
    return $http({
      method: 'POST',
      url: BACKEND_URL+ '/api/v1/platforms/new',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      },
      data: {
        "platformId": platformId,
        "type": type,
        "baseEndpoint": baseEndpoint,
        "location": location,
        "name": name,
        "username": username,
        "encryptedPassword": encryptedPassword,
        "encryptionAlgorithm": encryptionAlgorithm
      }
    });
  };

  this.updatePlatform = function (platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId) {
    return $http({
      method: 'PUT',
      url: BACKEND_URL+ '/api/v1/platforms/' + platformId,
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      },
      data: {
        "platformId": platformId,
        "type": type,
        "baseEndpoint": baseEndpoint,
        "location": location,
        "name": name,
        "username": username,
        "encryptedPassword": encryptedPassword,
        "encryptionAlgorithm": encryptionAlgorithm
      }
    });
  };

  this.deletePlatform = function (platformId, clientId) {
    return $http({
      method: 'DELETE',
      url: BACKEND_URL+ '/api/v1/platforms/?platformId=' + platformId,
      headers: {
        "Client-ID": clientId
      }
    });
  };
}]);

