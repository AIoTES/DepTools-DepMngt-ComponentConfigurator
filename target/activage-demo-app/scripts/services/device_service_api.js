app.service('deviceServiceApi',
  ['$http', 'BACKEND_URL', 'CLIENT_ID',
    function ($http, BACKEND_URL, CLIENT_ID) {

      var service = {};

      service.getDevices = function (idPlatform) {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/devices?platformId=' + idPlatform,
          headers: {
            "Content-Type": "application/json",
            "Client-ID": CLIENT_ID
          }
        });
      };

      service.getDeviceValue = function (idDevice) {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/devices/simple/last/?deviceId=' + idDevice,
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.getDeviceOntology = function (idDevice) {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/devices/simple/last/?deviceId=' + idDevice,
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.getDeviceValue = function (idDevice) {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/devices/simple/last/?deviceId=' + idDevice,
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.createDevice = function (deviceTypes, deviceId, hostedBy, location, name, hosts, forProperty, madeActuation, implementsProcedure, observes, detects, madeObservation) {
        return $http({
          method: 'POST',
          url: BACKEND_URL + '/api/v1/devices/new',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": CLIENT_ID
          },
          data: '{"devices": [{"deviceTypes": ["' + deviceTypes + '"],"deviceId": "' + deviceId +'","hostedBy": "' + hostedBy + '","location": "' + location + '","name": "' + name + '","hosts": ["'+hosts+'"],"forProperty": "'+forProperty+'","madeActuation": "'+madeActuation+'","implementsProcedure": "'+implementsProcedure+'","observes": "'+observes+'","detects": "'+detects+'","madeObservation": "'+madeObservation+'"}]}'
        });
      };
      return service;
    }
  ]
);
