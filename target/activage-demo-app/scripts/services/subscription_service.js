/**
 * Created by JaviHop on 21/08/2018.
 */

app.service('subscriptionService', ['$routeParams', 'subscriptionServiceApi', 'subscriptionServiceData', function ($routeParams, subscriptionServiceApi, subscriptionServiceData) {

  var service = this;

  service.setSubscription = function (device) {
    if (!subscriptionServiceData.listSubscription.hasOwnProperty(device.deviceId))
      subscriptionServiceData.listSubscription[deviceId] = {};

    if (subscriptionServiceData.listSubscription[device.deviceId]) {
      subscriptionServiceApi.removeSubscription(subscriptionServiceData.subscriptionId);
      subscriptionServiceData.listSubscription[device.deviceId] = false;
    }
    else {
      subscriptionServiceApi.createSubscription(device.deviceId).then(function (response) {
        subscriptionServiceData.subscriptionId = response.data.conversationId;
        subscriptionServiceData.current_device = device.deviceId;
        service.route = $routeParams.id;
        subscriptionServiceData.listSubscription[device.deviceId] = true;
      }).catch(function (error) {
        console.log(error);
      });
    }
  };

  service.getSubscriptions = function (deviceId) {
    subscriptionServiceApi.getSubscription(deviceId).then( function(response) {
      if (!subscriptionServiceData.listSubscription.hasOwnProperty(deviceId))
        subscriptionServiceData.listSubscription[deviceId] = {};

      if (response.data.conversationId !== "") {
        subscriptionServiceData.current_device = deviceId;
        service.route = $routeParams.id;
        subscriptionServiceData.subscriptionId = response.data.conversationId;
        subscriptionServiceData.listSubscription[deviceId] = true;
      }
      else {
        subscriptionServiceData.subscriptionId = "";
        subscriptionServiceData.listSubscription[deviceId] = false;
      }
    }).catch(
      function (error) {
        console.log(error);
      }
    );
  };

  return service;

}]);
