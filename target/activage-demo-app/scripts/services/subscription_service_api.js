app.service('subscriptionServiceApi',
  ['$http', 'BACKEND_URL', 'CLIENT_ID',
    function ($http, BACKEND_URL, CLIENT_ID) {

      var service = {};

      service.getSubscriptions = function () {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/api/v1/subscriptions?clientId=' + CLIENT_ID,
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

      service.getSubscription = function (deviceId) {
        return $http({
          method: 'POST',
          url: BACKEND_URL + '/api/v1/subscriptions/prueba',
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            clientId: CLIENT_ID,
            deviceId: deviceId
          }
        });
      };

      service.createSubscription = function (deviceId) {
        return $http({
          method: 'POST',
          url: BACKEND_URL + '/api/v1/subscriptions',
          headers: {
            "Content-Type": "application/json",
            "Client-ID": CLIENT_ID
          },
          data: {
            deviceIds: [deviceId]
          }
        });
      };

      service.removeSubscription = function (conversationId) {
        return $http({
          method: 'DELETE',
          url: BACKEND_URL + '/api/v1/subscriptions/' + conversationId,
          headers: {
            "Content-Type": "application/json",
            "Client-ID": CLIENT_ID
          }
        });
      };
      return service;
    }
  ]
);
