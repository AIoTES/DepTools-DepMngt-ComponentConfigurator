package eu.hopu.servlets;

import com.google.gson.Gson;
import eu.hopu.Initializer;
import eu.hopu.servlets.dto.CreateSilPlatform;
import eu.hopu.servlets.dto.SilPlatform;
import eu.hopu.servlets.dto.UpdateSilPlatform;
import eu.hopu.sil.SilClient;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static eu.hopu.Initializer.CLIENT_ID;

@Path("/platforms")
public class PlatformServlet {

  private final Gson gson;
  private final SilClient client;

  public PlatformServlet() {
    this.client = Initializer.silClient;
    this.gson = new Gson();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getPlatforms(@Context HttpServletRequest request) {
    String clientId = request.getHeader("Client-ID") != null ? request.getHeader("Client-ID") : CLIENT_ID;
    List<SilPlatform> silPlatforms = client.retrieveRegisteredPlatforms(clientId);
    return Response.ok().entity(gson.toJson(silPlatforms)).build();
  }

  @POST
  @Consumes("application/json")
  @Produces("application/json")
  public Response createPlatform(@Context HttpServletRequest request, CreateSilPlatform platform) {
    String clientId = request.getHeader("Client-ID") != null ? request.getHeader("Client-ID") : CLIENT_ID;
    SilPlatform silPlatform = client.createPlatform(platform, clientId);
    return Response.ok().entity(gson.toJson(silPlatform)).build();
  }

  @PUT
  @Consumes("application/json")
  @Produces("application/json")
  public Response updatePlatform(@Context HttpServletRequest request, @QueryParam("platformId") String platformId, UpdateSilPlatform platform) {
    String clientId = request.getHeader("Client-ID") != null ? request.getHeader("Client-ID") : CLIENT_ID;
    UpdateSilPlatform silPlatform = client.updatePlatform(platformId, platform, clientId);
    return Response.ok().entity(gson.toJson(silPlatform)).build();
  }

  @DELETE
  public Response deletePlatform(@Context HttpServletRequest request, @QueryParam("platformId") String platformId) {
    String clientId = request.getHeader("Client-ID") != null ? request.getHeader("Client-ID") : CLIENT_ID;
    boolean result = client.deletePlatform(platformId, clientId);
    if (result)
      return Response.noContent().build();
    else
      return Response.status(400).build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/types")
  public Response getPlatformTypes(@Context HttpServletRequest request) {
    return Response.ok().entity(gson.toJson(Initializer.platformTypes)).build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/platform-types")
  public Response consultTypes(@Context HttpServletRequest request) {
    String clientId = request.getHeader("Client-ID") != null ? request.getHeader("Client-ID") : CLIENT_ID;
    boolean result = client.retrievePlatformTypes(clientId);
    if (result)
      return Response.ok().build();
    else
      return Response.status(400).build();
  }

}
