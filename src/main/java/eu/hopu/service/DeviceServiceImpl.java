package eu.hopu.service;

import eu.hopu.dto.DataLinkedRepresentation;
import eu.hopu.dto.DataSimpleRepresentation;
import eu.hopu.storage.MeasuresStorage;

import java.util.List;

public class DeviceServiceImpl {
    private MeasuresStorage storage;

    public DeviceServiceImpl() {
        storage = MeasuresStorage.getInstance();
    }

    public void addValue(String devId, DataSimpleRepresentation value) {
        storage.addValue(devId, value);
    }

    public DataSimpleRepresentation getLastValueById(String devId) { return storage.getLastValueById(devId); }

    public List<DataSimpleRepresentation> getSimpleRepresentationValuesByDevId(String devId) { return storage.getSimpleRepresentationValuesByDevId(devId); }

    public void addOntologyValue(String devId, DataLinkedRepresentation value) { storage.addOntologyValue(devId, value); }

    public DataLinkedRepresentation getLastOntologyById(String devId) {
        return storage.getLastOntologyById(devId);
    }

    public List<DataLinkedRepresentation> getLinkedRepresentationOntologiesByDevId(String devId) {
        return storage.getLinkedRepresentationOncologistByDevId(devId);
    }
}
