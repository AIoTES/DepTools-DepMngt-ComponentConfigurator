var appDev = angular.module('activageDashboardAppDev', ['activageDashboardApp', 'ngMockE2E']);


appDev.run(
  ['$httpBackend', 'devRecords', 'devClients', 'devPlatforms', 'devDevices', 'devDeployment',
    function ($httpBackend, devRecords, devClients, devPlatforms, devDevices, devDeployment) {

      devClients.retrieveClients();
      devClients.setCurrentClient();
      devClients.getCurrentClient();

      devRecords.retrieveRecords();
      devRecords.createRecord();
      devRecords.updateRecord();
      devRecords.deleteRecord();

      devPlatforms.retrievePlatforms();
      devPlatforms.retrievePlatformTypes();
      devPlatforms.retrieveTypes();
      devPlatforms.createPlatform();
      devPlatforms.updatePlatform();
      devPlatforms.deletePlatform();

      devDevices.retrieveDevices();
      devDevices.updateDevice();
      devDevices.createDevice();
      devDevices.deleteDevice();

      devDeployment.retrieveDeployments();
      devDeployment.createDeployment();
      devDeployment.getDeploymentById();
      devDeployment.deleteDeploymentById();
      devDeployment.getDeploymentHistoricById();
      devDeployment.addDeviceToDeployment();
      devDeployment.deleteDeviceFromDeployment();
      devDeployment.retrieveDevices();

      /** URL passThrough - Evitan error en la fase de desarrollo **/

      $httpBackend.whenGET('resources/locale-es_ES.json').passThrough();
      $httpBackend.whenGET('resources/locale-en_US.json').passThrough();

      $httpBackend.whenGET('views/main.html').passThrough();

      $httpBackend.whenGET('views/deployment-manager.html').passThrough();
      $httpBackend.whenGET('views/create-deployment.html').passThrough();
      $httpBackend.whenGET('views/delete-deployment.html').passThrough();
      $httpBackend.whenGET('views/update-deployment.html').passThrough();
      $httpBackend.whenGET('views/deployment-info.html').passThrough();


      $httpBackend.whenGET('views/component-configuration.html').passThrough();
      $httpBackend.whenGET('views/component-configuration.html').passThrough();
      $httpBackend.whenGET('views/component-view.html').passThrough();
      $httpBackend.whenGET('views/add-device.html').passThrough();
      $httpBackend.whenGET('views/add-platform.html').passThrough();
      $httpBackend.whenGET('views/add-service.html').passThrough();
      $httpBackend.whenGET('views/platform-info.html').passThrough();
      $httpBackend.whenGET('views/device-info.html').passThrough();
      $httpBackend.whenGET('views/update_device.html').passThrough();
      $httpBackend.whenGET('views/update-platform-info.html').passThrough();

      $httpBackend.whenGET('views/maintenance-panel.html').passThrough();
      $httpBackend.whenGET('views/add-maintenance.html').passThrough();
      $httpBackend.whenGET('views/maintenance-info.html').passThrough();
      $httpBackend.whenGET('views/update-maintenance.html').passThrough();

      $httpBackend.whenGET('views/about.html').passThrough();
      $httpBackend.whenGET('views/about-deployment-manager.html').passThrough();
      $httpBackend.whenGET('views/about-component-configurator.html').passThrough();
      $httpBackend.whenGET('views/about-maintenance-panel.html').passThrough();

      /** URL passThrough - Evitan error en la fase de desarrollo **/

    }
  ]
);
