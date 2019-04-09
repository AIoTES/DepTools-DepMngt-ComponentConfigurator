app.service('channelServiceApi', ['$http', 'BACKEND_URL', function ($http, BACKEND_URL) {
  this.getChannels = function (clientId) {
    return $http({
      method: 'GET',
      url: BACKEND_URL+ '/api/v1/channels',
      headers: {
        "Content-Type": "application/json",
        "Client-ID": clientId
      }
    });
  };

  this.createChannel = function (source, inpAlignmentName, inpAlignmentVersion, outAlignmentName, outAlignmentVersion, sink, parallelism, clientId) {
    return $http({
      method: 'POST',
      url: BACKEND_URL+ '/api/v1/channels',
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
      url: BACKEND_URL+ '/api/v1/channels/' + channelId,
      headers: {
        "Client-ID": clientId
      }
    });
  };
}]);

