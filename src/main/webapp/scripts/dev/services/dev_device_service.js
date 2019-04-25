appDev.service('devDevices',
  ['$httpBackend', 'devices',
    function ($httpBackend, devices) {

      var service = {};

      service.retrieveDevices = function () {
        $httpBackend.whenGET(/\/api\/v1\/devices\?platformId=.*/).respond(
          function (method, url, data, headers) {
            console.log('retrieveDevices → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(devices))]
          }
        );
      };

      service.updateDevice = function () {
        $httpBackend.whenPUT("/api/v1/devices").respond(
          function (method, url, data, headers) {
            console.log('updateDevice → Received: ', method, url, data, headers);
            return [200, data]
          }
        );
      };

      service.createDevice = function () {
        $httpBackend.whenPOST("/api/v1/devices").respond(
          function (method, url, data, headers) {
            console.log('createDevice → Received: ', method, url, data, headers);
            return [200, data]
          }
        );
      };

      service.deleteDevice = function () {
        $httpBackend.whenDELETE(/\/api\/v1\/devices\?deviceId=.*/).respond(
          function (method, url, data, headers) {
            console.log('retrieveTypes → Received: ', method, url, data, headers);
            return [204]
          }
        );
      };

      return service;
    }
  ]
);

appDev.value('devices',
  [
    {
      "deviceTypes": [
        "DEVICE"
      ],
      "deviceId": "http://deviceId1",
      "hostedBy": "http://example.inter-iot.eu/platforms/UAAL",
      "location": "http://location1",
      "name": "device1",
      "hosts": [
        "hosts"
      ],
      "forProperty": [
        "property"
      ],
      "madeActuation": "madeActuation",
      "implementsProcedure": "conMuchoGusto",
      "observes": [
        "loObservable"
      ],
      "detects": "loDetectable",
      "madeObservation": "aTopeDePotencia"
    },
    {
      "deviceTypes": [
        "DEVICE"
      ],
      "deviceId": "http://deviceId2",
      "hostedBy": "http://example.inter-iot.eu/platforms/UAAL",
      "location": "http://location2",
      "name": "device2",
      "hosts": [
        "hosts"
      ],
      "forProperty": [
        "property"
      ],
      "madeActuation": "madeActuation",
      "implementsProcedure": "conMuchoGusto",
      "observes": [
        "loObservable"
      ],
      "detects": "loDetectable",
      "madeObservation": "aTopeDePotencia"
    },
    {
      "deviceTypes": [
        "DEVICE"
      ],
      "deviceId": "http://deviceId3",
      "hostedBy": "http://example.inter-iot.eu/platforms/UAAL",
      "location": "http://location3",
      "name": "device3",
      "hosts": [
        "hosts"
      ],
      "forProperty": [
        "property"
      ],
      "madeActuation": "madeActuation",
      "implementsProcedure": "conMuchoGusto",
      "observes": [
        "loObservable"
      ],
      "detects": "loDetectable",
      "madeObservation": "aTopeDePotencia"
    },
    {
      "deviceTypes": [
        "DEVICE"
      ],
      "deviceId": "http://deviceId4",
      "hostedBy": "http://example.inter-iot.eu/platforms/UAAL",
      "location": "http://location4",
      "name": "device4",
      "hosts": [
        "hosts"
      ],
      "forProperty": [
        "property"
      ],
      "madeActuation": "madeActuation",
      "implementsProcedure": "conMuchoGusto",
      "observes": [
        "loObservable"
      ],
      "detects": "loDetectable",
      "madeObservation": "aTopeDePotencia"
    }
  ]
);
