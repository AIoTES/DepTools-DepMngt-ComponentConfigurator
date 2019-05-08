package eu.hopu.servlets.dto;

public class ClientIdDto {
  private String clientId;

  public ClientIdDto() {
  }

  public ClientIdDto(String clientId) {
    this.clientId = clientId;
  }

  public String getClientId() {
    return clientId;
  }

  public void setClientId(String clientId) {
    this.clientId = clientId;
  }

  @Override
  public String toString() {
    return "ClientIdDto{" +
      "clientId='" + clientId + '\'' +
      '}';
  }

}
