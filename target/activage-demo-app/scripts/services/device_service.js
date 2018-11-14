app.service('deviceService',
  ['deviceServiceApi', '$q', 'subscriptionService', 'deviceServiceData',
    function (deviceServiceApi, $q, subscriptionService, deviceServiceData) {

      var service = {};

      service.retrieveDevices = function (idPlatform) {
        deviceServiceApi.getDevices(idPlatform)
          .then(
            function (response) {
              deviceServiceData.devices[idPlatform] = response.data;
              for (var i = 0; i < response.data.length; i++) {
                subscriptionService.getSubscriptions(response.data[i].deviceId);
              }
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.retrieveSimpleDeviceValues = function (deviceId) {
        deviceServiceApi.getDeviceValue(deviceId)
          .then(
            function (response) {
              if (!deviceServiceData.deviceValues.hasOwnProperty(deviceId))
                deviceServiceData.deviceValues[deviceId] = {"simple": [], "ontology": []};
              deviceServiceData.deviceValues[deviceId].simple.push(response.data);
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.retrieveOntologicDeviceValues = function (deviceId) {
        deviceServiceApi.getDeviceOntology(deviceId)
          .then(
            function (response) {
              if (!deviceServiceData.deviceValues.hasOwnProperty(deviceId))
                deviceServiceData.deviceValues[deviceId] = {"simple": [], "ontology": []};
              deviceServiceData.deviceValues[deviceId].ontology.push(response.data);
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

      return service;
    }
  ]
);
