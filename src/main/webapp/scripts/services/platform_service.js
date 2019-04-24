/**platformServiceData
 * Created by JaviHop on 21/08/2018.
 */

app.service('platformService',
  ['platformServiceApi', 'platformServiceData', 'clientServiceData', '$location',
    function (platformServiceApi, platformServiceData, clientServiceData, $location) {

      var service = this;

      service.retrievePlatforms = function (clientId) {
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
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.getPlatforms = function () {
        return platformServiceData.platforms;
      };

      service.createPlatform = function (createPlatformRequest) {
        platformServiceApi.createPlatform(createPlatformRequest, clientServiceData.currentClientId)
          .then(
            function (response) {
              var platform = response.data;
              platformServiceData.platforms.push(platform);

              if (response.status === 200) {
                alert("Platform created");
                $location.path('/main/component_configurator');
              }

            }
          )
          .catch(
            function (reason) {
              console.log("Cannot create platform");
            }
          )
      };

      service.updatePlatform = function (platformId, platform) {
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

            }
          )
          .catch(
            function () {
              console.log("Cannot update platform");
            }
          );
      };

      service.deletePlatform = function (platformId) {
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

              alert("Platform deleted");
              $location.path('/main/component_configurator/component_view');
            }
          )
          .catch(
            function (reason) {
              console.log("Cannot delete platform");
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
