app.service('channelServiceApi', ['$http', 'COMPONENT_CONFIGURATION_BACKEND_URL', function ($http, COMPONENT_CONFIGURATION_BACKEND_URL) {
  this.getChannels = function (clientId) {
    return $http({
      method: 'GET',
      url: COMPONENT_CONFIGURATION_BACKEND_URL+ '/api/v1/channels',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      }
    });
  };

  this.createChannel = function (source, inpAlignmentName, inpAlignmentVersion, outAlignmentName, outAlignmentVersion, sink, parallelism, clientId) {
    return $http({
      method: 'POST',
      url: COMPONENT_CONFIGURATION_BACKEND_URL+ '/api/v1/channels',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      },
      data: {
        "source": source,
        "inpAlignmentName": inpAlignmentName,
        "inpAlignmentVersion": inpAlignmentVersion,
        "outAlignmentName": outAlignmentName,
        "outAlignmentVersion": outAlignmentVersion,
        "sink": sink,
        "parallelism": parallelism
      }
    });
  };

  this.deleteChannel = function (channelId, clientId) {
    return $http({
      method: 'DELETE',
      url: COMPONENT_CONFIGURATION_BACKEND_URL+ '/api/v1/channels/' + channelId,
      headers: {
        "Client-ID": clientId
      }
    });
  };
}]);

