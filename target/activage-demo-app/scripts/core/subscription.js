function Subscription(subscription) {
  this.id = subscription.id;
  this.deviceId = subscription.deviceId;
  this.name = subscription.name;
  this.platform = subscription.hostedBy;
  this.sensors = new SensorContainer();

  this.sensors.addSensors(subscription.sensors);
}
