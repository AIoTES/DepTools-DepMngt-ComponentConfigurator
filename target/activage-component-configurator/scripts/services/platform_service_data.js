app.service('platformServiceData', function () {

  var retrievalStatus = Object.freeze({"NOT_STARTED": 0, "IN_PROGRESS": 1, "SUCCESS": 2, "FAILURE": 3});

  var service = {
    platforms: [],
    currentPlatformName: 'Filter by Platform',
    currentPlatform: {},
    platformsTypes: [],

    operationStatus: retrievalStatus,
    retrievalStatus: {
      platforms: retrievalStatus.NOT_STARTED
    },
    createStatus: retrievalStatus.NOT_STARTED,
    updateStatus: retrievalStatus.NOT_STARTED,
    deleteStatus: retrievalStatus.NOT_STARTED
  };

  return service;
});
