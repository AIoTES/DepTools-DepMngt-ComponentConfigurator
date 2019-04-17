package eu.hopu.sil.dto;

public class ClientSil {

  private String clientId;
  private String callbackUrl;
  private String receivingCapacity;
  private String responseFormat;
  private String responseDelivery;

  public ClientSil() {
  }

  public ClientSil(String clientId, String callbackUrl, String receivingCapacity, String responseFormat, String responseDelivery) {
    this.clientId = clientId;
    this.callbackUrl = callbackUrl;
    this.receivingCapacity = receivingCapacity;
    this.responseFormat = responseFormat;
    this.responseDelivery = responseDelivery;
  }

  public String getClientId() {
    return clientId;
  }

  public void setClientId(String clientId) {
    this.clientId = clientId;
  }

  public String getCallbackUrl() {
    return callbackUrl;
  }

  public void setCallbackUrl(String callbackUrl) {
    this.callbackUrl = callbackUrl;
  }

  public String getReceivingCapacity() {
    return receivingCapacity;
  }

  public void setReceivingCapacity(String receivingCapacity) {
    this.receivingCapacity = receivingCapacity;
  }

  public String getResponseFormat() {
    return responseFormat;
  }

  public void setResponseFormat(String responseFormat) {
    this.responseFormat = responseFormat;
  }

  public String getResponseDelivery() {
    return responseDelivery;
  }

  public void setResponseDelivery(String responseDelivery) {
    this.responseDelivery = responseDelivery;
  }

  @Override
  public String toString() {
    return "ClientSil{" +
      "clientId='" + clientId + '\'' +
      ", callbackUrl='" + callbackUrl + '\'' +
      ", receivingCapacity='" + receivingCapacity + '\'' +
      ", responseFormat='" + responseFormat + '\'' +
      ", responseDelivery='" + responseDelivery + '\'' +
      '}';
  }

}
