package eu.hopu.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import eu.hopu.dto.DataSimpleRepresentation;
import eu.hopu.event.EventManager;
import eu.hopu.serializer.OntologySerializer;
import eu.hopu.serializer.OntologySerializer2;
import eu.hopu.service.DeviceServiceImpl;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;

@Path("notify")
public class NotificationServlet {

  private DeviceServiceImpl deviceService;
  private Gson gson;

  public NotificationServlet() {
    gson = new Gson();
    deviceService = new DeviceServiceImpl();
  }

  private static HashMap<String, String> labelsValue = new HashMap<>();

  @POST
  @Consumes(MediaType.TEXT_PLAIN)
  @Path("")
  public Response receiveNotification(@Context HttpServletRequest request) throws IOException {

    JsonObject json = new JsonObject();
    if (request.getMethod().equals("POST")) {
      String body = getJsonBodyString(request.getInputStream());

      OntologySerializer2 ontology = new OntologySerializer2(body);
      DataSimpleRepresentation dsr = ontology.buildDataSimpleRepresentation();

      if (dsr != null) {
        String date = dsr.getDate().toString();

        json.addProperty("Date", date);

        System.out.println(date);

        String idPlatform = dsr.getIdPlatform();

        json.addProperty("id_platform", idPlatform);

        System.out.println("Platform: " + idPlatform);

        String idDevice = dsr.getIdDevice();
        System.out.println("Device: " + dsr.getIdDevice());

        json.addProperty("id_device", idDevice);

        for (String id : dsr.getNamesValues()) {
          System.out.println(id + ": " + dsr.getValue(id));
          json.addProperty(id, dsr.getValue(id));
        }

        deviceService.addValue(idDevice, dsr);
        deviceService.addOntologyValue(idDevice, ontology.buildDataLinkedRepresentation(idDevice));
        EventManager.getInstance().sendEvent("NEW_VALUE_RAW", gson.toJson(dsr));
        EventManager.getInstance().sendEvent("NEW_VALUE_CLEANED", gson.toJson(ontology.buildDataLinkedRepresentation(idDevice)));
      }
      System.out.println();
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
