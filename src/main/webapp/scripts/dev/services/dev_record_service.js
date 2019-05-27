appDev.service('devRecord',
  ['$httpBackend', 'records',
    function ($httpBackend, records) {

      var service = {};

      service.retrieveRecordsByElement = function () {
        $httpBackend.whenGET(/\/api\/v1\/records\/element\/.*/).respond(
          function (method, url, data, headers) {
            console.log('retrieveDevices → Received: ', method, url, data, headers);
            var urlArray = url.split("/");
            var elementId = urlArray[urlArray.length - 1];

            records.forEach(
              function (record) {
                record.elementId = elementId;
              }
            );

            return [200, angular.fromJson(clone_object(records))]
          }
        );
      };

      service.updateRecord = function () {
        $httpBackend.whenPUT("/api/v1/records").respond(
          function (method, url, data, headers) {
            console.log('updateDevice → Received: ', method, url, data, headers);
            return [200, data]
          }
        );
      };

      service.createRecord = function () {
        $httpBackend.whenPOST("/api/v1/records").respond(
          function (method, url, data, headers) {
            console.log('createRecord → Received: ', method, url, data, headers);
            var record = JSON.parse(data);
            return [200, {
              "id": 10,
              "elementId": record.elementId,
              "description": record.description,
              "status": record.status,
              "type": record.type,
              "timestamp": 0
            }]
          }
        );
      };

      service.deleteRecord = function () {
        $httpBackend.whenDELETE(/\/api\/v1\/records\/.*\/element\/.*/).respond(
          function (method, url, data, headers) {
            console.log('deleteRecord → Received: ', method, url, data, headers);
            return [204]
          }
        );
      };

      return service;
    }
  ]
);

appDev.value('records',
  [
    {
      "id": 1,
      "elementId": "http://deviceId2",
      "description": "Device FibaroSmartDevice sending anamalous values",
      "status": "pending",
      "type": "note",
      "timestamp": 0
    },
    {
      "id": 2,
      "elementId": "http://deviceId2",
      "description": "Device SmartIlluminance not connected",
      "status": "completed",
      "type": "issue",
      "timestamp": 0
    },
    {
      "id": 3,
      "elementId": "http://deviceId2",
      "description": "Update service to latest version",
      "status": "completed",
      "type": "todo",
      "timestamp": 0
    }
  ]
);
