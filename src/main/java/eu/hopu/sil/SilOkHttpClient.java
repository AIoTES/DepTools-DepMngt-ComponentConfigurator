package eu.hopu.sil;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import eu.hopu.servlets.dto.CreateSilPlatform;
import eu.hopu.servlets.dto.SilPlatform;
import eu.hopu.servlets.dto.UpdateSilPlatform;
import eu.hopu.sil.dto.ClientSil;
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

  private static String CLIENTS_API = "/api/mw2mw/clients";
  private static String PLATFORMS_API = "/api/mw2mw/platforms";

  private String silUrl;
  private Gson gson;
  private OkHttpClient client;

  public SilOkHttpClient(String silUrl) {
    this.silUrl = silUrl;
    this.gson = new Gson();
    OkHttpClient.Builder builder = new OkHttpClient.Builder();
    builder.connectionPool(new ConnectionPool(10, 60L, TimeUnit.SECONDS));
    this.client = builder.build();
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

}