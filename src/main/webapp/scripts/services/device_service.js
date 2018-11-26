app.service('deviceService',
  ['deviceServiceApi', 'deviceServiceData',
    function (deviceServiceApi, deviceServiceData) {

      var service = {};

      service.retrieveDevices = function (idPlatform, clientId) {
        deviceServiceApi.getDevices(idPlatform, clientId)
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

      service.getCurrentDevice = function() {
        return deviceServiceData.currentDevice;
      }

      service.setCurrentDevice = function(device) {
        deviceServiceData.currentDevice = device
      }

      service.getDevices = function() {
        return deviceServiceData.devices;
      }

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
