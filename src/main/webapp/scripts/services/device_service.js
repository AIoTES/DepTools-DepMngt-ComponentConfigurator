app.service('deviceService',
  ['deviceServiceApi', 'deviceServiceData', 'clientServiceData', '$location',
    function (deviceServiceApi, deviceServiceData, clientServiceData, $location) {

      var service = {};

      service.retrieveDevices = function (platformId) {
        deviceServiceApi.getDevices(platformId, clientServiceData.currentClientId)
          .then(
            function (response) {
              deviceServiceData.devicesByPlatformId[platformId] = response.data;
              deviceServiceData.devices = response.data;
            }
          )
          .catch(
            function () {
              console.log("Cannot retrieve devices");
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

      service.createDevice = function (deviceToCreate) {
        deviceServiceApi.createDevice(deviceToCreate, clientServiceData.currentClientId)
          .then(
            function () {
              if (!deviceServiceData.devicesByPlatformId.hasOwnProperty(deviceToCreate.hostedBy))
                deviceServiceData.devicesByPlatformId[deviceToCreate.hostedBy] = [];
              deviceServiceData.devicesByPlatformId[deviceToCreate.hostedBy].push(deviceToCreate);
            }
          )
      };

      service.updateDevice = function (deviceToUpdate, platformId) {
        deviceServiceApi.updateDevice(deviceToUpdate, clientServiceData.currentClientId)
          .then(
            function (response) {
              var deviceUpdated = response.data;

              var deviceIndex = deviceServiceData.devicesByPlatformId[platformId].findIndex(
                function (device) {
                  return device.deviceId === deviceToUpdate.deviceId;
                }
              );

              if (deviceIndex !== -1) {
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].deviceTypes = deviceUpdated.deviceTypes;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].hostedBy = deviceUpdated.hostedBy;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].location = deviceUpdated.location;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].name = deviceUpdated.name;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].hosts = deviceUpdated.hosts;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].forProperty = deviceUpdated.forProperty;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].madeActuation = deviceUpdated.madeActuation;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].implementsProcedure = deviceUpdated.implementsProcedure;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].observes = deviceUpdated.observes;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].detects = deviceUpdated.detects;
                deviceServiceData.devicesByPlatformId[platformId][deviceIndex].madeObservation = deviceUpdated.madeObservation;
              }

            }
          )
          .catch(
            function () {
              console.log("Cannot update device");
            }
          );
      };

      service.deleteDevice = function (deviceId, platformId) {
        deviceServiceApi.deleteDevice(deviceId, clientServiceData.currentClientId)
          .then(
            function () {
              var deviceIndex = deviceServiceData.devicesByPlatformId[platformId].findIndex(
                function (device) {
                  return device.deviceId === deviceId;
                }
              );

              if (deviceIndex !== -1)
                deviceServiceData.devicesByPlatformId[platformId].splice(deviceIndex, 1);

            }
          )
          .catch(
            function (reason) {

            }
          )
      };

      return service;
    }
  ]
);
