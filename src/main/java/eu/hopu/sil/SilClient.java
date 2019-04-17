package eu.hopu.sil;

import eu.hopu.servlets.dto.SilPlatform;
import eu.hopu.sil.dto.ClientSil;

import java.util.List;

public interface SilClient {

  List<ClientSil> retrieveRegisteredClients(String clientId);

  List<SilPlatform> retrieveRegisteredPlatforms(String clientId);

  SilPlatform createPlatform(SilPlatform platform, String clientId);

  SilPlatform updatePlatform(SilPlatform platform, String clientId);

  boolean deletePlatform(String platformId, String clientId);

  boolean retrievePlatformTypes(String clientId);

}
