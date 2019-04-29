app.service('deviceServiceData', function() {

  var retrievalStatus = Object.freeze({"NOT_STARTED": 0, "IN_PROGRESS": 1, "SUCCESS": 2, "FAILURE": 3});

  var service = {
    devices: [],
    devicesByPlatformId: {},
    currentDevice: '',
    deviceLastValuesIds: [],
    deviceValues: {},
    deviceLastUpdate: "",

    operationStatus: retrievalStatus,
    retrievalStatus: {
      devices: retrievalStatus.NOT_STARTED
    },
    createStatus: retrievalStatus.NOT_STARTED,
    updateStatus: retrievalStatus.NOT_STARTED,
    deleteStatus: retrievalStatus.NOT_STARTED

  };

    return service;
  }
);
