app.service('platformServiceApi', ['$http', 'BACKEND_URL', 'CLIENT_ID', function ($http, BACKEND_URL, CLIENT_ID) {
  this.getPlatforms = function () {
    return $http({
      method: 'GET',
      url: BACKEND_URL+ '/api/v1/platforms',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": CLIENT_ID
      }
    });
  };

  this.createPlatform = function (platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm) {
    return $http({
      method: 'POST',
      url: BACKEND_URL+ '/api/v1/platforms/new',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": CLIENT_ID
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
      // data: '{"platformId": "'+platformId+'","type": "'+type+'","baseEndpoint": "'+baseEndpoint+'","location": "'+location+'","name": "'+name+'","username": "'+username+'","encryptedPassword": "'+encryptedPassword+'","encryptionAlgorithm": "'+encryptionAlgorithm+'"}'
    });
  };
}]);

