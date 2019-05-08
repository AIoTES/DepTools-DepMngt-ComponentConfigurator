package eu.hopu.sil.dto;

import java.util.LinkedList;
import java.util.List;

public class SilDevice {

  private List<String> deviceTypes;
  private String deviceId;
  private String hostedBy;
  private String location;
  private String name;
  private List<String> hosts;
  private List<String> forProperty;
  private String madeActuation;
  private String implementsProcedure;
  private List<String> observes;
  private String detects;
  private String madeObservation;

  public SilDevice() {
    this.deviceTypes = new LinkedList<>();
    this.deviceId = "";
    this.hostedBy = "";
    this.location = "";
    this.name = "";
    this.hosts = new LinkedList<>();
    this.forProperty = new LinkedList<>();
    this.madeActuation = "";
    this.implementsProcedure = "";
    this.observes = new LinkedList<>();
    this.detects = "";
    this.madeObservation = "";
  }

  public SilDevice(List<String> deviceTypes, String deviceId, String hostedBy, String location, String name, List<String> hosts, List<String> forProperty, String madeActuation, String implementsProcedure, List<String> observes, String detects, String madeObservation) {
    this.deviceTypes = deviceTypes;
    this.deviceId = deviceId;
    this.hostedBy = hostedBy;
    this.location = location;
    this.name = name;
    this.hosts = hosts;
    this.forProperty = forProperty;
    this.madeActuation = madeActuation;
    this.implementsProcedure = implementsProcedure;
    this.observes = observes;
    this.detects = detects;
    this.madeObservation = madeObservation;
  }

  public List<String> getDeviceTypes() {
    return deviceTypes;
  }

  public void setDeviceTypes(List<String> deviceTypes) {
    this.deviceTypes = deviceTypes;
  }

  public String getDeviceId() {
    return deviceId;
  }

  public void setDeviceId(String deviceId) {
    this.deviceId = deviceId;
  }

  public String getHostedBy() {
    return hostedBy;
  }

  public void setHostedBy(String hostedBy) {
    this.hostedBy = hostedBy;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<String> getHosts() {
    return hosts;
  }

  public void setHosts(List<String> hosts) {
    this.hosts = hosts;
  }

  public List<String> getForProperty() {
    return forProperty;
  }

  public void setForProperty(List<String> forProperty) {
    this.forProperty = forProperty;
  }

  public String getMadeActuation() {
    return madeActuation;
  }

  public void setMadeActuation(String madeActuation) {
    this.madeActuation = madeActuation;
  }

  public String getImplementsProcedure() {
    return implementsProcedure;
  }

  public void setImplementsProcedure(String implementsProcedure) {
    this.implementsProcedure = implementsProcedure;
  }

  public List<String> getObserves() {
    return observes;
  }

  public void setObserves(List<String> observes) {
    this.observes = observes;
  }

  public String getDetects() {
    return detects;
  }

  public void setDetects(String detects) {
    this.detects = detects;
  }

  public String getMadeObservation() {
    return madeObservation;
  }

  public void setMadeObservation(String madeObservation) {
    this.madeObservation = madeObservation;
  }

  @Override
  public String toString() {
    return "SilDevice{" +
      "deviceTypes=" + deviceTypes +
      ", deviceId='" + deviceId + '\'' +
      ", hostedBy='" + hostedBy + '\'' +
      ", location='" + location + '\'' +
      ", name='" + name + '\'' +
      ", hosts=" + hosts +
      ", forProperty=" + forProperty +
      ", madeActuation='" + madeActuation + '\'' +
      ", implementsProcedure='" + implementsProcedure + '\'' +
      ", observes=" + observes +
      ", detects='" + detects + '\'' +
      ", madeObservation='" + madeObservation + '\'' +
      '}';
  }

}
