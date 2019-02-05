app.service('clientServiceData', function () {
    var retrievalStatus = Object.freeze({"NOT_STARTED": 0, "IN_PROGRESS": 1, "SUCCESS": 2, "FAILURE": 3});

    var service = {
      clients: [],

      currentClient: '',
      currentClientId: '',

      retrievalStatus: retrievalStatus,
      clientStatus: retrievalStatus.NOT_STARTED
    };

    return service;
  }
);
