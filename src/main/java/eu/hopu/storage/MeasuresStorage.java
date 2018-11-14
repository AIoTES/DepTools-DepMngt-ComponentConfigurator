package eu.hopu.storage;

import eu.hopu.dto.DataLinkedRepresentation;
import eu.hopu.dto.DataSimpleRepresentation;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

public class MeasuresStorage {
    private static MeasuresStorage singleton;

    private HashMap<String, List<DataSimpleRepresentation>> dataSimpleRepresentation;
    private HashMap<String, List<DataLinkedRepresentation>> dataLinkedRepresentation;

    private HashMap<String, DataSimpleRepresentation> lastValues;
    private HashMap<String, DataLinkedRepresentation> lastOntology;

    private MeasuresStorage() {
        dataSimpleRepresentation = new HashMap<>();
        dataLinkedRepresentation = new HashMap<>();
        lastValues = new HashMap<>();
        lastOntology = new HashMap<>();
    }

    public static MeasuresStorage getInstance() {
        if (singleton == null)
            singleton = new MeasuresStorage();
        return singleton;
    }

    public void addValue(String devId, DataSimpleRepresentation value) {
        if (!dataSimpleRepresentation.containsKey(devId)) {
            dataSimpleRepresentation.put(devId, new LinkedList<>());
        }
        dataSimpleRepresentation.get(devId).add(value);
        lastValues.put(devId, value);
    }

    public void addOntologyValue(String devId, DataLinkedRepresentation value) {
        if (!dataLinkedRepresentation.containsKey(devId)) {
            dataLinkedRepresentation.put(devId, new LinkedList<>());
        }
        dataLinkedRepresentation.get(devId).add(value);
        lastOntology.put(devId, value);
    }

    public List<DataSimpleRepresentation> getSimpleRepresentationValuesByDevId(String devId) { return dataSimpleRepresentation.get(devId); }

    public List<DataLinkedRepresentation> getLinkedRepresentationOncologistByDevId(String devId) { return dataLinkedRepresentation.get(devId); }

    public DataSimpleRepresentation getLastValueById(String devId) { return lastValues.get(devId); }

    public DataLinkedRepresentation getLastOntologyById(String devId) { return lastOntology.get(devId); }

    public List<String> getIdValues() {
        List<String> idValues = new LinkedList<>(dataSimpleRepresentation.keySet());
        return idValues;
    }
}
