app.service('deploymentServiceData', function() {
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
