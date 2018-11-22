app.service('deviceService',
  ['deviceServiceApi', 'deviceServiceData',
    function (deviceServiceApi, deviceServiceData) {

      var service = {};

      service.retrieveDevices = function (idPlatform) {
        deviceServiceApi.getDevices(idPlatform)
          .then(
            function (response) {
              deviceServiceData.devices = response.data;
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.createDevice = function (deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation) {
        deviceServiceApi.createDevice(deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation);
      };

      service.updateDevice = function (deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation) {
        deviceServiceApi.updateDevice(deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation);
      };

      return service;
    }
  ]
);
