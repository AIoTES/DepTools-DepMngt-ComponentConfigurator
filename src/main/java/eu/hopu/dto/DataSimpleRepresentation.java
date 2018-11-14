package eu.hopu.dto;

import com.google.gson.JsonObject;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

public class DataSimpleRepresentation {

  private String idDevice;
  private Date date;
  private String idPlatform;
  private List<String> namesValues;
  private HashMap<String, String> values;

  public DataSimpleRepresentation(String idDevice, Date date, String idPlatform, List<String> namesValues, HashMap<String, String> values) {
    this.idDevice = idDevice;
    this.date = date;
    this.idPlatform = idPlatform;
    this.namesValues = new LinkedList<>(namesValues);
    this.values = new HashMap<>(values);
  }

  public void setIdDevice(String idDevice) {
    this.idDevice = idDevice;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public void setIdPlatform(String idPlatform) {
    this.idPlatform = idPlatform;
  }

  public void setNamesValues(List<String> namesValues) {
    this.namesValues = namesValues;
  }

  public void setValues(HashMap<String, String> values) {
    this.values = values;
  }

  public Date getDate() {
    return date;
  }

  public String getValue(String nameValue) {
    return values.get(nameValue);
  }

  public List<String> getNamesValues() {
    return namesValues;
  }

  public String getIdDevice() {
    return idDevice;
  }

  public String getIdPlatform() {
    return idPlatform;
  }

  public HashMap<String, String> getValues() {
    return values;
  }

  public JsonObject getAsJson() {
    JsonObject json = new JsonObject();

    json.addProperty("Date", date.toString());
    json.addProperty("id_platform", idPlatform);
    json.addProperty("id_device", idDevice);

    for (String id : namesValues) {
      json.addProperty(id, values.get(id));
    }

    return json;
  }

}
