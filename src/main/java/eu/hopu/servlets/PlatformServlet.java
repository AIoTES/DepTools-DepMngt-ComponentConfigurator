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
import java.net.URLEncoder;

@Path("/platforms")
public class PlatformServlet {
  private final String SERVER_ADDR = GetEnvOrProperty.getInstance().get("SIL_URL");
  OkHttpClient client = new OkHttpClient();

  public static final okhttp3.MediaType JSON = okhttp3.MediaType.parse("application/json; charset=utf-8");

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("")
  public Response getPlatforms(@Context HttpServletRequest request) {
    String clientId = request.getHeader("Client-ID");
    if (clientId == null)
      clientId = "myclient";
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/platforms").header("Client-ID", clientId).get().build();

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
    String bString = DeviceServlet.getJsonBodyString(request.getInputStream());
    String clientId = request.getHeader("Client-ID");
    RequestBody body = RequestBody.create(JSON, bString);
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/platforms").header("Client-ID", clientId).post(body).build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }

    return Response.ok().build();
  }

  @PUT
  @Consumes("application/json")
  @Path("/{platformId}")
  public Response updatePlatform(@Context HttpServletRequest request,
                               @PathParam("platformId") String platformId) throws IOException {
    String bod = DeviceServlet.getJsonBodyString(request.getInputStream());
    String clientId = request.getHeader("Client-ID");
    RequestBody body = RequestBody.create(JSON, bod);

    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/platforms/" + platformId).header("Client-ID", clientId).put(body).build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }
    return Response.ok().build();
  }

  @DELETE
  @Path("")
  public Response deletePlatform(@Context HttpServletRequest request,
                               @QueryParam("platformId") String platformId) throws IOException {
    String clientId = request.getHeader("Client-ID");

    String platform = URLEncoder.encode(platformId, "UTF-8");

    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/platforms/" + platform).header("Client-ID", clientId).delete().build();

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
  @Path("/types")
  public Response getPlatformTypes(@Context HttpServletRequest request) {
    String clientId = request.getHeader("Client-ID");
    if (clientId == null)
      clientId = "myclient";
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/platform-types").header("Client-ID", clientId).get().build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }

    return Response.ok().build();
  }

}
