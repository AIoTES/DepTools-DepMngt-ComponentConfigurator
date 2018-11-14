package eu.hopu.servlets;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import eu.hopu.dto.DataLinkedRepresentation;
import eu.hopu.dto.DataSimpleRepresentation;
import eu.hopu.storage.MeasuresStorage;
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

@Path("/devices")
public class DeviceServlet {

  private final String SERVER_ADDR = GetEnvOrProperty.getInstance().get("SIL_URL");
  private final String CLIENTID = GetEnvOrProperty.getInstance().get("CLIENT_ID");

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
//        return Response.ok().build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("linked/{deviceId}")
  public Response getDeviceDataLinkedRepresentation(@Context HttpServletRequest request,
                                                    @PathParam("deviceId") String deviceId) {
    return Response.ok().build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("linked/last/{deviceId}")
  public Response getDeviceDataLinkedRepresentationLastValue(@Context HttpServletRequest request,
                                                             @PathParam("deviceId") String deviceId) {
    DataLinkedRepresentation dlr = MeasuresStorage.getInstance().getLastOntologyById(deviceId);
    JsonObject json = dlr.getJsonComplete();

    return Response.ok(json.toString(), MediaType.APPLICATION_JSON).build();
    //return Response.ok().build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("simple/{deviceId}")
  public Response getDeviceDataSimpleRepresentation(@Context HttpServletRequest request,
                                                    @PathParam("deviceId") String deviceId) {
    return Response.ok().build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("simple/last/")
  public Response getDeviceDataSimpleRepresentationLastValue(@Context HttpServletRequest request,
                                                             @QueryParam("deviceId") String deviceId) {
    DataSimpleRepresentation dsr = MeasuresStorage.getInstance().getLastValueById(deviceId);
    if (dsr != null) {
      JsonObject json = new JsonObject();

      json.addProperty("deviceId", deviceId);
      json.addProperty("name", deviceId);
      json.addProperty("hostedBy", dsr.getIdPlatform());
      JsonArray jarray = new JsonArray();
      for (String id : dsr.getNamesValues()) {
        JsonObject js = new JsonObject();
        js.addProperty("title", id);
        js.addProperty("value", dsr.getValue(id));
        js.addProperty("update", dsr.getDate().toString());
        jarray.add(js);
      }
      json.add("sensors", jarray);


      return Response.ok(json.toString(), MediaType.APPLICATION_JSON).build();
    }
    else {
      return Response.ok().build();
    }
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getDevicesList(@Context HttpServletRequest request,
                                 @QueryParam("platformId") String platformId) {
    HttpUrl.Builder urlBuilder = HttpUrl.parse(SERVER_ADDR + "/api/mw2mw/devices").newBuilder();
    urlBuilder.addQueryParameter("platformId", platformId);
    String url = urlBuilder.build().toString();

    Request req = new Request.Builder().url(url).header("Client-ID", CLIENTID).get().build();

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
  public Response newPlatform(@Context HttpServletRequest request) throws IOException {
    String bod = NotificationServlet.getJsonBodyString(request.getInputStream());
    System.out.println(bod);
    RequestBody body = RequestBody.create(JSON, bod);
    Request req = new Request.Builder().url(SERVER_ADDR + "/api/mw2mw/devices").header("Client-ID", CLIENTID).post(body).build();


    try (okhttp3.Response resp = client.newCall(req).execute()) {
      String bodyStr = resp.body().string();
      System.out.println(bodyStr);
      return Response.ok(bodyStr, MediaType.APPLICATION_JSON).build();
    }
    catch (IOException ex) {

    }
    return Response.ok().build();
  }
}
