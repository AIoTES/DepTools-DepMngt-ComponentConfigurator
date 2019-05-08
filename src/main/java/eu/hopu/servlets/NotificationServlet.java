package eu.hopu.servlets;

import eu.hopu.Initializer;
import eu.hopu.serializer.OntologySerializer;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.io.IOException;

import static eu.hopu.utils.InputStreamToString.getJsonBodyString;

@Path("notify")
public class NotificationServlet {

  @POST
  @Consumes("application/ld+json")
  public Response receiveNotification(@Context HttpServletRequest request) throws IOException {
    OntologySerializer ontology = new OntologySerializer(getJsonBodyString(request.getInputStream()));
    Initializer.platformTypes = ontology.buildTypesPlatforms();
    return Response.ok().build();
  }

}

