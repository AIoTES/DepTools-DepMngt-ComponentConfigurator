package eu.hopu.sil;

import eu.hopu.servlets.dto.SilPlatform;
import eu.hopu.sil.dto.ClientSil;
import eu.hopu.utils.HopAsserts;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import java.util.LinkedList;
import java.util.List;

//These tests should be ignored when the tool is compiled.
//These tests checks the integration with the SIL API
@Ignore
public class SilOkHttpClientTest {

  private SilClient client;
  private String clientId;

  @Before
  public void setUp() throws Exception {
    client = new SilOkHttpClient("http://192.168.1.192:8080");
    clientId = "Oscar";
  }

  @Test
  public void retrieveRegisteredClients() {
    List<ClientSil> actual = client.retrieveRegisteredClients(clientId);
    List<ClientSil> expected = new LinkedList<>();
    expected.add(new ClientSil("Oscar", "http://192.168.1.192:8002/api/v1/notify", "5", "JSON_LD", "SERVER_PUSH"));
    expected.add(new ClientSil("Pedro", "http://192.168.1.192:8002/api/v1/notify", "5", "JSON_LD", "CLIENT_PULL"));

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void retrieveSilPlatforms() {
    List<SilPlatform> actual = client.retrieveRegisteredPlatforms(clientId);
    List<SilPlatform> expected = new LinkedList<>();
    expected.add(new SilPlatform("http://example.inter-iot.eu/platforms/UAAL", "http://inter-iot.eu/UniversAAL",
      "http://172.17.0.1:4568", "http://test.inter-iot.eu/TestLocation", "UniversAAL", "",
      "", "", "", "",
      "", "", "", "",
      "", ""));

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void createPlatform() {
    SilPlatform expected = new SilPlatform("http://example.inter-iot.eu/platforms/UAAL2", "http://inter-iot.eu/UniversAAL",
      "http://172.17.0.1:4568", "http://test.inter-iot.eu/TestLocation", "UniversAAL2", "",
      "", "", "", "",
      "", "", "", "",
      "", "");
    SilPlatform actual = client.createPlatform(expected, clientId);

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void updatePlatform() {
    SilPlatform expected = new SilPlatform("http://example.inter-iot.eu/platforms/UAAL2", "http://inter-iot.eu/UniversAAL",
      "http://172.17.0.1:4568", "http://test.inter-iot.eu/TestLocation", "UniversAAL2", "",
      "", "", "", "",
      "", "", "", "",
      "", "");
    client.createPlatform(expected, clientId);
    expected.setUsername("userName");
    SilPlatform actual = client.updatePlatform(expected, clientId);

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void deletePlatform() {
    SilPlatform expected = new SilPlatform("http://example.inter-iot.eu/platforms/UAAL2", "http://inter-iot.eu/UniversAAL",
      "http://172.17.0.1:4568", "http://test.inter-iot.eu/TestLocation", "UniversAAL2", "",
      "", "", "", "",
      "", "", "", "",
      "", "");
    client.createPlatform(expected, clientId);
    boolean result = client.deletePlatform("http://example.inter-iot.eu/platforms/UAAL2", clientId);

    Assert.assertTrue(result);
  }

  @Test
  public void retrievePlatformTypes() {
    boolean result = client.retrievePlatformTypes(clientId);
    Assert.assertTrue(result);
  }

}
