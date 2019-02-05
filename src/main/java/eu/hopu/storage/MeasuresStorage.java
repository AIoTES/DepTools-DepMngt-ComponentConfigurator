package eu.hopu.storage;

import java.util.LinkedList;
import java.util.List;

public class MeasuresStorage {
    private static MeasuresStorage singleton;

    private List<String> typesPlatform;

    private MeasuresStorage() {
      typesPlatform = new LinkedList<>();
    }

    public static MeasuresStorage getInstance() {
        if (singleton == null)
            singleton = new MeasuresStorage();
        return singleton;
    }

    public void addType(String type) {
      if (!typesPlatform.contains(type))
        typesPlatform.add(type);
    }

    public List<String> getTypesPlatform() {
      return typesPlatform;
    }
}
