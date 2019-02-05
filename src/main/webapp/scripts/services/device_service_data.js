app.service('deviceServiceData', function() {
    var service = {
      devices: [],
      currentDevice: '',
      deviceLastValuesIds: [],
      deviceValues: {},
      deviceLastUpdate: ""
    }

    return service;
  }
);
