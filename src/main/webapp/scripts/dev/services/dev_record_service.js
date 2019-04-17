appDev.service('devRecords',
  ['$httpBackend', 'records', function ($httpBackend, records) {

    var service = {
      id: 0
    };

    service.retrieveRecords = function () {
      $httpBackend.whenGET(/\/api\/v1\/records\/element\/.*/).respond(
        function (method, url, data, headers) {
          console.log('Received All Clients Connected: ', method, url, data, headers);
          var arrayUrl = url.split("/");
          var elementId = arrayUrl[arrayUrl.length];
          var cloned_records = clone_object(records);
          cloned_records.forEach(
            function (value) {
              value.elementId = elementId;
            }
          );

          return [200, angular.fromJson(cloned_records)]
        }
      );
    };

    service.createRecord = function () {
      $httpBackend.whenPOST('/api/v1/records').respond(
        function (method, url, data, headers) {
          console.log('Received All Clients Connected: ', method, url, data, headers);
          return [200,
            angular.fromJson(
              clone_object(clients_connected)
            )
          ]
        }
      );
    };

    service.updateRecord = function () {

    };

    service.deleteRecord = function () {

    };

    return service;
  }
  ]
);

appDev.value('records',
  {
    "id": 1,
    "elementId": "elementId",
    "description": "description1",
    "status": "pending",
    "type": "note",
    "timestamp": 1555316554106
  },
  {
    "id": 2,
    "elementId": "elementId",
    "description": "description2",
    "status": "pending",
    "type": "issue",
    "timestamp": 1555316554106
  },
  {
    "id": 3,
    "elementId": "elementId",
    "description": "description3",
    "status": "completed",
    "type": "todo",
    "timestamp": 1555316554106
  }
);
