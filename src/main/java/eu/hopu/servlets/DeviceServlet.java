package eu.hopu.servlets;


import com.google.gson.Gson;
import eu.hopu.Initializer;
import eu.hopu.sil.SilClient;
import eu.hopu.sil.dto.SilDevice;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/devices")
public class DeviceServlet {

  private final Gson gson;
  private final SilClient client;

  public DeviceServlet() {
    this.client = Initializer.silClient;
    this.gson = new Gson();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getDevices(@Context HttpServletRequest request, @QueryParam("platformId") String platformId) {
    List<SilDevice> silDevices = client.retrieveDevices(platformId, request.getHeader("Client-ID"));
    return Response.ok().entity(gson.toJson(silDevices)).build();
  }

  @POST
  @Consumes("application/json")
  @Produces("application/json")
  public Response createDevice(@Context HttpServletRequest request, SilDevice deviceToCreate) {
    SilDevice silDevice = client.createDevice(deviceToCreate, request.getHeader("Client-ID"));
    return Response.ok().entity(gson.toJson(silDevice)).build();
  }

  @PUT
  @Consumes("application/json")
  @Produces("application/json")
  public Response updateDevice(@Context HttpServletRequest request, SilDevice deviceToUpdate) {
    SilDevice silDevice = client.updateDevice(deviceToUpdate, request.getHeader("Client-ID"));
    return Response.ok().entity(gson.toJson(silDevice)).build();
  }

  @DELETE
  public Response deleteDevice(@Context HttpServletRequest request, @QueryParam("deviceId") String deviceId) {
    boolean result = client.deleteDevice(deviceId, request.getHeader("Client-ID"));
    if (result)
      return Response.noContent().build();
    else
      return Response.status(400).build();
  }

}
