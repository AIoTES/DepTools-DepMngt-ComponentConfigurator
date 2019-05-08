package eu.hopu.sil;

import eu.hopu.servlets.dto.CreateSilPlatform;
import eu.hopu.servlets.dto.SilPlatform;
import eu.hopu.servlets.dto.UpdateSilPlatform;
import eu.hopu.sil.dto.ClientSil;
import eu.hopu.sil.dto.SilDevice;
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
    client = new SilOkHttpClient("http://192.168.1.56:8080");
    clientId = "Oscar";
  }

  @Test
  public void retrieveRegisteredClients() {
    List<ClientSil> actual = client.retrieveRegisteredClients(clientId);
    List<ClientSil> expected = new LinkedList<>();
    expected.add(new ClientSil("Oscar", "http://192.168.1.56:5678/api/v1/notify", "5", "JSON_LD", "SERVER_PUSH"));
    expected.add(new ClientSil("Pedro", "http://192.168.1.56:5678/api/v1/notify", "5", "JSON_LD", "SERVER_PUSH"));

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void retrieveSilPlatforms() {
    List<SilPlatform> actual = client.retrieveRegisteredPlatforms(clientId);
    List<SilPlatform> expected = new LinkedList<>();
    expected.add(new SilPlatform("http://example.inter-iot.eu/platforms/UAAL", "http://inter-iot.eu/UniversAAL",
      "http://172.17.0.1:4568", "http://test.inter-iot.eu/TestLocation", "UniversAAL", "",
      "", "", "", "",
      "", "", "", ""));

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void createPlatform() {
    CreateSilPlatform createRequest = new CreateSilPlatform("http://example.inter-iot.eu/platforms/UAAL2", "http://inter-iot.eu/UniversAAL",
      "http://172.17.0.1:4568", "http://test.inter-iot.eu/TestLocation", "UniversAAL2", "",
      "", "", "", "",
      "", "", "", "",
      "", "");
    SilPlatform actual = client.createPlatform(createRequest, clientId);
    SilPlatform expected = new SilPlatform("http://example.inter-iot.eu/platforms/UAAL2", "http://inter-iot.eu/UniversAAL",
      "http://172.17.0.1:4568", "http://test.inter-iot.eu/TestLocation", "UniversAAL2", "",
      "", "", "", "",
      "", "", "", "");

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void updatePlatform() {
    UpdateSilPlatform expected = new UpdateSilPlatform(
      "http://172.17.0.1:4568", "http://test.inter-iot.eu/TestLocation", "UniversAAL2", "userNume",
      "", "", "", "",
      "", "", "", "",
      "", "");
    UpdateSilPlatform actual = client.updatePlatform("http://example.inter-iot.eu/platforms/UAAL2", expected, clientId);

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void deletePlatform() {
    boolean result = client.deletePlatform("http://example.inter-iot.eu/platforms/UAAL2", clientId);
    Assert.assertTrue(result);
  }

  @Test
  public void retrievePlatformTypes() {
    boolean result = client.retrievePlatformTypes(clientId);
    Assert.assertTrue(result);
  }

  @Test
  public void retrieveDevices() {
    List<SilDevice> actual = client.retrieveDevices("http://example.inter-iot.eu/platforms/UAAL", clientId);
    List<SilDevice> expected = new LinkedList<>();
    List<String> deviceTypes = new LinkedList<>();
    deviceTypes.add("DEVICE");
    expected.add(new SilDevice(deviceTypes, "http://example.inter-iot.eu/devices/Device1", "http://example.inter-iot.eu/platforms/UAAL",
      "http://test.inter-iot.eu/TestLocation", "Device1", new LinkedList<>(), new LinkedList<>(), null, null, new LinkedList<>(), null, null));

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void createDevice() {
    List<String> deviceTypes = new LinkedList<>();
    deviceTypes.add("DEVICE");
    SilDevice expected = new SilDevice(deviceTypes, "http://example.inter-iot.eu/devices/Device3", "http://example.inter-iot.eu/platforms/UAAL",
      "http://test.inter-iot.eu/TestLocation", "Device2", new LinkedList<>(), new LinkedList<>(), "", "", new LinkedList<>(), "", "");
    SilDevice actual = client.createDevice(expected, clientId);

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void updateDevice() {
    List<String> deviceTypes = new LinkedList<>();
    deviceTypes.add("DEVICE");
    SilDevice expected = new SilDevice(deviceTypes, "http://example.inter-iot.eu/devices/Device2", "http://example.inter-iot.eu/platforms/UAAL",
      "http://test.inter-iot.eu/TestLocation", "Device3", new LinkedList<>(), new LinkedList<>(), "", "", new LinkedList<>(), "", "");
    SilDevice actual = client.updateDevice(expected, clientId);

    HopAsserts.assertEqualsJson(expected, actual);
  }

  @Test
  public void deleteDevice() {
    boolean result = client.deleteDevice("http://example.inter-iot.eu/devices/Device3", clientId);
    Assert.assertTrue(result);
  }

}
