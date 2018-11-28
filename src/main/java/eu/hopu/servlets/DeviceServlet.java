package eu.hopu.servlets;


import com.google.gson.JsonObject;
import eu.hopu.storage.MeasuresStorage;
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
import java.io.InputStreamReader;
import java.net.URLEncoder;

@Path("/devices")
public class DeviceServlet {
  private final String SERVER_ADDR = GetEnvOrProperty.getInstance().get("SIL_URL");

  OkHttpClient client = new OkHttpClient();

  public static final okhttp3.MediaType JSON = okhttp3.MediaType.parse("application/json; charset=utf-8");

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("")
  public Response getDevices(@Context HttpServletRequest request) {
    JsonObject json = new JsonObject();
    int num = 1;
    for (String id : MeasuresStorage.getInstance().getIdValues()) {
      json.addProperty("id" + num, id);
      num++;
    }
    return Response.ok(json.toString(), MediaType.APPLICATION_JSON).build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getDevicesList(@Context HttpServletRequest request,
                                 @QueryParam("platformId") String platformId) {
    HttpUrl.Builder urlBuilder = HttpUrl.parse(SERVER_ADDR + "/api/mw2mw/devices").newBuilder();
    urlBuilder.addQueryParameter("platformId", platformId);
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
  @Path("/new")
  public Response newDevice(@Context HttpServletRequest request) throws IOException {
    String bod = getJsonBodyString(request.getInputStream());
    String clientId = request.getHeader("Client-ID");
    RequestBody body = RequestBody.create(JSON, bod);
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/devices").header("Client-ID", clientId).post(body).build();

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
  public Response updateDevice(@Context HttpServletRequest request,
                               @QueryParam("deviceId") String deviceId) throws IOException {
    String bod = getJsonBodyString(request.getInputStream());
    String clientId = request.getHeader("Client-ID");
    RequestBody body = RequestBody.create(JSON, bod);

    HttpUrl.Builder urlBuilder = HttpUrl.parse(SERVER_ADDR + "/api/mw2mw/devices").newBuilder();
    urlBuilder.addQueryParameter("deviceId", deviceId);
    String url = urlBuilder.build().toString();

    Request req = new Request.Builder().url(url).header("Client-ID", clientId).put(body).build();

    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }
    return Response.ok().build();
  }

  @DELETE
  public Response deleteDevice(@Context HttpServletRequest request,
                               @QueryParam("deviceId") String deviceId) throws IOException {
    String clientId = request.getHeader("Client-ID");

    String device = URLEncoder.encode(deviceId, "UTF-8");

    HttpUrl.Builder urlBuilder = HttpUrl.parse(SERVER_ADDR + "/api/mw2mw/devices/" + device).newBuilder();
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
