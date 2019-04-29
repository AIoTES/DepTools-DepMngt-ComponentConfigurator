app.service('deviceService',
  ['deviceServiceApi', 'deviceServiceData', 'clientServiceData', '$location',
    function (deviceServiceApi, deviceServiceData, clientServiceData, $location) {

      var service = {};

      service.retrieveDevices = function (platformId) {
        deviceServiceData.retrievalStatus["devices"] = deviceServiceData.operationStatus.IN_PROGRESS;
        deviceServiceApi.getDevices(platformId, clientServiceData.currentClientId)
          .then(
            function (response) {
              deviceServiceData.devicesByPlatformId[platformId] = response.data;
              deviceServiceData.devices = response.data;
              deviceServiceData.retrievalStatus["devices"] = deviceServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              console.log("Cannot retrieve devices");
              deviceServiceData.retrievalStatus["devices"] = deviceServiceData.operationStatus.FAILURE;
            }
          );
      };

      service.getCurrentDevice = function () {
        return deviceServiceData.currentDevice;
      };

      service.setCurrentDevice = function (device) {
        deviceServiceData.currentDevice = device
      };

      service.getDevices = function () {
        return deviceServiceData.devices;
      };

      service.createDevice = function (deviceToCreate) {
        deviceServiceData.createStatus = deviceServiceData.operationStatus.IN_PROGRESS;
        deviceServiceApi.createDevice(deviceToCreate, clientServiceData.currentClientId)
          .then(
            function () {
              if (!deviceServiceData.devicesByPlatformId.hasOwnProperty(deviceToCreate.hostedBy))
                deviceServiceData.devicesByPlatformId[deviceToCreate.hostedBy] = [];
              deviceServiceData.devicesByPlatformId[deviceToCreate.hostedBy].push(deviceToCreate);
              deviceServiceData.createStatus = deviceServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              console.log("Cannot retrieve devices");
              deviceServiceData.createStatus = deviceServiceData.operationStatus.FAILURE;
            }
          );
      };

      service.updateDevice = function (deviceToUpdate, platformId) {
        deviceServiceData.updateStatus = deviceServiceData.operationStatus.IN_PROGRESS;
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

              deviceServiceData.updateStatus = deviceServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              console.log("Cannot update device");
              deviceServiceData.updateStatus = deviceServiceData.operationStatus.FAILURE;
            }
          );
      };

      service.deleteDevice = function (deviceId, platformId) {
        deviceServiceData.deleteStatus = deviceServiceData.operationStatus.IN_PROGRESS;
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
              deviceServiceData.deleteStatus = deviceServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function (reason) {
              console.log(reason);
              deviceServiceData.deleteStatus = deviceServiceData.operationStatus.FAILURE;
            }
          )
      };

      return service;
    }
  ]
);
