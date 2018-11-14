/**
 * Created by JaviHop on 21/08/2018.
 */

app.service('platformService',
  ['platformServiceApi', 'platformServiceData',
    function (platformServiceApi, platformServiceData) {

      var service = this;

      service.retrievePlatforms = function () {
        platformServiceApi.getPlatforms()
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

      service.createPlatform = function(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm) {
        platformServiceApi.createPlatform(platformId, type, baseEndpoint, location, name, username, encryptedPassword, encryptionAlgorithm);
      };

      return service;

    }
  ]
);
