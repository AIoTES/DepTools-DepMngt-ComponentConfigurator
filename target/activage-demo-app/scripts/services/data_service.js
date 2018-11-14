/**
 * Created by JaviHop on 21/08/2018.
 */

app.service('dataService', ['LIST_OF_DEVICES', '$location', function (LIST_OF_DEVICES, $location) {

  var service = this;

  service.current_device = "";

  service.go_to_device = function (device) {
    if (device.hasOwnProperty("deviceId")) {
      service.current_device = device;
      $location.path('/main/device_manager/' + device.deviceId);
    }
    else {
      LIST_OF_DEVICES.forEach(function (element) {
        if (element.deviceId === device) {
          service.current_device = element;
        }
      });

      $location.path('/main/device_manager/' + device);
    }
  };

  return service;

}]);
