# Activage - Component configuration tool

## Introduction
The component configuration tool provides an easy and intuitive GUI for the semantic interoperability layer. 

// TODO añadir aquí lo que se pone en la documentación

## Architecture
The project is made up of a backend, that serves as proxy for the SIL API requests and responses, 
and a frontend that allows the user to perform operations in an easiest way.
- The backend has been developed in Java.
- The frontend has been developed in JavaScript with AngularJS framework.

The application requires an SIL instance deployed.

## Build and deployment

### Prerequisites:
- Install Docker

````
sudo apt-get install docker-ce
````
- Install Docker Compose

````
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
````
- Install Maven

````
sudo apt-get install maven
````
- Install NodeJS

````
sudo apt install nodejs
````
- Install NPM

````
sudo apt install npm
npm install
````
- Install Yarn

````
sudo apt-get install yarn
````
- Install Bower

````
sudo npm install bower -g
````

### Build

### Build the frontend dependencies
// TODO añadir aquí la típica frase de para que el frontend funcione correctamente necesita satisfacer dependenciar por lo que hay que ejecutar esto.
````
npm install
bower install
````

#### Build the tool using maven
// TODO añade aquí un par de líneas diciendo lo básico de: se hace uso de maven, hay que situarse en el directorio root del proyecto y ejecutar esto
```bash
$ mvn clean install
```

#### Build docker image
Assuming you are in the project root folder and the project has been compiled using maven. The docker image of the tool can be built executing:
```bash
$ docker build -t activage-component-configurator:develop .
```
In the previous code example we can see the image is created using *activage-component-configurator* as the image name and *develop*
as the tag. The final dot is necessary for the detection of the Dockerfile file in the directory.

#### Run frontend application for development purpose
Grunt provides profiles to allow the developer to run only the frontend application. This can be done running:
````
grunt serve
````
// TODO explicar aquí como se cambia el módulo de la aplicación a desarrollo y lo que se gana (modulo de desarrollo con peticiones mock)

#### Run the tool using the tomcat embedded-server
The tool can be run using the maven tomcat plugin. This plugin launches a tomcat embedded server in the port configured in pom.xml.
The plugin can be run executing:
```bash
$ mvn clean install tomcat7:run-war-only
```

### Deployment
The project rely on docker for development and production deployments. The following subsections explains in detail how to 
deploy the tool using docker technology and how to configure the tool with the required environmental variables or configuration files.

### Deploy docker-compose
Once built the docker image, the component configurator can be run using docker-compose utility. For that purpose, a docker-compose file
including the configuration fields required is provided in the docker/component-configurator/ directory. This file can be run executing:
````
docker-compose up
```` 
To stop the deployment, you must run in the same directory:
````
docker-compose down
````
### Deploy as service in docker-swarm
The next step is to start the services as a Docker Swarm. Assuming you are in the project root folder, you have to execute:
````
$ cd docker/component-configurator/
$ docker stack deploy -c docker-compose.yml component-configuration
````
To stop a Docker Stack we run
````
docker stack rm [service_name]
````

In addition, we can see the status of a Docker Stack:
````
docker stack ps [service_name]
````

In case you want to see the log of a service:
````
docker service logs [service_name]
````

### Docker environmental variables
// Ejemplo rellenar con la variables reales
Three profiles have been created to treat the database as we are interested in a specific case. The created profiles are:

- **PRODUCTION**. Profile for production. With this profile active, Hibernate not modify the database or tables, only inserts data. It is the default mode.
- **DEVELOPMENT**. Profile for development ONLY. With this profile active, every time Homard is launched, Hibernate deletes the old database and creates a new database. 
- **UPDATE**. Profile to update the database tables. With this profile active, when Homard is launched, Hibernate updates the tables with the new design. If no changes are made to the database, this profile does not allow Homard to be started.

## Testing 
The tool provides tests ensuring the main operations are probed. To execute the tests you have to run:
```bash
$ mvn clean test
```
If some tests appear as ignored you have to delete the @Ignore annotation in the class or test inside the src/test/java/ directory.

For functional testing the tool provides an Postman collection where the developer can test the HTTP REST methods. 
