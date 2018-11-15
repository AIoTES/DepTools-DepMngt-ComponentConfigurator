# Activage - Interoperability Demo Application

## Introduction
This application was created for the Santiago Activage review. The tool consumes the SIL API showing an homogeneus layer
over different platforms.

## Technical documentation
The project is made up of a backend, that serves as proxy for the SIL API requests and responses, and a simple frontend.
- The backend has been developed in Java.
- The frontedn has benn develope in JavaScript with AngularJS framework.

## Build and deployment
In order to build the frontend you must execute in the root project directory:
```bash
$ npm install
$ bower install
```

The application uses Maven as build tool. Currently it could be build using maven>activage-component-configurator>Lifecycle>install and then runned locally using
Maven Apache Tomcat plugin: maven>activage-component-configurator>Plugins>tomcat7>tomcat7:run-war-only.

A Docker image can be build using the maven profile created for this purpose. Once selected, you need to build the project
using maven: maven>activage-component-configurator>Lifecycle>install. After that, you will have a new docker image named activage-component-configurator:develop.


