appDev.service('devRegistry',
  ['$httpBackend', 'images', 'markdown',
    function ($httpBackend, images, markdown) {

      var service = {};

      service.retrieve_images = function () {
        $httpBackend.whenGET('/api/v1/registry/images').respond(
          function (method, url, data, headers) {
            console.log('retrieveImages → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(images))]
          }
        );
      };

      service.retrieve_tags_by_image_id = function () {
        $httpBackend.whenGET(/\/api\/v1\/registry\/images\/.*\/tags/).respond(
          function (method, url, data, headers) {
            console.log('retrieveTags → Received: ', method, url, data, headers);
            return [200, angular.fromJson(clone_object(["0.1", "0.2", "develop", "latest"]))]
          }
        );
      };

      service.retrieve_image_info_by_image_id = function () {
        $httpBackend.whenGET(/\/api\/v1\/registry\/images\/.*\/info/).respond(
          function (method, url, data, headers) {
            console.log('retrieveImageInfo → Received: ', method, url, data, headers);
            var urlArray = url.split("/");
            var imageId = urlArray[urlArray.length - 2];

            return [200, angular.fromJson(clone_object({imageId: imageId, imageInfo: markdown}))]
          }
        );
      };

      service.create_image_info_by_image_id = function () {
        $httpBackend.whenPOST(/\/api\/v1\/registry\/images\/.*\/info/).respond(
          function (method, url, data, headers) {
            console.log('createImageInfo → Received: ', method, url, data, headers);
            var urlArray = url.split("/");
            var imageId = urlArray[urlArray.length - 2];

            return [200, angular.fromJson(clone_object({imageId: imageId, imageInfo: markdown}))]
          }
        );
      };

      service.update_image_info_by_image_id = function () {
        $httpBackend.whenPUT(/\/api\/v1\/registry\/images\/.*\/info/).respond(
          function (method, url, data, headers) {
            console.log('updateImageInfo → Received: ', method, url, data, headers);
            var urlArray = url.split("/");
            var imageId = urlArray[urlArray.length - 2];

            return [200, angular.fromJson(clone_object({imageId: imageId, imageInfo: markdown}))]
          }
        );
      };

      service.delete_image_info_by_image_id = function () {
        $httpBackend.whenDELETE(/\/api\/v1\/registry\/images\/.*\/info/).respond(
          function (method, url, data, headers) {
            console.log('deleteImageInfo → Received: ', method, url, data, headers);
            return [204]
          }
        );
      };

      return service;
    }
  ]
);

appDev.value('images', [
  "activage-nr-service-composition",
  "aiotes-ide",
  "clickdigital",
  "clickdigital-anomaly",
  "clickdigital-backend",
  "clickdigital-frontend",
  "code.generator",
  "component-configuration",
  "component-configurator",
  "data-analyser",
  "data-analytics-server",
  "data-manipulator",
  "data_analyser.pca",
  "deployment-manager",
  "device_manager",
  "dl-data-indexing",
  "dl-datamodel-workbench",
  "dl-metadata-storage-explorer",
  "dl-query-component",
  "feature-selection-filter-method",
  "feature-selection-wrapper-method",
  "hierarchical-clustering-method",
  "hypothesis-testing",
  "independentdatastorage",
  "influxdb",
  "intermw",
  "interoperability-demo-app",
  "ipsm-core",
  "json-server",
  "maintenance-panel",
  "metadata-storage-server",
  "mongo",
  "myfirstimage",
  "ont-explorer_dev-semantic_serv-semantics",
  "siltool",
  "syntactic-translator"
]);

appDev.value('markdown', "# Activage - Component configuration tool\n" +
  "\n" +
  "## Introduction\n" +
  "The component configuration tool provides an easy and intuitive GUI for the semantic interoperability layer. \n" +
  "\n" +
  "The component configuration deployment tool is a GUI through which the deployer of a component (device or service) can provide appropriate values for all configurable\n" +
  "parameters that are necessary for the deployment of a component in an actual deployment unit.\n" +
  "\n" +
  "## Architecture\n" +
  "The project is made up of a backend, that serves as proxy for the SIL API requests and responses, \n" +
  "and a frontend that allows the user to perform operations in an easiest way.\n" +
  "- The backend has been developed in Java.\n" +
  "- The frontend has been developed in JavaScript with AngularJS framework.\n" +
  "\n" +
  "The application requires an SIL instance deployed.\n" +
  "\n" +
  "## Build and deployment\n" +
  "\n" +
  "### Prerequisites:\n" +
  "- Install Docker\n" +
  "\n" +
  "````\n" +
  "sudo apt-get install docker-ce\n" +
  "````\n" +
  "- Install Docker Compose\n" +
  "\n" +
  "````\n" +
  "sudo curl -L \"https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose\n" +
  "sudo chmod +x /usr/local/bin/docker-compose\n" +
  "````\n" +
  "- Install Maven\n" +
  "\n" +
  "````\n" +
  "sudo apt-get install maven\n" +
  "````\n" +
  "- Install NodeJS\n" +
  "\n" +
  "````\n" +
  "sudo apt install nodejs\n" +
  "````\n" +
  "- Install NPM\n" +
  "\n" +
  "````\n" +
  "sudo apt install npm\n" +
  "npm install\n" +
  "````\n" +
  "- Install Yarn\n" +
  "\n" +
  "````\n" +
  "sudo apt-get install yarn\n" +
  "````\n" +
  "- Install Bower\n" +
  "\n" +
  "````\n" +
  "sudo npm install bower -g\n" +
  "````\n" +
  "\n" +
  "### Build\n" +
  "\n" +
  "### Build the frontend dependencies\n" +
  "For the correct functioning of the frontend, it is necessary to satisfy several dependencies, so the following commands must be executed\n" +
  "````\n" +
  "npm install\n" +
  "bower install\n" +
  "````\n" +
  "\n" +
  "#### Build the tool using maven\n" +
  "This tool uses maven so for its use it should be placed in the root directory of the project and execute:\n" +
  "```bash\n" +
  "$ mvn clean install\n" +
  "```\n" +
  "\n" +
  "#### Build docker image\n" +
  "Assuming you are in the project root folder and the project has been compiled using maven. The docker image of the tool can be built executing:\n" +
  "```bash\n" +
  "$ docker build -t activage-component-configurator:develop .\n" +
  "```\n" +
  "In the previous code example we can see the image is created using *activage-component-configurator* as the image name and *develop*\n" +
  "as the tag. The final dot is necessary for the detection of the Dockerfile file in the directory.\n" +
  "\n" +
  "#### Run frontend application for development purpose\n" +
  "Grunt provides profiles to allow the developer to run only the frontend application. This can be done running:\n" +
  "````\n" +
  "grunt serve\n" +
  "````\n" +
  "To change to development mode, you have to modify the index.html, changing the ng-app of the body by 'activageDashboardAppDev' and modify all the *.service_api.js by changing the corresponding backend url by 'BACKEND_URL'.\n" +
  "\n" +
  "With this, it is used to use mock requests that will return the expected answers and thus can debug and check the correct operation of the application.\n" +
  "\n" +
  "#### Run the tool using the tomcat embedded-server\n" +
  "The tool can be run using the maven tomcat plugin. This plugin launches a tomcat embedded server in the port configured in pom.xml.\n" +
  "The plugin can be run executing:\n" +
  "```bash\n" +
  "$ mvn clean install tomcat7:run-war-only\n" +
  "```\n" +
  "\n" +
  "### Deployment\n" +
  "The project rely on docker for development and production deployments. The following subsections explains in detail how to \n" +
  "deploy the tool using docker technology and how to configure the tool with the required environmental variables or configuration files.\n" +
  "\n" +
  "### Deploy docker-compose\n" +
  "Once built the docker image, the component configurator can be run using docker-compose utility. For that purpose, a docker-compose file\n" +
  "including the configuration fields required is provided in the docker/component-configurator/ directory. This file can be run executing:\n" +
  "````\n" +
  "docker-compose up\n" +
  "```` \n" +
  "To stop the deployment, you must run in the same directory:\n" +
  "````\n" +
  "docker-compose down\n" +
  "````\n" +
  "### Deploy as service in docker-swarm\n" +
  "The next step is to start the services as a Docker Swarm. Assuming you are in the project root folder, you have to execute:\n" +
  "````\n" +
  "$ cd docker/component-configurator/\n" +
  "$ docker stack deploy -c docker-compose.yml component-configuration\n" +
  "````\n" +
  "To stop a Docker Stack we run\n" +
  "````\n" +
  "docker stack rm [service_name]\n" +
  "````\n" +
  "\n" +
  "In addition, we can see the status of a Docker Stack:\n" +
  "````\n" +
  "docker stack ps [service_name]\n" +
  "````\n" +
  "\n" +
  "In case you want to see the log of a service:\n" +
  "````\n" +
  "docker service logs [service_name]\n" +
  "````\n" +
  "\n" +
  "### Docker environmental variables\n" +
  "To deploy the application using a docker, it's necessary to specify two environment variables:\n" +
  "\n" +
  "- **CLIENT_ID**. This is a client id that is already registered in the SIL.\n" +
  "- **SIL_URL**. The URL where SIL is displayed. \n" +
  "\n" +
  "## Testing \n" +
  "The tool provides tests ensuring the main operations are probed. To execute the tests you have to run:\n" +
  "```bash\n" +
  "$ mvn clean test\n" +
  "```\n" +
  "If some tests appear as ignored you have to delete the @Ignore annotation in the class or test inside the src/test/java/ directory.\n" +
  "\n" +
  "For functional testing the tool provides an Postman collection where the developer can test the HTTP REST methods. \n");
