package eu.hopu.servlets;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/api/v1") // set the path to REST web services
public class ApplicationConfig extends Application {}
