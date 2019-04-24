appDev.service('devDeployment',
  ['$httpBackend', 'deployments',
    function ($httpBackend, deployments) {

      var service = {};

      // Esto es un ejemplo, eliminar cuando se entienda y se completen el resto de funciones
      service.retrieveDevices = function () {
        $httpBackend.whenGET(/\/api\/v1\/devices\?platformId=.*/).respond(
          function (method, url, data, headers) {
            console.log('retrieveDevices → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(devices))]
          }
        );
      };

      service.retrieveDeployments = function () {
        $httpBackend.whenGET('/api/v1/deployments').respond(
          function (method, url, data, headers) {
            console.log('retrieveDeployments → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(deployments))]
          }
        );
      };

      service.createDeployment = function () {
        $httpBackend.whenPOST('/api/v1/deployments').respond(
          function (method, url, data, headers) {
            var deployment = JSON.parse(data);
            console.log('retrieveTypes → Received: ', method, url, data, headers);
            return [200,
              angular.fromJson({
                  "id": deployment.id,
                  "date": deployment.date,
                  "location": deployment.location,
                  "organization": deployment.organization,
                  "platform": deployment.platform
                }
              )
            ]
          }
        );
      };

      service.getDeploymentById = function () {

      };

      service.deleteDeploymentById = function () {
        $httpBackend.whenDELETE(/\/api\/v1\/deployments\/.*/).respond(
          function (method, url, data, headers) {
            console.log('deleteDeployment → Received: ', method, url, data, headers);
            return [204]
          }
        );
      };

      service.getDeploymentHistoricById = function () {

      };

      service.addDeviceToDeployment = function () {

      };

      service.deleteDeviceFromDeployment = function () {

      };

      service.retrieveDevices = function () {

      };

      return service;
    }
  ]
);

appDev.value('deployments',
  [
    {
      "id": "deployment1",
      "date": "\"2017-06-06\"^^xsd:date",
      "location": "\"AREA[“Thessaloniki\"]\"^^http://www.opengis.net/ont/geosparql#wktLiteral",
      "organization": {
        "id": "organization1",
        "label": "\"Municipality of Thessaloniki.\""
      },
      "platform": {
        "id": "platform1",
        "label": "\"Activage Platform GR 1\"",
        "devices": [
          "device1"
        ]
      }
    },
    {
      "id": "deployment2",
      "date": "\"2017-06-06\"^^xsd:date",
      "location": "\"AREA[“Thessaloniki2\"]\"^^http://www.opengis.net/ont/geosparql#wktLiteral",
      "organization": {
        "id": "organization2",
        "label": "\"Municipality of Thessaloniki2.\""
      },
      "platform": {
        "id": "platform2",
        "label": "\"Activage Platform GR 2\"",
        "devices": [
          "device2",
          "device3"
        ]
      }
    },
    {
      "id": "deployment3",
      "date": "\"2017-06-06\"^^xsd:date",
      "location": "\"AREA[“Thessaloniki3\"]\"^^http://www.opengis.net/ont/geosparql#wktLiteral",
      "organization": {
        "id": "organization3",
        "label": "\"Municipality of Thessaloniki3.\""
      },
      "platform": {
        "id": "platform3",
        "label": "\"Activage Platform GR 3\"",
        "devices": [
          "device4"
        ]
      }
    }
  ]
);
