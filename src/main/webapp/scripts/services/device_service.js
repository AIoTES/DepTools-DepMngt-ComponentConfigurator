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

      service.getCurrentDevice = function () {
        return deviceServiceData.currentDevice;
      }

      service.setCurrentDevice = function (device) {
        deviceServiceData.currentDevice = device
      }

      service.getDevices = function () {
        return deviceServiceData.devices;
      }

      service.createDevice = function (deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation, clientId) {
        deviceServiceApi.createDevice(deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation, clientId)
          .then(
            function (response) {
              if (response.status === 200) {
                alert("Device created");
                $location.path('/main/component_configuration/component_view');
              }
            }
          )
      };

      service.updateDevice = function (deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation, clientId) {
        deviceServiceApi.updateDeployment(deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation, clientId);
      };

      service.deleteDevice = function (deviceId, clientId) {
        deviceServiceApi.deleteDevice(deviceId, clientId)
          .then(
            function (response) {
              if (response.status === 200) {
                alert("Device deleted");
                $location.path('/main/component_configuration/component_view');
              }
            }
          )
      };

      return service;
    }
  ]
);
