appDev.service('devDeployment',
  ['$httpBackend', 'deployments', 'deployment', 'deploymentDevices',
    function ($httpBackend, deployments, deployment, deploymentDevices) {

      var service = {};

      service.retrieveDevices = function () {
        $httpBackend.whenGET('/api/v1/deployments/devices').respond(
          function (method, url, data, headers) {
            console.log('retrieveDevices → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(deploymentDevices))]
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
            console.log('createDeployment → Received: ', method, url, data, headers);
            return [200,
              angular.fromJson({
                  "id": deployment.id,
                  "date": deployment.date,
                  "location": deployment.location,
                  "organization": deployment.organization,
                  "platform": deployment.platform
              })
            ]
          }
        );
      };

      service.getDeploymentById = function () {
        $httpBackend.whenGET(/\/api\/v1\/deployments\/.*/).respond(
          function (method, url, data, headers) {
            console.log('getDeploymentById → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(deployment))]
          }
        );
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
        $httpBackend.whenPUT(/\/api\/v1\/deployments\/.*\/devices\/.*/).respond(
          function (method, url, data, headers) {
            console.log('addDeviceToDeployment → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(deployment))]
          }
        );
      };

      service.deleteDeviceFromDeployment = function () {
        $httpBackend.whenDELETE(/\/api\/v1\/deployments\/.*\/devices\/.*/).respond(
          function (method, url, data, headers) {
            console.log('deleteDeviceFromDeployment → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(deployment))]
          }
        );
      };

      return service;
    }
  ]
);

appDev.value('deployment',
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
    }
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
    }
  ]
);

appDev.value('deploymentDevices',
  [
    {
      "id": "1_1",
      "label": "IoTDevice1",
      "type": "Fibaro motion sensor",
      "sensors": [
        {
          "id": "1_1",
          "type": "IlluminanceSensor"
        },
        {
          "id": "1_2",
          "type": "TemperatureSensor"
        },
        {
          "id": "1_3",
          "type": "UserOccupancySensor ."
        }
      ]
    },
    {
      "id": "2_1",
      "label": "IoTDevice2",
      "type": "Fibaro motion sensor",
      "sensors": [
        {
          "id": "2_1 ",
          "type": "IlluminanceSensor"
        },
        {
          "id": "2_2 ",
          "type": "TemperatureSensor ."
        }
      ]
    },
    {
      "id": "3_1",
      "label": "IoTDevice3",
      "type": "Fibaro motion sensor",
      "sensors": [
        {
          "id": "3_1 ",
          "type": "IlluminanceSensor ."
        }
      ]
    }
  ]
);
