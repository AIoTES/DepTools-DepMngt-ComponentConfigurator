package eu.hopu.servlets;

import eu.hopu.utils.GetEnvOrProperty;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

@Path("/platforms")
public class PlatformServlet {
  private final String SERVER_ADDR = GetEnvOrProperty.getInstance().get("SIL_URL");
  private final String CLIENT_ID = GetEnvOrProperty.getInstance().get("CLIENT_ID");
  OkHttpClient client = new OkHttpClient();

  public static final okhttp3.MediaType JSON = okhttp3.MediaType.parse("application/json; charset=utf-8");

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("")
  public Response getPlatforms(@Context HttpServletRequest request) {
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/platforms").header("Client-ID", CLIENT_ID).get().build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }

    return Response.ok().build();
  }

  @POST
  @Consumes("application/json")
  @Path("/new")
  public Response newPlatform(@Context HttpServletRequest request) throws IOException {
    String bString = NotificationServlet.getJsonBodyString(request.getInputStream());
    RequestBody body = RequestBody.create(JSON, bString);
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/platforms").header("Client-ID", CLIENT_ID).post(body).build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }

    return Response.ok().build();
  }
}
