app.service('deploymentServiceData', function () {

    var retrievalStatus = Object.freeze({"NOT_STARTED": 0, "IN_PROGRESS": 1, "SUCCESS": 2, "FAILURE": 3});

    var service = {
      deployments: [],
      currentDeployment: '',
      deploymentDevices: [],
      notDeploymentDevicesSelected: [],
      selected: 'deployment',

      operationStatus: retrievalStatus,
      retrievalStatus: {
        deployments: retrievalStatus.NOT_STARTED,
        devices: retrievalStatus.NOT_STARTED
      },
      removeDeviceStatus: [],
      addStatus: [],
      createStatus: retrievalStatus.NOT_STARTED,
      updateStatus: retrievalStatus.NOT_STARTED,
      deleteStatus: retrievalStatus.NOT_STARTED
    };

    return service;
  }
);
