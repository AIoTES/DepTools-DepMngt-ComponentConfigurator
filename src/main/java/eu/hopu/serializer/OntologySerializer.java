package eu.hopu.serializer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import eu.hopu.dto.DataLinkedRepresentation;
import eu.hopu.dto.DataSimpleRepresentation;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

public class OntologySerializer {
  private JsonObject jsonGeneral;

  private HashMap<String, String> labelsValue = new HashMap<>();

  public OntologySerializer(String inputStream) {
    JsonParser parser = new JsonParser();
    jsonGeneral = parser.parse(inputStream).getAsJsonObject();
    loadContext(jsonGeneral);
  }

  public DataLinkedRepresentation buildDataLinkedRepresentation(String deviceId) {
    JsonArray metadata = getMetadata();
    JsonArray payload = getPayload();
    return new DataLinkedRepresentation(deviceId, jsonGeneral, metadata, payload);
  }

  public DataSimpleRepresentation buildDataSimpleRepresentation() {
    JsonArray metadata = getMetadata();
    if (metadata != null && isObservation(metadata)) {
      String idPlatform = getPlatform(metadata);
      JsonArray payload = getPayload();
      if (payload != null) {
        String idDevice;
        Date date;
        List<String> namesValues = new LinkedList<>();
        HashMap<String, String> mapValues = new HashMap<>();

        if (idPlatform.split(":")[1].equals("platforms/uaal")) {
          date = getDate(payload);
          idDevice = getDevice(payload);

          List<String> hashResultId = getHashResult(payload);

          mapValues.putAll(getValues(payload, hashResultId));
          namesValues.addAll(mapValues.keySet());
        } else {
          date = getDateSOFIA2(payload);
          idDevice = getDeviceSOFIA2(payload);

          String nameValue = getNameValueSOFIA2(payload);
          mapValues.putAll(getValuesSOFIA2(payload, nameValue));
          namesValues.add(nameValue);
        }
        return new DataSimpleRepresentation(idDevice, date, idPlatform, namesValues, mapValues);
      }
    }
    return null;
  }

  private void loadContext(JsonObject json) {
    labelsValue.clear();

    JsonObject js = json.get("@context").getAsJsonObject();
    for (String key : js.keySet()) {
      labelsValue.put(key, js.get(key).getAsString());
    }
  }

