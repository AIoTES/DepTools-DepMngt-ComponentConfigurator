appDev.service('devClients',
  ['$httpBackend', 'clients',
    function ($httpBackend, clients) {

      var service = {};

      service.retrieveClients = function () {
        $httpBackend.whenGET('/api/v1/clients').respond(
          function (method, url, data, headers) {
            console.log('retrieveClients → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(clients))]
          }
        );
      };

      service.setCurrentClient = function () {
        $httpBackend.whenPOST('/api/v1/clients/me').respond(
          function (method, url, data, headers) {
            console.log('setCurrentClient → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object({"clientId": "clientId"}))]
          }
        );
      };

      service.getCurrentClient = function () {
        $httpBackend.whenGET('/api/v1/clients/me').respond(
          function (method, url, data, headers) {
            console.log('getCurrentClient → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object({"clientId": "clientId"}))]
          }
        );
      };

      return service;
    }
  ]
);

appDev.value('clients',
  [
    {
      "clientId": "Oscar",
      "callbackUrl": "http://192.168.1.56:5678/api/v1/notify",
      "receivingCapacity": 5,
      "responseFormat": "JSON_LD",
      "responseDelivery": "SERVER_PUSH"
    },
    {
      "clientId": "Pedro",
      "callbackUrl": "http://192.168.1.56:5678/api/v1/notify",
      "receivingCapacity": 5,
      "responseFormat": "JSON_LD",
      "responseDelivery": "SERVER_PUSH"
    },
    {
      "clientId": "clientId",
      "callbackUrl": "http://callbackUrl",
      "pullMessagesLimit": 0,
      "responseFormat": "JSON_LD",
      "responseDelivery": "CLIENT_PULL"
    },
    {
      "clientId": "clientId2",
      "callbackUrl": "http://callbackUrl",
      "pullMessagesLimit": 0,
      "responseFormat": "JSON_LD",
      "responseDelivery": "CLIENT_PULL"
    },
    {
      "clientId": "clientId3",
      "callbackUrl": "http://callbackUrl",
      "pullMessagesLimit": 0,
      "responseFormat": "JSON_LD",
      "responseDelivery": "CLIENT_PULL"
    }
  ]
);
