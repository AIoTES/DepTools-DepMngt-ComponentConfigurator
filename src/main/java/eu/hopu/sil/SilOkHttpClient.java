package eu.hopu.sil;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import eu.hopu.servlets.dto.CreateSilPlatform;
import eu.hopu.servlets.dto.SilPlatform;
import eu.hopu.servlets.dto.UpdateSilPlatform;
import eu.hopu.sil.dto.ClientSil;
import eu.hopu.sil.dto.CreateDevice;
import eu.hopu.sil.dto.SilDevice;
import okhttp3.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class SilOkHttpClient implements SilClient {

  private static final Logger LOG = LogManager.getLogger(SilOkHttpClient.class);

  private static String CLIENTS_API;
  private static String PLATFORMS_API;
  private static String DEVICES_API;

  private String silUrl;
  private Gson gson;
  private OkHttpClient client;

  public SilOkHttpClient(String silUrl, String basePath) {
    this.silUrl = silUrl;
    CLIENTS_API = basePath + "clients";
    PLATFORMS_API = basePath + "platforms";
    DEVICES_API = basePath + "devices";
    this.gson = new Gson();
    OkHttpClient.Builder builder = new OkHttpClient.Builder();
    builder.connectionPool(new ConnectionPool(10, 120L, TimeUnit.SECONDS));
    this.client = builder.build();
  }

  @Override
  public ClientSil registerClient(ClientSil clientSil) {
    LOG.info("Registering client {}", clientSil);

    String stringUrl = silUrl + CLIENTS_API;
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return null;
    }

    Request request = new Request.Builder()
      .url(url)
      .post(RequestBody.create(MediaType.parse("application/json; charset=utf-8"), gson.toJson(clientSil)))
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        LOG.debug("Client created successfully → {}", clientSil);
        return clientSil;
      } else if (response.code() == 409) {
        LOG.debug("Client already registered. ");
        return null;
      } else {
        LOG.warn("Cannot create client in SIL");
        return null;
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return null;
    }


  }

  @Override
  public List<ClientSil> retrieveRegisteredClients(String clientId) {
    LOG.info("Retrieving registered clients in SIL");

    String stringUrl = silUrl + CLIENTS_API;
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return new LinkedList<>();
    }

    Request request = new Request.Builder()
      .url(url)
      .get()
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        List<ClientSil> silClients = gson.fromJson(response.body().string(), new TypeToken<List<ClientSil>>() {
        }.getType());
        LOG.debug("Clients retrieved successfully → {}", silClients);
        return silClients;
      } else {
        LOG.warn("Cannot retrieve clients in SIL");
        return new LinkedList<>();
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return new LinkedList<>();
    }
  }

  @Override
  public List<SilPlatform> retrieveRegisteredPlatforms(String clientId) {
    LOG.info("Retrieving registered platforms in SIL");

    String stringUrl = silUrl + PLATFORMS_API;
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return new LinkedList<>();
    }

    Request request = new Request.Builder()
      .url(url)
      .get()
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        List<SilPlatform> silClients = gson.fromJson(response.body().string(), new TypeToken<List<SilPlatform>>() {
        }.getType());
        LOG.debug("Platforms retrieved successfully → {}", silClients);
        return silClients;
      } else {
        LOG.warn("Cannot retrieve platforms in SIL");
        return new LinkedList<>();
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return new LinkedList<>();
    }
  }

  @Override
  public SilPlatform createPlatform(CreateSilPlatform platform, String clientId) {
    LOG.info("Creating platform in SIL");

    String stringUrl = silUrl + PLATFORMS_API;
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return null;
    }


    LOG.debug("POST {} with platform: {} and client-id: {}", stringUrl, platform, clientId);
    Request request = new Request.Builder()
      .url(url)
      .post(RequestBody.create(MediaType.parse("application/json; charset=utf-8"), gson.toJson(platform)))
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        LOG.debug("Platform created successfully → {}", platform);
        return new SilPlatform(platform.getPlatformId(), platform.getType(), platform.getBaseEndpoint(), platform.getLocation(),
          platform.getName(), platform.getUsername(), platform.getDownstreamInputAlignmentName(), platform.getDownstreamInputAlignmentVersion(),
          platform.getDownstreamOutputAlignmentName(), platform.getDownstreamOutputAlignmentVersion(), platform.getUpstreamInputAlignmentName(),
          platform.getUpstreamInputAlignmentVersion(), platform.getUpstreamOutputAlignmentName(), platform.getUpstreamOutputAlignmentVersion());
      } else {
        LOG.warn("Cannot create platform in SIL");
        return null;
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return null;
    }
  }

  @Override
  public UpdateSilPlatform updatePlatform(String platformId, UpdateSilPlatform platform, String clientId) {
    LOG.info("Updating platform in SIL");


    String stringUrl = null;
    try {
      stringUrl = silUrl + PLATFORMS_API + "/" + URLEncoder.encode(platformId, "UTF-8");
    } catch (UnsupportedEncodingException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return null;
    }
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return null;
    }

    Request request = new Request.Builder()
      .url(url)
      .put(RequestBody.create(MediaType.parse("application/json; charset=utf-8"), gson.toJson(platform)))
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        LOG.debug("Platform updated successfully → {}", platform);
        return platform;
      } else {
        LOG.warn("Cannot update platform in SIL");
        return null;
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return null;
    }
  }

  @Override
  public boolean deletePlatform(String platformId, String clientId) {
    LOG.info("Deleting platform in SIL");

    String stringUrl = null;
    try {
      stringUrl = silUrl + PLATFORMS_API + "/" + URLEncoder.encode(platformId, "UTF-8");
    } catch (UnsupportedEncodingException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return false;
    }
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return false;
    }

    Request request = new Request.Builder()
      .url(url)
      .delete()
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        LOG.debug("Platform deleted successfully → {}", platformId);
        return true;
      } else {
        LOG.warn("Cannot delete platform in SIL");
        return false;
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return false;
    }
  }

  @Override
  public boolean retrievePlatformTypes(String clientId) {
    LOG.info("Retrieving platform types clients in SIL");

    String stringUrl = silUrl + "/api/mw2mw/platform-types";
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return false;
    }

    Request request = new Request.Builder()
      .url(url)
      .get()
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        LOG.debug("Platform types request ended successfully");
        return true;
      } else {
        LOG.warn("Cannot retrieve platform types in SIL");
        return false;
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return false;
    }
  }

  @Override
  public List<SilDevice> retrieveDevices(String platformId, String clientId) {
    LOG.info("Retrieving registered clients in SIL");

    String stringUrl = null;
    try {
      stringUrl = silUrl + DEVICES_API + "?platformId=" + URLEncoder.encode(platformId, "UTF-8");
    } catch (UnsupportedEncodingException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return new LinkedList<>();
    }
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return new LinkedList<>();
    }

    Request request = new Request.Builder()
      .url(url)
      .get()
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        List<SilDevice> silClients = gson.fromJson(response.body().string(), new TypeToken<List<SilDevice>>() {
        }.getType());
        LOG.debug("Devices retrieved successfully → {}", silClients);
        return silClients;
      } else {
        LOG.warn("Cannot retrieve devices in SIL");
        return new LinkedList<>();
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return new LinkedList<>();
    }
  }

  @Override
  public SilDevice createDevice(SilDevice deviceToCreate, String clientId) {
    LOG.info("Creating device in SIL");

    String stringUrl = silUrl + DEVICES_API;
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return null;
    }

    CreateDevice createDevice = new CreateDevice(deviceToCreate);
    Request request = new Request.Builder()
      .url(url)
      .post(RequestBody.create(MediaType.parse("application/json; charset=utf-8"), gson.toJson(createDevice)))
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        LOG.debug("Device created successfully → {}", deviceToCreate);
        return deviceToCreate;
      } else {
        LOG.warn("Cannot create device in SIL");
        return null;
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return null;
    }
  }

  @Override
  public SilDevice updateDevice(SilDevice deviceToUpdate, String clientId) {
    LOG.info("Updating device in SIL");

    String stringUrl = null;
    try {
      stringUrl = silUrl + DEVICES_API + "/" + URLEncoder.encode(deviceToUpdate.getDeviceId(), "UTF-8");
    } catch (UnsupportedEncodingException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return null;
    }
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return null;
    }

    Request request = new Request.Builder()
      .url(url)
      .put(RequestBody.create(MediaType.parse("application/json; charset=utf-8"), gson.toJson(deviceToUpdate)))
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        LOG.debug("Device updated successfully → {}", deviceToUpdate);
        return deviceToUpdate;
      } else {
        LOG.warn("Cannot update device in SIL");
        return null;
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return null;
    }
  }

  @Override
  public boolean deleteDevice(String deviceId, String clientId) {
    LOG.info("Deleting device in SIL");

    String stringUrl = null;
    try {
      stringUrl = silUrl + DEVICES_API + "/" + URLEncoder.encode(deviceId, "UTF-8");
    } catch (UnsupportedEncodingException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return false;
    }
    URL url;
    try {
      url = new URL(stringUrl);
    } catch (MalformedURLException e) {
      LOG.error("Cannot perform operation over a malformed url → {}", stringUrl);
      return false;
    }

    Request request = new Request.Builder()
      .url(url)
      .delete()
      .addHeader("Client-ID", clientId)
      .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.isSuccessful()) {
        LOG.debug("Device deleted successfully → {}", deviceId);
        return true;
      } else {
        LOG.warn("Cannot delete device in SIL");
        return false;
      }
    } catch (IOException e) {
      LOG.error("{} request throws exception → {}", stringUrl, e.getMessage());
      return false;
    }
  }

}
