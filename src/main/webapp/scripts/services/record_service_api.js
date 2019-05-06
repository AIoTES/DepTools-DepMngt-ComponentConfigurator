app.service('recordServiceApi',
  ['$http', 'MAINTENANCE_PANEL_BACKEND_URL',
    function ($http, MAINTENANCE_PANEL_BACKEND_URL) {

      var service_api = {};

      service_api.retrieve_records_by_element_id = function (elementId) {
        return $http(
          {
            method: 'GET',
            url: MAINTENANCE_PANEL_BACKEND_URL + '/api/v1/records/element/' + elementId
          }
        );
      };

      service_api.create_record = function (record) {
        return $http(
          {
            method: 'POST',
            url: MAINTENANCE_PANEL_BACKEND_URL + '/api/v1/records',
            data: record
          }
        );
      };

      service_api.update_record = function (record) {
        return $http(
          {
            method: 'PUT',
            url: MAINTENANCE_PANEL_BACKEND_URL + '/api/v1/records',
            data: record
          }
        );
      };

      service_api.delete_record = function (elementId, recordId) {
        return $http(
          {
            method: 'DELETE',
            url: MAINTENANCE_PANEL_BACKEND_URL + '/api/v1/records/' + recordId + "/element/" + elementId
          }
        );
      };

      return service_api;

    }
  ]
);

