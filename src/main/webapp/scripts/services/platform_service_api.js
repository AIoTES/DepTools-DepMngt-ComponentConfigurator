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

  this.createPlatform = function (platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId, downInputAligName, downInputAligVers, downOutputAligName, downOutputAligVers, upInputAligName, upInputAligVers, upOutputAligName, upOutputAligVers) {
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
        "encryptionAlgorithm": encryptionAlgorithm,
        "downstreamInputAlignmentName": downInputAligName,
        "downstreamInputAlignmentVersion": downInputAligVers,
        "downstreamOutputAlignmentName": downOutputAligName,
        "downstreamOutputAlignmentVersion": downOutputAligVers,
        "upstreamInputAlignmentName": upInputAligName,
        "upstreamInputAlignmentVersion": upInputAligVers,
        "upstreamOutputAlignmentName": upOutputAligName,
        "upstreamOutputAlignmentVersion": upOutputAligVers
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

  this.consultTypes = function(clientId) {
    return $http({
      method: 'GET',
      url: BACKEND_URL+ '/api/v1/platforms/platform-types',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      }
    });
  }

  this.loadPlatformTypes = function (clientId) {
    return $http({
      method: 'GET',
      url: BACKEND_URL+ '/api/v1/platforms/types',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      }
    });
  };
}]);

