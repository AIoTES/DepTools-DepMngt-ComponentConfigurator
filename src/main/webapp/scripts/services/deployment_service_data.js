app.service('deploymentServiceData', function() {
    var service = {
      deployments: [],
      currentDeployment: '',
      deploymentDevices: new Map(),
      currentDeploymentDevices: []
    };

    return service;
  }
);
