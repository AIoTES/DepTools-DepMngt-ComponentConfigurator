/**platformServiceData
 * Created by JaviHop on 21/08/2018.
 */

app.service('platformService',
  ['platformServiceApi', 'platformServiceData', 'clientServiceData', '$location',
    function (platformServiceApi, platformServiceData, clientServiceData, $location) {

      var service = this;

      service.retrievePlatforms = function (clientId) {
        platformServiceData.retrievalStatus["platforms"] = platformServiceData.operationStatus.IN_PROGRESS;
        platformServiceApi.getPlatforms(clientId)
          .then(
            function (response) {
              platformServiceData.platforms = [];
              var data = response.data;
              data.forEach(
                function (value) {
                  platformServiceData.platforms.push(value);
                }
              );
              platformServiceData.retrievalStatus["platforms"] = platformServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function (error) {
              console.log(error);
              platformServiceData.retrievalStatus["platforms"] = platformServiceData.operationStatus.FAILURE;
            }
          );
      };

      service.getPlatforms = function () {
        return platformServiceData.platforms;
      };

      service.createPlatform = function (createPlatformRequest) {
        platformServiceData.createStatus = platformServiceData.operationStatus.IN_PROGRESS;
        platformServiceApi.createPlatform(createPlatformRequest, clientServiceData.currentClientId)
          .then(
            function (response) {
              var platform = response.data;
              platformServiceData.platforms.push(platform);

              if (response.status === 200) {
                platformServiceData.createStatus = platformServiceData.operationStatus.SUCCESS;
              }

            }
          )
          .catch(
            function (reason) {
              console.log("Cannot create platform");
              console.log(reason);
              platformServiceData.createStatus = platformServiceData.operationStatus.FAILURE;
            }
          )
      };

      service.updatePlatform = function (platformId, platform) {
        platformServiceData.updateStatus = platformServiceData.operationStatus.IN_PROGRESS;
        platformServiceApi.updatePlatform(platformId, platform, clientServiceData.currentClientId)
          .then(
            function (response) {
              var updatedPlatform = response.data;

              var platformIndex = platformServiceData.platforms.findIndex(
                function (value) {
                  return value.platformId === platformId;
                }
              );

              platformServiceData.platforms[platformIndex].baseEndpoint = updatedPlatform.baseEndpoint;
              platformServiceData.platforms[platformIndex].location = updatedPlatform.location;
              platformServiceData.platforms[platformIndex].name = updatedPlatform.name;
              platformServiceData.platforms[platformIndex].username = updatedPlatform.username;
              platformServiceData.platforms[platformIndex].downstreamInputAlignmentName = updatedPlatform.downstreamInputAlignmentName;
              platformServiceData.platforms[platformIndex].downstreamInputAlignmentVersion = updatedPlatform.downstreamInputAlignmentVersion;
              platformServiceData.platforms[platformIndex].downstreamOutputAlignmentName = updatedPlatform.downstreamOutputAlignmentName;
              platformServiceData.platforms[platformIndex].downstreamOutputAlignmentVersion = updatedPlatform.downstreamOutputAlignmentVersion;
              platformServiceData.platforms[platformIndex].upstreamInputAlignmentName = updatedPlatform.upstreamInputAlignmentName;
              platformServiceData.platforms[platformIndex].upstreamInputAlignmentVersion = updatedPlatform.upstreamInputAlignmentVersion;
              platformServiceData.platforms[platformIndex].upstreamOutputAlignmentName = updatedPlatform.upstreamOutputAlignmentName;
              platformServiceData.platforms[platformIndex].upstreamOutputAlignmentVersion = updatedPlatform.upstreamOutputAlignmentVersion;

              if (platformServiceData.currentPlatform.platformId === platformId) {
                platformServiceData.currentPlatform.baseEndpoint = updatedPlatform.baseEndpoint;
                platformServiceData.currentPlatform.location = updatedPlatform.location;
                platformServiceData.currentPlatform.name = updatedPlatform.name;
                platformServiceData.currentPlatform.username = updatedPlatform.username;
                platformServiceData.currentPlatform.downstreamInputAlignmentName = updatedPlatform.downstreamInputAlignmentName;
                platformServiceData.currentPlatform.downstreamInputAlignmentVersion = updatedPlatform.downstreamInputAlignmentVersion;
                platformServiceData.currentPlatform.downstreamOutputAlignmentName = updatedPlatform.downstreamOutputAlignmentName;
                platformServiceData.currentPlatform.downstreamOutputAlignmentVersion = updatedPlatform.downstreamOutputAlignmentVersion;
                platformServiceData.currentPlatform.upstreamInputAlignmentName = updatedPlatform.upstreamInputAlignmentName;
                platformServiceData.currentPlatform.upstreamInputAlignmentVersion = updatedPlatform.upstreamInputAlignmentVersion;
                platformServiceData.currentPlatform.upstreamOutputAlignmentName = updatedPlatform.upstreamOutputAlignmentName;
                platformServiceData.currentPlatform.upstreamOutputAlignmentVersion = updatedPlatform.upstreamOutputAlignmentVersion;
              }

              platformServiceData.updateStatus = platformServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              console.log("Cannot update platform");
              platformServiceData.updateStatus = platformServiceData.operationStatus.FAILURE;
            }
          );
      };

      service.deletePlatform = function (platformId) {
        platformServiceData.deleteStatus = platformServiceData.operationStatus.IN_PROGRESS;
        platformServiceApi.deletePlatform(platformId, clientServiceData.currentClientId)
          .then(
            function () {
              var platformIndex = platformServiceData.platforms.findIndex(
                function (value) {
                  return value.platformId === platformId;
                }
              );

              if (platformIndex !== -1)
                platformServiceData.platforms.splice(platformIndex, 1);

              platformServiceData.deleteStatus = platformServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function (reason) {
              console.log("Cannot delete platform");
              console.log(reason);
              platformServiceData.deleteStatus = platformServiceData.operationStatus.FAILURE;
            }
          )
      };

      service.loadPlatformTypes = function (clientId) {
        platformServiceApi.loadPlatformTypes(clientId)
          .then(
            function (response) {
              platformServiceData.platformsTypes = response.data;
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.consultPlatformTypes = function (clientId) {
        platformServiceApi.consultTypes(clientId);
      };

      service.getPlatformsTypes = function () {
        return platformServiceData.platformsTypes;
      };

      return service;

    }
  ]
);
