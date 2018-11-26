package eu.hopu.servlets;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import eu.hopu.utils.GetEnvOrProperty;
import okhttp3.OkHttpClient;
import okhttp3.Request;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

@Path("/clients")
public class ClientServlet {
  private final String SERVER_ADDR = GetEnvOrProperty.getInstance().get("SIL_URL");
  private String CLIENT_ID = GetEnvOrProperty.getInstance().get("CLIENT_ID");
  OkHttpClient client = new OkHttpClient();

  public static final okhttp3.MediaType JSON = okhttp3.MediaType.parse("application/json; charset=utf-8");

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("")
  public Response getClients(@Context HttpServletRequest request) {
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/clients").header("Client-ID", CLIENT_ID).get().build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }

    return Response.ok().build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/actual")
  public Response getActualClientId(@Context HttpServletRequest request){
    JsonObject json = new JsonObject();
    json.addProperty("Client-Id", CLIENT_ID);
    return Response.ok(json.toString(), MediaType.APPLICATION_JSON).build();
  }

  @POST
  @Consumes("application/json")
  @Path("/actual")
  public Response setActualClientId(@Context HttpServletRequest request) throws IOException {

    String bString = DeviceServlet.getJsonBodyString(request.getInputStream());
    JsonObject json = (JsonObject) new JsonParser().parse(bString);
    String client = json.get("clientId").getAsString();
    GetEnvOrProperty.getInstance().set("CLIENT_ID", client);
    this.CLIENT_ID = client;

    return Response.ok().build();
  }
}
