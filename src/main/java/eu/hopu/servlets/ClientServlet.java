package eu.hopu.servlets;

import com.google.gson.Gson;
import eu.hopu.Initializer;
import eu.hopu.servlets.dto.ClientIdDto;
import eu.hopu.sil.SilClient;
import eu.hopu.sil.dto.ClientSil;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static eu.hopu.Initializer.CLIENT_ID;

@Path("/clients")
public class ClientServlet {

  private final Gson gson;
  private final SilClient silClient;

  public ClientServlet() {
    this.gson = new Gson();
    this.silClient = Initializer.silClient;
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getClients(@Context HttpServletRequest request) {
    List<ClientSil> silClients = silClient.retrieveRegisteredClients(CLIENT_ID);
    return Response.ok().entity(gson.toJson(silClients)).build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/me")
  public Response getCurrentClientId(@Context HttpServletRequest request) {
    return Response.ok().entity(gson.toJson(new ClientIdDto(CLIENT_ID))).build();
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/me")
  public Response setCurrentClientId(@Context HttpServletRequest request, ClientIdDto clientDto) {
    CLIENT_ID = clientDto.getClientId();
    return Response.ok().entity(gson.toJson(clientDto)).build();
  }

}
