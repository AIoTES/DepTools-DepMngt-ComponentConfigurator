/**
 * Created by truenos on 4/10/16.
 */

app.factory('deviceValueWs', ['websocketService', 'deviceService', 'deviceServiceData', '$rootScope',
    function (websocketService, deviceService, deviceServiceData, $rootScope) {

      var service = {};

      service.initializeMe = function () {
        console.log("initialized");
      };

      service.newValueCleaned = function (msg) {
        var value = JSON.parse(msg.data);
        if (!deviceServiceData.deviceValues.hasOwnProperty(value.idDevice))
          deviceServiceData.deviceValues[value.idDevice] = {"simple": [], "ontology": []};
        value.namesValues.forEach(
          function (nameValue) {
            deviceServiceData.deviceLastUpdate = value.date;

            if (!deviceServiceData.deviceLastValuesIds.hasOwnProperty(value.idDevice)) {
              deviceServiceData.deviceLastValuesIds[value.idDevice] = {};
              deviceServiceData.deviceLastValuesIds[value.idDevice][nameValue] = 0;
            }
            else {
              if (!deviceServiceData.deviceLastValuesIds[value.idDevice].hasOwnProperty(nameValue))
                deviceServiceData.deviceLastValuesIds[value.idDevice][nameValue] = 0;
              else
                deviceServiceData.deviceLastValuesIds[value.idDevice][nameValue] ++;
            }
            deviceServiceData.deviceValues[value.idDevice].simple.unshift({
              title: nameValue,
              value: value.values[nameValue],
              update: value.date,
              id: deviceServiceData.deviceLastValuesIds[value.idDevice][nameValue]
            });
          }
        );
        $rootScope.$digest();
      };

      service.newValueRaw = function (msg) {
        var value = JSON.parse(msg.data);
        if (!deviceServiceData.deviceValues.hasOwnProperty(value.deviceId))
          deviceServiceData.deviceValues[value.deviceId] = {"simple": [], "ontology": []};
        deviceServiceData.deviceValues[value.deviceId].ontology.unshift({
          title: "Semantic value",
          value: value.jsonComplete,
          update: new Date()
        });
        $rootScope.$digest();
      };

      websocketService.addEventSource('event_name', 'api/v1/event');
      websocketService.addEventListener('event_name', 'NEW_VALUE_RAW', service.newValueCleaned);
      websocketService.addEventListener('event_name', 'NEW_VALUE_CLEANED', service.newValueRaw);

      return service;
    }
  ]
);
