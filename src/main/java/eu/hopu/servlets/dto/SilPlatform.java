package eu.hopu.servlets.dto;

public class SilPlatform {

  private String platformId;
  private String type;
  private String baseEndpoint;
  private String location;
  private String name;
  private String username;
  private String encryptedPassword;
  private String encryptionAlgorithm;
  private String downstreamInputAlignmentName;
  private String downstreamInputAlignmentVersion;
  private String downstreamOutputAlignmentName;
  private String downstreamOutputAlignmentVersion;
  private String upstreamInputAlignmentName;
  private String upstreamInputAlignmentVersion;
  private String upstreamOutputAlignmentName;
  private String upstreamOutputAlignmentVersion;

  public SilPlatform() {
  }

  public SilPlatform(String platformId, String type, String baseEndpoint, String location, String name, String username, String encryptedPassword, String encryptionAlgorithm, String downstreamInputAlignmentName, String downstreamInputAlignmentVersion, String downstreamOutputAlignmentName, String downstreamOutputAlignmentVersion, String upstreamInputAlignmentName, String upstreamInputAlignmentVersion, String upstreamOutputAlignmentName, String upstreamOutputAlignmentVersion) {
    this.platformId = platformId;
    this.type = type;
    this.baseEndpoint = baseEndpoint;
    this.location = location;
    this.name = name;
    this.username = username;
    this.encryptedPassword = encryptedPassword;
    this.encryptionAlgorithm = encryptionAlgorithm;
    this.downstreamInputAlignmentName = downstreamInputAlignmentName;
    this.downstreamInputAlignmentVersion = downstreamInputAlignmentVersion;
    this.downstreamOutputAlignmentName = downstreamOutputAlignmentName;
    this.downstreamOutputAlignmentVersion = downstreamOutputAlignmentVersion;
    this.upstreamInputAlignmentName = upstreamInputAlignmentName;
    this.upstreamInputAlignmentVersion = upstreamInputAlignmentVersion;
    this.upstreamOutputAlignmentName = upstreamOutputAlignmentName;
    this.upstreamOutputAlignmentVersion = upstreamOutputAlignmentVersion;
  }

  public String getPlatformId() {
    return platformId;
  }

  public void setPlatformId(String platformId) {
    this.platformId = platformId;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getBaseEndpoint() {
    return baseEndpoint;
  }

  public void setBaseEndpoint(String baseEndpoint) {
    this.baseEndpoint = baseEndpoint;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEncryptedPassword() {
    return encryptedPassword;
  }

  public void setEncryptedPassword(String encryptedPassword) {
    this.encryptedPassword = encryptedPassword;
  }

  public String getEncryptionAlgorithm() {
    return encryptionAlgorithm;
  }

  public void setEncryptionAlgorithm(String encryptionAlgorithm) {
    this.encryptionAlgorithm = encryptionAlgorithm;
  }

  public String getDownstreamInputAlignmentName() {
    return downstreamInputAlignmentName;
  }

  public void setDownstreamInputAlignmentName(String downstreamInputAlignmentName) {
    this.downstreamInputAlignmentName = downstreamInputAlignmentName;
  }

  public String getDownstreamInputAlignmentVersion() {
    return downstreamInputAlignmentVersion;
  }

  public void setDownstreamInputAlignmentVersion(String downstreamInputAlignmentVersion) {
    this.downstreamInputAlignmentVersion = downstreamInputAlignmentVersion;
  }

  public String getDownstreamOutputAlignmentName() {
    return downstreamOutputAlignmentName;
  }

  public void setDownstreamOutputAlignmentName(String downstreamOutputAlignmentName) {
    this.downstreamOutputAlignmentName = downstreamOutputAlignmentName;
  }

  public String getDownstreamOutputAlignmentVersion() {
    return downstreamOutputAlignmentVersion;
  }

  public void setDownstreamOutputAlignmentVersion(String downstreamOutputAlignmentVersion) {
    this.downstreamOutputAlignmentVersion = downstreamOutputAlignmentVersion;
  }

  public String getUpstreamInputAlignmentName() {
    return upstreamInputAlignmentName;
  }

  public void setUpstreamInputAlignmentName(String upstreamInputAlignmentName) {
    this.upstreamInputAlignmentName = upstreamInputAlignmentName;
  }

  public String getUpstreamInputAlignmentVersion() {
    return upstreamInputAlignmentVersion;
  }

  public void setUpstreamInputAlignmentVersion(String upstreamInputAlignmentVersion) {
    this.upstreamInputAlignmentVersion = upstreamInputAlignmentVersion;
  }

  public String getUpstreamOutputAlignmentName() {
    return upstreamOutputAlignmentName;
  }

  public void setUpstreamOutputAlignmentName(String upstreamOutputAlignmentName) {
    this.upstreamOutputAlignmentName = upstreamOutputAlignmentName;
  }

  public String getUpstreamOutputAlignmentVersion() {
    return upstreamOutputAlignmentVersion;
  }

  public void setUpstreamOutputAlignmentVersion(String upstreamOutputAlignmentVersion) {
    this.upstreamOutputAlignmentVersion = upstreamOutputAlignmentVersion;
  }

  @Override
  public String toString() {
    return "SilPlatform{" +
      "platformId='" + platformId + '\'' +
      ", type='" + type + '\'' +
      ", baseEndpoint='" + baseEndpoint + '\'' +
      ", location='" + location + '\'' +
      ", name='" + name + '\'' +
      ", username='" + username + '\'' +
      ", encryptedPassword='" + encryptedPassword + '\'' +
      ", encryptionAlgorithm='" + encryptionAlgorithm + '\'' +
      ", downstreamInputAlignmentName='" + downstreamInputAlignmentName + '\'' +
      ", downstreamInputAlignmentVersion='" + downstreamInputAlignmentVersion + '\'' +
      ", downstreamOutputAlignmentName='" + downstreamOutputAlignmentName + '\'' +
      ", downstreamOutputAlignmentVersion='" + downstreamOutputAlignmentVersion + '\'' +
      ", upstreamInputAlignmentName='" + upstreamInputAlignmentName + '\'' +
      ", upstreamInputAlignmentVersion='" + upstreamInputAlignmentVersion + '\'' +
      ", upstreamOutputAlignmentName='" + upstreamOutputAlignmentName + '\'' +
      ", upstreamOutputAlignmentVersion='" + upstreamOutputAlignmentVersion + '\'' +
      '}';
  }

}
