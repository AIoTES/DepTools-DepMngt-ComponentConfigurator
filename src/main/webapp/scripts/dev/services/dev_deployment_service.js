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
            deployments.push(deployment);
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
            var urlAsArray = url.split("/");

            var deploymentIndex = deployments.findIndex(
              function (element) {
                return element.id === urlAsArray[4];
              }
            );

            if (deploymentIndex !== -1)
              deployments.splice(urlAsArray[0], 1);

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
            var urlAsArray = url.split("/");

            var deploymentIndex = deployments.findIndex(
              function (element) {
                return element.id === urlAsArray[4];
              }
            );

            if (deploymentIndex !== -1)
              deployments[deploymentIndex].platform.devices.push(urlAsArray[6]);

            return [200, angular.fromJson(clone_object(deployments[deploymentIndex]))]
          }
        );
      };

      service.deleteDeviceFromDeployment = function () {
        $httpBackend.whenDELETE(/\/api\/v1\/deployments\/.*\/devices\/.*/).respond(
          function (method, url, data, headers) {
            console.log('deleteDeviceFromDeployment → Received: ', method, url, data, headers);
            var urlAsArray = url.split("/");

            var deploymentIndex = deployments.findIndex(
              function (element) {
                return element.id === urlAsArray[4];
              }
            );

            if (deploymentIndex !== -1) {

              var deviceIndex = deployments[deploymentIndex].platform.devices.findIndex(
                function (element) {
                  return element === urlAsArray[6];
                }
              );

              if (deviceIndex !== -1)
                deployments[deploymentIndex].platform.devices.splice(deviceIndex, 1);

            }

            return [200, angular.fromJson(clone_object(deployments[deploymentIndex]))];
          }
        );
      };

      return service;
    }
  ]
);

appDev.value('deployment',
  {
    "id": "PersonalHome_DeploymentInstallation",
    "date": "\"2017-06-06\"^^xsd:date",
    "location": "\"AREA[“Thessaloniki\"]\"^^http://www.opengis.net/ont/geosparql#wktLiteral",
    "organization": {
      "id": "Organization1",
      "label": "\"Municipality of Thessaloniki.\""
    },
    "platform": {
      "id": "UniversAAL_Platform",
      "label": "\"Activage Platform GR 1\"",
      "devices": [
        "FibaroSmartDevice"
      ]
    }
  }
);

appDev.value('deployments',
  [
    {
      "id": "PersonalHome_DeploymentInstallation",
      "date": "\"2017-06-06\"^^xsd:date",
      "location": "\"AREA[“Thessaloniki\"]\"^^http://www.opengis.net/ont/geosparql#wktLiteral",
      "organization": {
        "id": "Organization1",
        "label": "\"Municipality of Thessaloniki.\""
      },
      "platform": {
        "id": "UniversAAL_Platform",
        "label": "\"Activage Platform GR 1\"",
        "devices": [
          "FibaroSmartDevice"
        ]
      }
    },
    {
      "id": "Custom_DeploymentInstallation",
      "date": "\"2017-06-06\"^^xsd:date",
      "location": "\"AREA[“Thessaloniki2\"]\"^^http://www.opengis.net/ont/geosparql#wktLiteral",
      "organization": {
        "id": "Organization2",
        "label": "\"Municipality of Thessaloniki2.\""
      },
      "platform": {
        "id": "Fiware_Platform",
        "label": "\"Activage Platform GR 2\"",
        "devices": [
          "SmartIlluminance",
          "IlluminanceDevice"
        ]
      }
    }
  ]
);

appDev.value('deploymentDevices',
  [
    {
      "id": "FibaroSmartDevice",
      "label": "IoTDevice",
      "type": "Fibaro motion sensor",
      "sensors": [
        {
          "id": "Illuminance1",
          "type": "IlluminanceSensor"
        },
        {
          "id": "Temperature1",
          "type": "TemperatureSensor"
        },
        {
          "id": "Occupancy1",
          "type": "UserOccupancySensor ."
        }
      ]
    },
    {
      "id": "SmartIlluminance",
      "label": "IoTIlluminance",
      "type": "Fibaro motion sensor",
      "sensors": [
        {
          "id": "Illuminance2",
          "type": "IlluminanceSensor"
        },
        {
          "id": "Temperature2",
          "type": "TemperatureSensor"
        }
      ]
    },
    {
      "id": "IlluminanceDevice",
      "label": "IlluminanceDevice",
      "type": "Fibaro motion sensor",
      "sensors": [
        {
          "id": "Illuminance3",
          "type": "IlluminanceSensor"
        }
      ]
    }
  ]
);
