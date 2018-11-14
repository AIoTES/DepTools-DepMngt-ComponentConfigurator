package eu.hopu.dto;

import com.google.gson.JsonObject;

public class OntologyEvent {
  private String idDevice;
  private JsonObject dataLinkedRepresentation;

  public OntologyEvent() {
  }

  public OntologyEvent(String idDevice, JsonObject dataLinkedRepresentation) {
    this.idDevice = idDevice;
    this.dataLinkedRepresentation = dataLinkedRepresentation;
  }

  public String getIdDevice() {
    return idDevice;
  }

  public void setIdDevice(String idDevice) {
    this.idDevice = idDevice;
  }

  public JsonObject getDataLinkedRepresentation() {
    return dataLinkedRepresentation;
  }

  public void setDataLinkedRepresentation(JsonObject dataLinkedRepresentation) {
    this.dataLinkedRepresentation = dataLinkedRepresentation;
  }

}
