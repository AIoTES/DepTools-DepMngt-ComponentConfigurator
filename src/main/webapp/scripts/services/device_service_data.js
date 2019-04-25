app.service('deviceServiceData', function() {
    var service = {
      devices: [],
      devicesByPlatformId: {},
      currentDevice: '',
      deviceLastValuesIds: [],
      deviceValues: {},
      deviceLastUpdate: ""
    }

    return service;
  }
);
