app.service('recordServiceData',
  function () {

    var retrievalStatus = Object.freeze({"NOT_STARTED": 0, "IN_PROGRESS": 1, "SUCCESS": 2, "FAILURE": 3});

    var service = {
      records: [],
      currentRecord: '',
      recordsById: {},
      recordsByElementId: {},
      selectedElementId: "",

      operationStatus: retrievalStatus,
      retrievalStatus: {},
      deletesStatus: {},
      createStatus: retrievalStatus.NOT_STARTED,
      updateStatus: retrievalStatus.NOT_STARTED,
      deleteStatus: retrievalStatus.NOT_STARTED
    };

    return service;
  }
);
