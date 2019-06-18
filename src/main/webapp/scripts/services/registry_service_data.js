app.service('registryServiceData',
  function () {

    var retrievalStatus = Object.freeze({"NOT_STARTED": 0, "IN_PROGRESS": 1, "SUCCESS": 2, "FAILURE": 3});

    var service = {
      images: [],
      imagesData: {},
      currentImageId: '',
      currentImage: {},

      operationStatus: retrievalStatus,
      retrieve_image_status: retrievalStatus.NOT_STARTED,
      retrieve_tags_status: {},
      retrieve_info_status: {},
      create_info_status: {},
      update_info_status: {},
      delete_info_status: {}
    };

    return service;
  }
);
