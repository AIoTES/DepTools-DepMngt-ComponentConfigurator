package eu.hopu.sil.dto;

import java.util.LinkedList;

public class CreateDevice {

  private LinkedList<SilDevice> devices;

  public CreateDevice(SilDevice deviceToCreate) {
    this.devices = new LinkedList<>();
    this.devices.add(deviceToCreate);
  }

  public LinkedList<SilDevice> getDevices() {
    return devices;
  }

  public void setDevices(LinkedList<SilDevice> devices) {
    this.devices = devices;
  }

  @Override
  public String toString() {
    return "CreateDevice{" +
      "devices=" + devices +
      '}';
  }

}
