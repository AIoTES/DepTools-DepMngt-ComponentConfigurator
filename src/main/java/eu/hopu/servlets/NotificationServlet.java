package eu.hopu.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import eu.hopu.serializer.OntologySerializer;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

@Path("notify")
public class NotificationServlet {

  private Gson gson;

  public NotificationServlet() {
    gson = new Gson();
  }

  @POST
  @Consumes("application/ld+json")
  @Path("")
  public Response receiveNotification(@Context HttpServletRequest request) throws IOException {

    JsonObject json = new JsonObject();
    if (request.getMethod().equals("POST")) {
      String body = getJsonBodyString(request.getInputStream());

      OntologySerializer ontology = new OntologySerializer(body);
      List<String> tipos = ontology.buildTypesPlatforms();

      if (tipos != null) {

      }
    }

    return Response.ok().build();
  }

  public static String getJsonBodyString (ServletInputStream inputStream) throws IOException {
    StringBuilder stringBuilder = new StringBuilder();
    BufferedReader bufferedReader = null;
    try {
      if (inputStream != null) {
        bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        char[] charBuffer = new char[128];
        int bytesRead = -1;
        while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
          stringBuilder.append(charBuffer, 0, bytesRead);
        }
      } else {
        stringBuilder.append("");
      }
    } catch (IOException ex) {
      throw ex;
    } finally {
      if (bufferedReader != null) {
        try {
          bufferedReader.close();
        } catch (IOException ex) {
          throw ex;
        }
      }
    }

    return stringBuilder.toString();
  }

}

