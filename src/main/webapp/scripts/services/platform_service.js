/**platformServiceData
 * Created by JaviHop on 21/08/2018.
 */

app.service('platformService',
  ['platformServiceApi', 'platformServiceData', '$location',
    function (platformServiceApi, platformServiceData, $location) {

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

      service.createPlatform = function (platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId, downInputAligName, downInputAligVers, downOutputAligName, downOutputAligVers, upInputAligName, upInputAligVers, upOutputAligName, upOutputAligVers) {
        platformServiceApi.createPlatform(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId, downInputAligName, downInputAligVers, downOutputAligName, downOutputAligVers, upInputAligName, upInputAligVers, upOutputAligName, upOutputAligVers)
          .then(
            function (response) {
              platformServiceData.platforms.push({
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
              });
              if (response.status === 200) {
                alert("Platform created");
                $location.path('/main/component_configurator');
              }

            }
          )
      };

      service.updatePlatform = function (platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId) {
        platformServiceApi.updatePlatform(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId);
      };

      service.deletePlatform = function (platformId, clientId) {
        platformServiceApi.deletePlatform(platformId, clientId)
          .then(
            function (response) {
              if (response.status === 200) {
                alert("Platform deleted");
                $location.path('/main/device_manager');
              }
            }
          )
      };

      service.getCurrentPlatform = function () {
        return platformServiceData.currentPlatform;
      };

      service.setCurrentPlatform = function (platform) {
        platformServiceData.currentPlatform = platform;
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
