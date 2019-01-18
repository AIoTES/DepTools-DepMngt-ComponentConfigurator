/**platformServiceData
 * Created by JaviHop on 21/08/2018.
 */

app.service('platformService',
  ['platformServiceApi', 'platformServiceData',
    function (platformServiceApi, platformServiceData) {

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

      service.getPlatforms = function() {
        return platformServiceData.platforms;
      };

      service.createPlatform = function(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId, downInputAligName, downInputAligVers, downOutputAligName, downOutputAligVers, upInputAligName, upInputAligVers, upOutputAligName, upOutputAligVers) {
        platformServiceApi.createPlatform(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId, downInputAligName, downInputAligVers, downOutputAligName, downOutputAligVers, upInputAligName, upInputAligVers, upOutputAligName, upOutputAligVers);
      };

      service.updatePlatform = function(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId) {
        platformServiceApi.updatePlatform(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId);
      };

      service.deletePlatform = function(platformId, clientId) {
        platformServiceApi.deletePlatform(platformId, clientId);
      };

      service.getCurrentPlatform = function() {
        return platformServiceData.currentPlatform;
      };

      service.setCurrentPlatform = function(platform) {
        platformServiceData.currentPlatform = platform;
      };

      service.loadPlatformTypes = function(clientId) {
        platformServiceApi.loadPlatformTypes(clientId).then(
          function (response) {
            platformServiceData.platformsTypes = [];
            var data = response.data;

            for (var value in data)
              platformServiceData.platformsTypes.push(data[value]);
          }
        )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.consultPlatformTypes = function(clientId) {
        platformServiceApi.consultTypes(clientId);
      };

      service.getPlatformsTypes = function() {
        return platformServiceData.platformsTypes;
      }

      return service;

    }
  ]
);
