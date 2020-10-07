app.service('registryServiceApi',
  ['$http', 'UPDATE_MANAGER_BACKEND_URL',
    function ($http, UPDATE_MANAGER_BACKEND_URL) {

      var service_api = {};

      service_api.retrieve_images = function () {
        return $http(
          {
            method: 'GET',
            url: UPDATE_MANAGER_BACKEND_URL + 'api/v1/registry/images'
          }
        );
      };

      service_api.retrieve_tags_by_image_id = function (imageId) {
        return $http(
          {
            method: 'GET',
            url: UPDATE_MANAGER_BACKEND_URL + 'api/v1/registry/images/' + imageId + '/tags'
          }
        );
      };

      service_api.retrieve_image_info_by_image_id = function (imageId) {
        return $http(
          {
            method: 'GET',
            url: UPDATE_MANAGER_BACKEND_URL + 'api/v1/registry/images/' + imageId + '/info'
          }
        );
      };

      service_api.create_image_info_by_image_id = function (imageId, imageInfo) {
        return $http(
          {
            method: 'POST',
            url: UPDATE_MANAGER_BACKEND_URL + 'api/v1/registry/images/' + imageId + '/info',
            headers: {
              "Content-Type": "text/plain"
            },
            data: imageInfo
          }
        );
      };

      service_api.update_image_info_by_image_id = function (imageId, imageInfo) {
        return $http(
          {
            method: 'PUT',
            url: UPDATE_MANAGER_BACKEND_URL + 'api/v1/registry/images/' + imageId + '/info',
            headers: {
              "Content-Type": "text/plain"
            },
            data: imageInfo
          }
        );
      };

      service_api.delete_image_info_by_image_id = function (imageId) {
        return $http(
          {
            method: 'DELETE',
            url: UPDATE_MANAGER_BACKEND_URL + 'api/v1/registry/images/' + imageId + '/info'
          }
        );
      };

      return service_api;

    }
  ]
);

