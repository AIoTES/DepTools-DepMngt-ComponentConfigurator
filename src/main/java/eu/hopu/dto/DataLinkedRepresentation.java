package eu.hopu.dto;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class DataLinkedRepresentation {

  private String deviceId;
  private JsonObject jsonComplete;
  private JsonArray metadata;
  private JsonArray payload;

  public DataLinkedRepresentation() {
  }

  public DataLinkedRepresentation(String deviceId, JsonObject json, JsonArray metadata, JsonArray payload) {
    this.deviceId = deviceId;
    jsonComplete = json;
    this.metadata = metadata;
    this.payload = payload;
  }


  public String getDeviceId() {
    return deviceId;
  }

  public void setDeviceId(String deviceId) {
    this.deviceId = deviceId;
  }

  public void setJsonComplete(JsonObject jsonComplete) {
    this.jsonComplete = jsonComplete;
  }

  public void setMetadata(JsonArray metadata) {
    this.metadata = metadata;
  }

  public void setPayload(JsonArray payload) {
    this.payload = payload;
  }

  public JsonArray getMetadata() {
    return metadata;
  }

  public JsonObject getJsonComplete() {
    return jsonComplete;
  }

  public JsonArray getPayload() {
    return payload;
  }

}
