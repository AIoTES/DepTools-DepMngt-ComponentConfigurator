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
    List<SilPlatform> silPlatforms = client.retrieveRegisteredPlatforms(request.getHeader("Client-ID"));
    return Response.ok().entity(gson.toJson(silPlatforms)).build();
  }

  @POST
  @Consumes("application/json")
  @Produces("application/json")
  public Response createPlatform(@Context HttpServletRequest request, CreateSilPlatform platform) {
    SilPlatform silPlatform = client.createPlatform(platform, request.getHeader("Client-ID"));
    return Response.ok().entity(gson.toJson(silPlatform)).build();
  }

  @PUT
  @Consumes("application/json")
  @Produces("application/json")
  @Path("/{platformId}")
  public Response updatePlatform(@Context HttpServletRequest request, @PathParam("platformId") String platformId, UpdateSilPlatform platform) {
    UpdateSilPlatform silPlatform = client.updatePlatform(platformId, platform, request.getHeader("Client-ID"));
    return Response.ok().entity(gson.toJson(silPlatform)).build();
  }

  @DELETE
  public Response deletePlatform(@Context HttpServletRequest request, @QueryParam("platformId") String platformId) {
    boolean result = client.deletePlatform(platformId, request.getHeader("Client-ID"));
    if (result)
      return Response.ok().build();
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
    boolean result = client.retrievePlatformTypes(request.getHeader("Client-ID"));
    if (result)
      return Response.ok().build();
    else
      return Response.status(400).build();
  }

}
