app.service('alignmentServiceApi', ['$http', 'COMPONENT_CONFIGURATION_BACKEND_URL', function ($http, COMPONENT_CONFIGURATION_BACKEND_URL) {
  this.getAlignments = function (clientId) {
    return $http({
      method: 'GET',
      url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/alignments',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      }
    });
  };

  this.getAlignment = function (name, version, clientId) {
    return $http({
      method: 'GET',
      url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/alignments/' + name + '/' + version,
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      }
    });
  };

  this.createAlignment = function (clientId) {
    return $http({
      method: 'POST',
      url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/alignments',
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

  this.deleteAlignment = function (name, version, clientId) {
    return $http({
      method: 'DELETE',
      url: COMPONENT_CONFIGURATION_BACKEND_URL + 'api/v1/alignments/' + name + '/' + version,
      headers: {
        "Client-ID": clientId
      }
    });
  };
}]);

