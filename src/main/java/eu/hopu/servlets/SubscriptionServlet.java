package eu.hopu.servlets;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import eu.hopu.utils.GetEnvOrProperty;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Path("subscriptions")
public class SubscriptionServlet {
  private final String SERVER_ADDR = GetEnvOrProperty.getInstance().get("SIL_URL");
  private final String CLIENTID = GetEnvOrProperty.getInstance().get("CLIENT_ID");

  OkHttpClient client = new OkHttpClient();
  public static final okhttp3.MediaType JSON = okhttp3.MediaType.parse("application/json; charset=utf-8");

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public Response subscribeToDevice(@Context HttpServletRequest request) throws IOException {
    RequestBody body = RequestBody.create(JSON, NotificationServlet.getJsonBodyString(request.getInputStream())) ;
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/subscriptions").header("Client-ID", CLIENTID).post(body).build();

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
  public Response getSubscriptionList(@Context HttpServletRequest request,
                                      @QueryParam("clientId") String clientId) {
    HttpUrl.Builder urlBuilder = HttpUrl.parse(SERVER_ADDR + "/api/mw2mw/subscriptions").newBuilder();
    urlBuilder.addQueryParameter("clientId", clientId);
    String url = urlBuilder.build().toString();

    Request req = new Request.Builder().url(url).header("Client-ID", CLIENTID).get().build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }
    return Response.ok().build();
  }

  @POST
  @Path("/prueba")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getSubscription(@Context HttpServletRequest request) throws IOException {
    JsonParser parser = new JsonParser();
    JsonObject jsonGeneral = parser.parse(NotificationServlet.getJsonBodyString(request.getInputStream())).getAsJsonObject();

    String clientId = jsonGeneral.get("clientId").getAsString();
    String deviceId = jsonGeneral.get("deviceId").getAsString();


    HttpUrl.Builder urlBuilder = HttpUrl.parse(SERVER_ADDR + "/api/mw2mw/subscriptions").newBuilder();
    urlBuilder.addQueryParameter("clientId", clientId);
    String url = urlBuilder.build().toString();

    Request req = new Request.Builder().url(url).header("Client-ID", CLIENTID).get().build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      JsonParser jsonParser = new JsonParser();
      String bodyStr = resp.body().string();
      JsonArray body =  jsonParser.parse(bodyStr).getAsJsonArray();

      String idConver = "";

      for (JsonElement dt : body) {
        if (dt.isJsonObject()) {
          JsonObject dtObj = dt.getAsJsonObject();
          JsonArray dtArr = dtObj.get("deviceIds").getAsJsonArray();
          String id = dtArr.get(0).getAsString();
          if (id.equals(deviceId)) {
            idConver = dtObj.get("conversationId").getAsString();
            break;
          }
        }
      }
      JsonObject json = new JsonObject();
      json.addProperty("conversationId", idConver);
      return Response.ok(json.toString(), MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }
    return Response.ok().build();
  }

  @DELETE
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/{conversationId}")
  public Response removeSubscription(@Context HttpServletRequest request,
                                     @PathParam("conversationId") String conversationId) {

    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/subscriptions/" + conversationId).header("Client-ID", CLIENTID).delete().build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }
    return Response.ok().build();
  }
}
