app.service('registryService',
  ['registryServiceApi', 'registryServiceData', '$interval', '$showdown',
    function (registryServiceApi, registryServiceData, $interval, $showdown) {

      var SHOW_FAILURE_TIME = 3000;

      var service = {};

      service.retrieve_images = function () {
        registryServiceData.retrieve_images_status = registryServiceData.operationStatus.IN_PROGRESS;

        registryServiceApi.retrieve_images()
          .then(
            function (value) {
              registryServiceData.images = value.data;
              registryServiceData.retrieve_images_status = registryServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              registryServiceData.retrieve_images_status = registryServiceData.operationStatus.FAILURE;
              var promise_interval = $interval(
                function () {
                  registryServiceData.retrieve_images_status = registryServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, SHOW_FAILURE_TIME
              );
            }
          );

      };

      service.retrieve_tags_by_image_id = function (imageId) {
        registryServiceData.retrieve_tags_status[imageId] = registryServiceData.operationStatus.IN_PROGRESS;

        registryServiceApi.retrieve_tags_by_image_id(imageId)
          .then(
            function (value) {
              if (!registryServiceData.imagesData.hasOwnProperty(imageId))
                registryServiceData.imagesData[imageId] = {};
              registryServiceData.imagesData[imageId].tags = value.data;
              registryServiceData.retrieve_tags_status[imageId] = registryServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              registryServiceData.retrieve_tags_status[imageId] = registryServiceData.operationStatus.FAILURE;
              var promise_interval = $interval(
                function () {
                  registryServiceData.retrieve_tags_status[imageId] = registryServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, SHOW_FAILURE_TIME
              );
            }
          );
      };

      service.retrieve_image_info_by_image_id = function (imageId) {
        registryServiceData.retrieve_info_status[imageId] = registryServiceData.operationStatus.IN_PROGRESS;

        registryServiceApi.retrieve_image_info_by_image_id(imageId)
          .then(
            function (value) {
              if (!registryServiceData.imagesData.hasOwnProperty(imageId))
                registryServiceData.imagesData[imageId] = {};
              registryServiceData.imagesData[imageId].info = value.data.imageInfo;
              registryServiceData.imagesData[imageId].infoHTML = $showdown.makeHtml(value.data.imageInfo);
              registryServiceData.retrieve_info_status[imageId] = registryServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function (error) {
              if (error.status === 404)
                registryServiceData.retrieve_info_status[imageId] = registryServiceData.operationStatus.SUCCESS;
              else {
                registryServiceData.retrieve_info_status[imageId] = registryServiceData.operationStatus.FAILURE;
                var promise_interval = $interval(
                  function () {
                    registryServiceData.retrieve_info_status[imageId] = registryServiceData.operationStatus.NOT_STARTED;
                    $interval.cancel(promise_interval);
                  }, SHOW_FAILURE_TIME
                );
              }
            }
          );
      };

      service.create_image_info_by_image_id = function (imageId, imageInfo) {
        registryServiceData.create_info_status[imageId] = registryServiceData.operationStatus.IN_PROGRESS;

        registryServiceApi.create_image_info_by_image_id(imageId, imageInfo)
          .then(
            function (value) {
              if (!registryServiceData.imagesData.hasOwnProperty(imageId))
                registryServiceData.imagesData[imageId] = {};
              registryServiceData.imagesData[imageId].info = value.data.imageInfo;
              registryServiceData.imagesData[imageId].infoHTML = $showdown.makeHtml(value.data.imageInfo);
              registryServiceData.create_info_status[imageId] = registryServiceData.operationStatus.SUCCESS;
              var promise_interval = $interval(
                function () {
                  registryServiceData.create_info_status[imageId] = registryServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, SHOW_FAILURE_TIME
              );
            }
          )
          .catch(
            function () {
              registryServiceData.create_info_status[imageId] = registryServiceData.operationStatus.FAILURE;
              var promise_interval = $interval(
                function () {
                  registryServiceData.create_info_status[imageId] = registryServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, SHOW_FAILURE_TIME
              );
            }
          );
      };

      service.update_image_info_by_image_id = function (imageId, imageInfo) {
        registryServiceData.update_info_status[imageId] = registryServiceData.operationStatus.IN_PROGRESS;

        registryServiceApi.update_image_info_by_image_id(imageId, imageInfo)
          .then(
            function (value) {
              if (!registryServiceData.imagesData.hasOwnProperty(imageId))
                registryServiceData.imagesData[imageId] = {};
              registryServiceData.imagesData[imageId].info = value.data.imageInfo;
              registryServiceData.imagesData[imageId].infoHTML = $showdown.makeHtml(value.data.imageInfo);
              registryServiceData.update_info_status[imageId] = registryServiceData.operationStatus.SUCCESS;
              var promise_interval = $interval(
                function () {
                  registryServiceData.update_info_status[imageId] = registryServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, SHOW_FAILURE_TIME
              );
            }
          )
          .catch(
            function () {
              registryServiceData.update_info_status[imageId] = registryServiceData.operationStatus.FAILURE;
              var promise_interval = $interval(
                function () {
                  registryServiceData.update_info_status[imageId] = registryServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, SHOW_FAILURE_TIME
              );
            }
          );
      };

      service.delete_image_info_by_image_id = function (imageId) {
        registryServiceData.delete_info_status[imageId] = registryServiceData.operationStatus.IN_PROGRESS;

        registryServiceApi.delete_image_info_by_image_id(imageId)
          .then(
            function () {
              registryServiceData.imagesData[imageId].info = "";
              registryServiceData.imagesData[imageId].infoHTML = "";
              registryServiceData.delete_info_status[imageId] = registryServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              registryServiceData.delete_info_status[imageId] = registryServiceData.operationStatus.FAILURE;
              var promise_interval = $interval(
                function () {
                  registryServiceData.delete_info_status[imageId] = registryServiceData.operationStatus.NOT_STARTED;
                  $interval.cancel(promise_interval);
                }, SHOW_FAILURE_TIME
              );
            }
          );
      };

      return service;

    }
  ]
);
