package eu.hopu.sil;

import eu.hopu.servlets.dto.CreateSilPlatform;
import eu.hopu.servlets.dto.SilPlatform;
import eu.hopu.servlets.dto.UpdateSilPlatform;
import eu.hopu.sil.dto.ClientSil;
import eu.hopu.sil.dto.SilDevice;

import java.util.List;

public interface SilClient {

  ClientSil registerClient(ClientSil clientSil);

  List<ClientSil> retrieveRegisteredClients(String clientId);

  List<SilPlatform> retrieveRegisteredPlatforms(String clientId);

  SilPlatform createPlatform(CreateSilPlatform platform, String clientId);

  UpdateSilPlatform updatePlatform(String platformId, UpdateSilPlatform platform, String clientId);

  boolean deletePlatform(String platformId, String clientId);

  boolean retrievePlatformTypes(String clientId);

  List<SilDevice> retrieveDevices(String platformId, String clientId);

  SilDevice createDevice(SilDevice deviceToCreate, String clientId);

  SilDevice updateDevice(SilDevice deviceToUpdate, String clientId);

  boolean deleteDevice(String deviceId, String clientId);

}
