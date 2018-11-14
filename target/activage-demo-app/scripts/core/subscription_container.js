function SubscriptionContainer() {
  this.hashmap_subscription= {};
  this.size = 0;
}

SubscriptionContainer.prototype.addDevice = function(subscription) {
  this.hashmap_subscription[subscription.deviceId] = new Device(subscription);
  this.size++;
}

SubscriptionContainer.prototype.getDevice = function(subscription) {
  return this.hashmap_subscription[subscription];
}

SubscriptionContainer.prototype.getAll = function() {
  return this.hashmap_subscription;
}
