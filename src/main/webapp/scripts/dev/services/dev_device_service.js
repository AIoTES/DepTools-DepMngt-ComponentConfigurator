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
      "deviceId": "deviceId1",
      "hostedBy": "hostedBy1",
      "location": "location1",
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
      "deviceId": "deviceId2",
      "hostedBy": "hostedBy2",
      "location": "location2",
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
      "deviceId": "deviceId3",
      "hostedBy": "hostedBy3",
      "location": "location3",
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
      "deviceId": "deviceId4",
      "hostedBy": "hostedBy4",
      "location": "location4",
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
