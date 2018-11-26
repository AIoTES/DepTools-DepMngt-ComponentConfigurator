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

      service.createPlatform = function(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId) {
        platformServiceApi.createPlatform(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId);
      };

      service.updatePlatform = function(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId) {
        platformServiceApi.updatePlatform(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm, clientId);
      };

      service.getCurrentPlatform = function() {
        return platformServiceData.currentPlatform;
      }

      service.setCurrentPlatform = function(platform) {
        platformServiceData.currentPlatform = platform;
      }

      return service;

    }
  ]
);
