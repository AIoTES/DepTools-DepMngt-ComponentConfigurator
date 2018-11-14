package eu.hopu.serializer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import eu.hopu.dto.DataLinkedRepresentation;
import eu.hopu.dto.DataSimpleRepresentation;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;

public class OntologySerializer {
  private String inputStream;
  private JsonObject jsonGeneral;
  private String type;

  private static HashMap<String, String> labelsValue = new HashMap<>();

  public OntologySerializer(String inputStream) {
    this.inputStream = inputStream;
    JsonParser parser = new JsonParser();
    jsonGeneral = parser.parse(inputStream).getAsJsonObject();
    loadContext(jsonGeneral);
  }

  public DataLinkedRepresentation buildDataLinkedRepresentation(String deviceId) {
    JsonArray metadata = getMetadata("InterIoT", jsonGeneral);
    JsonArray payload = getPayload("InterIoT", jsonGeneral);
    return new DataLinkedRepresentation(deviceId, jsonGeneral, metadata, payload);
  }

  public DataSimpleRepresentation buildDataSimpleRepresentation() {
    JsonArray metadata = getMetadata("InterIoT", jsonGeneral);
    if (isObservation(metadata)) {
      String idPlatform = getPlatform(metadata);
      JsonArray payload = getPayload("InterIoT", jsonGeneral);
      Date date = getDate(payload);
      String idDevice = getDevice(payload);

      String hashResultId = getHashResult(payload);
      HashMap<String, String> map = getIdsValues(payload, hashResultId);

      HashMap<String, String> map2 = new HashMap<>();

      LinkedList<String> namesValues = new LinkedList<>(map.keySet());

      for (String idValue : namesValues) {
        map2.put(idValue, getValue(payload, map.get(idValue)));
      }

      return new DataSimpleRepresentation(idDevice, date, idPlatform, namesValues, map2);
    }
    else
      return null;
  }

  public void loadContext(JsonObject json) {
    labelsValue.clear();

    JsonObject js = json.get("@context").getAsJsonObject();
    for (String key : js.keySet()) {
      labelsValue.put(key, js.get(key).getAsString());
    }
  }


  public boolean isObservation(JsonArray jsonArr) {
    boolean isObservation = false;
    JsonArray arr = jsonArr.get(0).getAsJsonObject().get("@type").getAsJsonArray();
    for (int i = 0; i < arr.size(); i++) {
      if (arr.get(i).getAsString().equals("Observation"))
        isObservation = true;
    }
    return isObservation;
  }

  public JsonArray getMetadata(String type, JsonObject json) {
    if (!json.has("@id")) {
      JsonArray arr = json.getAsJsonArray("@graph");
      for (int i = 0; i < arr.size(); i++) {
        if (arr.get(i).getAsJsonObject().get("@id").getAsString().equals(type + ":message/metadata"))
          return arr.get(i).getAsJsonObject().getAsJsonArray("@graph");
      }
    }
    else {
      if (json.get("@id").getAsString().equals(type + ":message/metadata"))
        return json.getAsJsonArray("@graph");
    }
    return null;
  }

  public JsonArray getPayload(String type, JsonObject json) {
    JsonArray arr = json.getAsJsonArray("@graph");
    for (int i = 0; i < arr.size(); i++) {
      if (arr.get(i).getAsJsonObject().get("@id").getAsString().equals(type + ":message/payload"))
        return arr.get(i).getAsJsonObject().getAsJsonArray("@graph");
    }
    return null;
  }

  public String getHashResult(JsonArray json) {
    String hashResult = "";
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@type").isJsonPrimitive() && json.get(i).getAsJsonObject().get("@type").getAsString().equals("sosa:Observation")) {
        hashResult = json.get(i).getAsJsonObject().get("sosa:hasResult").getAsJsonObject().get("@id").getAsString();
      }
    }
    return hashResult;
  }

  public String getDevice(JsonArray json) {
    String device = "";
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@type").isJsonPrimitive() && json.get(i).getAsJsonObject().get("@type").getAsString().equals("sosa:Observation")) {
        String[] s = json.get(i).getAsJsonObject().get("sosa:madeBySensor").getAsJsonObject().get("@id").getAsString().split(":");
        if (labelsValue.containsKey(s[0]))
          s[0] = labelsValue.get(s[0]);
        device = s[0] + ':' + s[1];
      }
    }
    return device;
  }

  public Date getDate(JsonArray json) {
    String idT = null;
    String idT2 = null;
    Date date = null;
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@type").isJsonPrimitive() && json.get(i).getAsJsonObject().get("@type").getAsString().equals("sosa:Observation")) {
        idT = json.get(i).getAsJsonObject().get("sosa:phenomenonTime").getAsJsonObject().get("@id").getAsString();
        break;
      }
    }

    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@id").getAsString().equals(idT)) {
        idT2 = json.get(i).getAsJsonObject().get("http://www.w3.org/2006/time#inTimePosition").getAsJsonObject().get("@id").getAsString();
        break;
      }
    }

    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@id").getAsString().equals(idT2)) {
        String value = json.get(i).getAsJsonObject().get("http://www.w3.org/2006/time#numericPosition").getAsJsonObject().get("@value").getAsString();
        date = new Date(Long.parseLong(value));
        break;
      }
    }
    return date;
  }

  public HashMap<String, String> getIdsValues(JsonArray json, String hashResultId) {
    HashMap<String, String> map = new HashMap<String, String>();

    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@id").getAsString().equals(hashResultId)) {
        JsonObject js2 = json.get(i).getAsJsonObject();

        String val1 = "http://ontology.universaal.org/HealthMeasurement.owl#diatolicBloodPreassure";
        String val2 = "http://ontology.universaal.org/HealthMeasurement.owl#systolicBloodPreassure";

        map.put(val1.split("#")[1], js2.get(val1).getAsJsonObject().get("@id").getAsString());
        map.put(val2.split("#")[1], js2.get(val2).getAsJsonObject().get("@id").getAsString());
      }
    }
    return map;
  }

  public String getValue(JsonArray json, String idValue) {
    String value = "";
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@id").getAsString().equals(idValue)) {
        value = json.get(i).getAsJsonObject().get("http://ontology.universaal.org/Measurement.owl#value").getAsJsonObject().get("@value").getAsString();
      }
    }
    return value;
  }

  public String getPlatform(JsonArray json) {
    String[] s = json.get(0).getAsJsonObject().get("SenderPlatformId").getAsJsonObject().get("@id").getAsString().split(":");
    if (labelsValue.containsKey(s[0]))
      s[0] = labelsValue.get(s[0]);
    String platform = s[0] + ':' + s[1];


    return platform;
  }
}
