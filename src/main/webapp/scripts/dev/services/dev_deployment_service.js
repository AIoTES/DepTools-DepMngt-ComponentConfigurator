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

      };

      service.createDeployment = function () {

      };

      service.getDeploymentById = function () {

      };

      service.deleteDeploymentById = function () {

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
    {}
  ]
);
