app.service('deviceServiceApi',
  ['$http', 'BACKEND_URL',
    function ($http, BACKEND_URL) {

      var service = {};

      service.getDevices = function (idPlatform, clientId) {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/devices?platformId=' + idPlatform,
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          }
        });
      };

      service.createDevice = function (deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation, clientId) {
        return $http({
          method: 'POST',
          url: BACKEND_URL + '/api/v1/devices/new',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          },
          data: {
            "devices": [
              {
                "deviceTypes": [deviceTypes],
                "deviceId": deviceId,
                "hostedBy": hostedBy,
                "location": location,
                "name": name,
                "hosts": [hosts],
                "forProperty": forProperty,
                "madeActuation": madeActuation,
                "implementsProcedure": implementsProcedure,
                "observes": observes,
                "detects": detects,
                "madeObservation": madeObservation
              }
            ]
          }
        });
      };

      service.updateDevice = function (deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation, clientId) {
        return $http({
          method: 'PUT',
          url: BACKEND_URL + '/api/v1/devices?deviceId=' + deviceId,
          headers: {
            "Content-Type": "application/json",
            "Client-ID": clientId
          },
          data: {
            "deviceTypes": [deviceTypes],
            "deviceId": deviceId,
            "hostedBy": hostedBy,
            "location": location,
            "name": name,
            "hosts": [hosts],
            "forProperty": forProperty,
            "madeActuation": madeActuation,
            "implementsProcedure": implementsProcedure,
            "observes": observes,
            "detects": detects,
            "madeObservation": madeObservation
          }
        });
      };
      return service;
    }
  ]
);
