package eu.hopu.servlets;


import eu.hopu.utils.GetEnvOrProperty;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

import static eu.hopu.servlets.DeviceServlet.getJsonBodyString;

@Path("/channels")
public class ChannelServlet {
  private final String SERVER_ADDR = GetEnvOrProperty.getInstance().get("SIL_URL");

  OkHttpClient client = new OkHttpClient();

  public static final okhttp3.MediaType JSON = okhttp3.MediaType.parse("application/json; charset=utf-8");


  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getChannels(@Context HttpServletRequest request) {
    HttpUrl.Builder urlBuilder = HttpUrl.parse(SERVER_ADDR + "/api/mw2mw/channels").newBuilder();
    String url = urlBuilder.build().toString();
    String clientId = request.getHeader("Client-ID");

    Request req = new Request.Builder().url(url).header("Client-ID", clientId).get().build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    } catch (IOException ex) {

    }
    return Response.ok().build();
  }

  @POST
  @Consumes("application/json")
  public Response newChannel(@Context HttpServletRequest request) throws IOException {
    String clientId = request.getHeader("Client-ID");
    String bod = getJsonBodyString(request.getInputStream());
    RequestBody body = RequestBody.create(JSON, bod);
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/channels").header("Client-ID", clientId).post(body).build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }
    return Response.ok().build();
  }

  @DELETE
  @Path("/{channelId}")
  public Response deleteChannel(@Context HttpServletRequest request,
                               @PathParam("channelId") String channelId) {
    String clientId = request.getHeader("Client-ID");

    HttpUrl.Builder urlBuilder = HttpUrl.parse(SERVER_ADDR + "/api/mw2mw/channels/" + channelId).newBuilder();
    String url = urlBuilder.build().toString();

    Request req = new Request.Builder().url(url).header("Client-ID", clientId).delete().build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }
    return Response.ok().build();
  }
}
