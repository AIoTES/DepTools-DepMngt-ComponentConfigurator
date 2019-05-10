app.service('channelService',
  ['channelServiceApi', 'channelServiceData',
    function (channelServiceApi, channelServiceData) {

      var service = this;

      service.retrieveChannels = function (clientId) {
        channelServiceApi.getChannels(clientId)
          .then(
            function (response) {
              channelServiceData.channels = [];
              var data = response.data;
              data.forEach(
                function (value) {
                  channelServiceData.channels.push(value);
                }
              );
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.getChannels = function() {
        return channelServiceData.channels;
      };

      service.getCurrentChannel= function() {
        return channelServiceData.currentChannel;
      }

      service.createChannel = function(source, inpAlignmentName, inpAlignmentVersion, outAlignmentName, outAlignmentVersion, sink, parallelism, clientId) {
        channelServiceApi.createChannel(source, inpAlignmentName, inpAlignmentVersion, outAlignmentName, outAlignmentVersion, sink, parallelism, clientId);
      };

      service.deleteChannel = function(channelId, clientId) {
        channelServiceApi.deleteChannel(channelId, clientId);
      };

      return service;

    }
  ]
);
