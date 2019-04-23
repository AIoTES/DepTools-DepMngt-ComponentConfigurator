appDev.service('devPlatforms',
  ['$httpBackend', 'platforms', 'platformTypes',
    function ($httpBackend, platforms, platformTypes) {

      var service = {};

      service.retrievePlatforms = function () {
        $httpBackend.whenGET('/api/v1/platforms').respond(
          function (method, url, data, headers) {
            console.log('retrievePlatforms → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(platforms))]
          }
        );
      };

      service.retrievePlatformTypes = function () {
        $httpBackend.whenGET('/api/v1/platforms/platform-types').respond(
          function (method, url, data, headers) {
            console.log('retrievePlatformTypes → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(platformTypes))]
          }
        );
      };

      service.retrieveTypes = function () {
        $httpBackend.whenGET('/api/v1/platforms/types').respond(
          function (method, url, data, headers) {
            console.log('retrieveTypes → Received: ', method, url, data, headers);
            return [200, angular.fromJson(["FIWARE", "UniversAAL", "MWTestPlatform"])]
          }
        );
      };

      service.createPlatform = function () {
        $httpBackend.whenPOST('/api/v1/platforms').respond(
          function (method, url, data, headers) {
            var platform = JSON.parse(data);
            console.log('retrieveTypes → Received: ', method, url, data, headers);
            return [200,
              angular.fromJson({
                  "platformId": platform.platformId,
                  "type": platform.type,
                  "baseEndpoint": platform.baseEndpoint,
                  "location": platform.location,
                  "name": platform.name,
                  "clientId": platform.clientId,
                  "username": platform.username,
                  "downstreamInputAlignmentName": platform.downstreamInputAlignmentName,
                  "downstreamInputAlignmentVersion": platform.downstreamInputAlignmentVersion,
                  "downstreamOutputAlignmentName": platform.downstreamOutputAlignmentName,
                  "downstreamOutputAlignmentVersion": platform.downstreamOutputAlignmentVersion,
                  "upstreamInputAlignmentName": platform.upstreamInputAlignmentName,
                  "upstreamInputAlignmentVersion": platform.upstreamInputAlignmentVersion,
                  "upstreamOutputAlignmentName": platform.upstreamOutputAlignmentName,
                  "upstreamOutputAlignmentVersion": platform.upstreamOutputAlignmentVersion
                }
              )
            ]
          }
        );
      };

      service.deletePlatform = function () {
        $httpBackend.whenDELETE(/\/api\/v1\/platforms\?platformId=.*/).respond(
          function (method, url, data, headers) {
            console.log('retrieveTypes → Received: ', method, url, data, headers);
            return [204]
          }
        );
      };

      service.updatePlatform = function () {
        $httpBackend.whenPUT(/\/api\/v1\/platforms\?platformId=.*/).respond(
          function (method, url, data, headers) {
            console.log('retrieveTypes → Received: ', method, url, data, headers);
            return [200, data]
          }
        );
      };

      return service;
    }
  ]
);

appDev.value('platforms',
  [
    {
      "platformId": "http://example.inter-iot.eu/platforms/UAAL",
      "type": "http://inter-iot.eu/UniversAAL",
      "baseEndpoint": "http://172.17.0.1:4568",
      "location": "http://test.inter-iot.eu/TestLocation",
      "name": "UniversAAL",
      "clientId": "http://inter-iot.eu/clients#Oscar",
      "username": "",
      "downstreamInputAlignmentName": "",
      "downstreamInputAlignmentVersion": "",
      "downstreamOutputAlignmentName": "",
      "downstreamOutputAlignmentVersion": "",
      "upstreamInputAlignmentName": "",
      "upstreamInputAlignmentVersion": "",
      "upstreamOutputAlignmentName": "",
      "upstreamOutputAlignmentVersion": ""
    },
    {
      "platformId": "http://example.inter-iot.eu/platforms/UAAL2",
      "type": "http://inter-iot.eu/UniversAAL",
      "baseEndpoint": "http://172.17.0.1:4568",
      "location": "http://test.inter-iot.eu/TestLocation",
      "name": "UniversAAL2",
      "clientId": "http://inter-iot.eu/clients#Oscar",
      "username": "",
      "downstreamInputAlignmentName": "",
      "downstreamInputAlignmentVersion": "",
      "downstreamOutputAlignmentName": "",
      "downstreamOutputAlignmentVersion": "",
      "upstreamInputAlignmentName": "",
      "upstreamInputAlignmentVersion": "",
      "upstreamOutputAlignmentName": "",
      "upstreamOutputAlignmentVersion": ""
    },
    {
      "platformId": "http://example.inter-iot.eu/platforms/UAAL3",
      "type": "http://inter-iot.eu/UniversAAL",
      "baseEndpoint": "http://172.17.0.1:4568",
      "location": "http://test.inter-iot.eu/TestLocation",
      "name": "UniversAAL3",
      "clientId": "http://inter-iot.eu/clients#Oscar",
      "username": "",
      "downstreamInputAlignmentName": "",
      "downstreamInputAlignmentVersion": "",
      "downstreamOutputAlignmentName": "",
      "downstreamOutputAlignmentVersion": "",
      "upstreamInputAlignmentName": "",
      "upstreamInputAlignmentVersion": "",
      "upstreamOutputAlignmentName": "",
      "upstreamOutputAlignmentVersion": ""
    },
    {
      "platformId": "http://example.inter-iot.eu/platforms/UAAL4",
      "type": "http://inter-iot.eu/UniversAAL",
      "baseEndpoint": "http://172.17.0.1:4568",
      "location": "http://test.inter-iot.eu/TestLocation",
      "name": "UniversAAL4",
      "clientId": "http://inter-iot.eu/clients#Oscar",
      "username": "",
      "downstreamInputAlignmentName": "",
      "downstreamInputAlignmentVersion": "",
      "downstreamOutputAlignmentName": "",
      "downstreamOutputAlignmentVersion": "",
      "upstreamInputAlignmentName": "",
      "upstreamInputAlignmentVersion": "",
      "upstreamOutputAlignmentName": "",
      "upstreamOutputAlignmentVersion": ""
    }
  ]
);

appDev.value('platformTypes',
  {
    "conversationId": "convd02015df-8b6a-4bef-a900-db2e863457bc"
  }
);