  private String getDevice(JsonArray json) {
    String device = "";
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@type").isJsonPrimitive() && json.get(i).getAsJsonObject().get("@type").getAsString().equals("sosa:Observation")) {
        device = json.get(i).getAsJsonObject().get("sosa:madeBySensor").getAsJsonObject().get("@id").getAsString();
      }
    }
    return device;
  }

  private String getDeviceSOFIA2(JsonArray json) {
    String device = "";
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().has("InterIoT:syntax/SOFIA2#hasName") && json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasName").getAsString().equals("idDispositivo")) {
        device = json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasValue").getAsString();
      }
    }
    return device;
  }

  private Date getDate(JsonArray json) {
    Date date = null;
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@type").isJsonPrimitive()) {
        String type = json.get(i).getAsJsonObject().get("@type").getAsString();
        if (type.equals("sosa:Observation")) {
          String idT = json.get(i).getAsJsonObject().get("sosa:phenomenonTime").getAsJsonObject().get("@id").getAsString();
          for (int j = 0; j < json.size(); j++) {
            if (json.get(j).getAsJsonObject().get("@id").getAsString().equals(idT)) {
              String idT2 = json.get(j).getAsJsonObject().get("http://www.w3.org/2006/time#inTimePosition").getAsJsonObject().get("@id").getAsString();
              for (int k = 0; k < json.size(); k++) {
                if (json.get(k).getAsJsonObject().get("@id").getAsString().equals(idT2)) {
                  String value = json.get(k).getAsJsonObject().get("http://www.w3.org/2006/time#numericPosition").getAsJsonObject().get("@value").getAsString();
                  date = new Date(Long.parseLong(value));
                  break;
                }
              }
              break;
            }
          }
          break;
        } else if (type.equals("http://ontology.universAAL.org/Context.owl#ContextEvent")) {
          String value = json.get(i).getAsJsonObject().get("http://ontology.universAAL.org/Context.owl#hasTimestamp").getAsJsonObject().get("@value").getAsString();
          date = new Date(Long.parseLong(value));
          break;
        }
      }
    }
    return date;
  }

  private Date getDateSOFIA2(JsonArray json) {
    Date date = null;
    String id = "";
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().has("@type") && json.get(i).getAsJsonObject().get("@type").isJsonPrimitive()) {
        if (json.get(i).getAsJsonObject().get("@type").getAsString().equals("InterIoT:syntax/SOFIA2#Attribute")) {
          if (json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasName").getAsString().equals("fechaRegistro")) {
            id = json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasValue").getAsJsonObject().get("@id").getAsString();
            break;
          }
        }
      }
    }
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@id").getAsString().equals(id)) {
        id = json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasAttribute").getAsJsonObject().get("@id").getAsString();
        break;
      }
    }
    for (int i = 0; i < json.size(); i++)
      if (json.get(i).getAsJsonObject().get("@id").getAsString().equals(id)) {
        String value = json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasValue").getAsString();
//        date = new Date(value);
        date = new Date();
        break;
      }

    return date;
  }

  private boolean isObservation(JsonArray jsonArr) {
    boolean isObservation = false;
    JsonArray arr = jsonArr.get(0).getAsJsonObject().get("@type").getAsJsonArray();
    for (int i = 0; i < arr.size(); i++) {
      if (arr.get(i).getAsString().equals("Observation") || arr.get(i).getAsString().equals("InterIoT:message/Observation"))
        isObservation = true;
    }
    return isObservation;
  }

  private JsonArray getMetadata() {
    if (jsonGeneral.has("@id"))
      return jsonGeneral.getAsJsonArray("@graph");
    else {
      JsonArray arr = jsonGeneral.getAsJsonArray("@graph");
      for (int i = 0; i < arr.size(); i++) {
        if (arr.get(i).getAsJsonObject().get("@id").getAsString().equals("InterIoT:message/metadata"))
          return arr.get(i).getAsJsonObject().getAsJsonArray("@graph");
      }
    }
    return null;
  }

  private JsonArray getPayload() {
    JsonArray arr = jsonGeneral.getAsJsonArray("@graph");
    for (int i = 0; i < arr.size(); i++) {
      if (arr.get(i).getAsJsonObject().get("@id").getAsString().equals("InterIoT:message/payload"))
        return arr.get(i).getAsJsonObject().getAsJsonArray("@graph");
    }
    return null;
  }

  private List<String> getHashResult(JsonArray json) {
    List<String> hashResult = new LinkedList<>();
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().get("@type").isJsonPrimitive()) {
        String type = json.get(i).getAsJsonObject().get("@type").getAsString();
        if (type.equals("sosa:Observation")) {
          if (json.get(i).getAsJsonObject().get("sosa:hasResult").isJsonObject())
            hashResult.add(json.get(i).getAsJsonObject().get("sosa:hasResult").getAsJsonObject().get("@id").getAsString());
          else if (json.get(i).getAsJsonObject().get("sosa:hasResult").isJsonArray()) {
            JsonArray jarr = json.get(i).getAsJsonObject().get("sosa:hasResult").getAsJsonArray();
            for (int j = 0; j < jarr.size(); j++)
              hashResult.add(jarr.get(j).getAsJsonObject().get("@id").getAsString());
          }
        } else if (type.equals("http://ontology.universAAL.org/Context.owl#ContextEvent")) {
          hashResult.add(json.get(i).getAsJsonObject().get("http://www.w3.org/1999/02/22-rdf-syntax-ns#object").getAsJsonObject().get("@id").getAsString());
        }
      }
    }
    return hashResult;
  }

  private String getNameValueSOFIA2(JsonArray json) {
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().has("@type") && json.get(i).getAsJsonObject().get("@type").isJsonPrimitive()) {
        String type = json.get(i).getAsJsonObject().get("@type").getAsString();
        if (json.get(i).getAsJsonObject().has("InterIoT:syntax/SOFIA2#hasName")) {
          String hasName = json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasName").getAsString();
          if (type.equals("InterIoT:syntax/SOFIA2#Attribute") && hasName.equals("tipo")) {
            return json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasValue").getAsString();
          }
        }
      }
    }
    return "";
  }

  private HashMap<String, String> getValues(JsonArray json, List<String> hashResultId) {
    HashMap<String, String> values = new HashMap<>();

    for (int i = 0; i < json.size(); i++) {
      if (hashResultId.contains(json.get(i).getAsJsonObject().get("@id").getAsString())) {
        String value;
        String nameValue = "";
        JsonObject js2 = json.get(i).getAsJsonObject();

        value = js2.get("iiot:hasValue").getAsJsonObject().get("@value").getAsString();
        JsonArray arr = js2.get("@type").getAsJsonArray();
        for (int j = 0; j < arr.size(); j++) {
          String type = arr.get(j).getAsString();
          if (type.split("#")[0].equals("InterIoT:medex") || type.split("#")[0].equals("http://ontology.universaal.org/HealthMeasurement.owl")) {
            nameValue = type.split("#")[1];
            break;
          }
        }
        values.put(nameValue, value);
      }
    }
    return values;
  }

  private HashMap<String, String> getValuesSOFIA2(JsonArray json, String nameValue) {
    HashMap<String, String> values = new HashMap<>();
    for (int i = 0; i < json.size(); i++) {
      if (json.get(i).getAsJsonObject().has("@type") && json.get(i).getAsJsonObject().get("@type").isJsonPrimitive()) {
        String type = json.get(i).getAsJsonObject().get("@type").getAsString();
        if (json.get(i).getAsJsonObject().has("InterIoT:syntax/SOFIA2#hasName")) {
          String hasName = json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasName").getAsString();
          if (type.equals("InterIoT:syntax/SOFIA2#Attribute") && hasName.equals("valor")) {
            values.put(nameValue, json.get(i).getAsJsonObject().get("InterIoT:syntax/SOFIA2#hasValue").getAsString());
            break;
          }
        }
      }
    }
    return values;
  }

  private String getPlatform(JsonArray json) {
    String s = "";
    if (json.get(0).getAsJsonObject().has("SenderPlatformId"))
      s = json.get(0).getAsJsonObject().get("SenderPlatformId").getAsJsonObject().get("@id").getAsString();
    else if (json.get(0).getAsJsonObject().has("InterIoT:message/SenderPlatformId"))
      s = json.get(0).getAsJsonObject().get("InterIoT:message/SenderPlatformId").getAsJsonObject().get("@id").getAsString();

    return s;
  }
}
