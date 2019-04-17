package eu.hopu.serializer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import eu.hopu.storage.MeasuresStorage;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

public class OntologySerializer {
  private JsonObject jsonGeneral;

  private HashMap<String, String> labelsValue = new HashMap<>();

  public OntologySerializer(String inputStream) {
    JsonParser parser = new JsonParser();
    jsonGeneral = parser.parse(inputStream).getAsJsonArray().get(0).getAsJsonObject();
    loadContext(jsonGeneral);
  }

  public List<String> buildTypesPlatforms() {
    List<String> types = new LinkedList<String>();
    JsonArray payload = getPayload();
    if (payload != null) {
      JsonArray ids = payload.get(0).getAsJsonObject().get("http://www.w3.org/1999/02/22-rdf-syntax-ns#type").getAsJsonArray();
      for (int i = 0; i < ids.size(); i++) {
        String id = ids.get(i).getAsJsonObject().get("@id").getAsString();
        String[] separate = id.split(":");
        if (labelsValue.containsKey(separate[0]))
          types.add(labelsValue.get(separate[0]) + separate[1]);
      }
      return types;
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

  private JsonArray getPayload() {
    JsonArray arr = jsonGeneral.getAsJsonArray("@graph");
    for (int i = 0; i < arr.size(); i++) {
      if (arr.get(i).getAsJsonObject().get("@id").getAsString().equals("msg:payload"))
        return arr.get(i).getAsJsonObject().getAsJsonArray("@graph");
    }
    return null;
  }

}
