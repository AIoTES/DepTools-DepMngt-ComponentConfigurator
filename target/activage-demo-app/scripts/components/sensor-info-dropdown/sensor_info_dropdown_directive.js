/**
 * Created by JaviHop on 11/06/2018.
 */

app.directive('sensorInfoDropdown', function () {
  'use strict';

  return {
    scope: {
      title: '@',
      value: '@',
      update: '@',
      clickAction: '@'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/components/sensor-info-dropdown/sensor-info-dropdown.html'
  }
});
