function SensorContainer() {
  this.hashmap_sensors = {};
  this.size = 0;
}

SensorContainer.prototype.addSensor = function(sensor) {
  this.hashmap_sensors[sensor.hashKey] = new Sensor(sensor);
  this.size++;
}

SensorContainer.prototype.addSensors = function(sensors) {
  var sensor_container = this;
  sensors.forEach(function (sensor) {
    sensor_container.addSensor(sensor);
    sensor_container.size++;
  });
}

SensorContainer.prototype.deleteSensor = function(sensor) {
  delete this.hashmap_sensors[sensor.hashKey];
  this.size--;
}

SensorContainer.prototype.getSensor = function(hasKey) {
  return this.hashmap_sensors[hasKey];
}

SensorContainer.prototype.getAll = function() {
  return this.hashmap_sensors;
}
