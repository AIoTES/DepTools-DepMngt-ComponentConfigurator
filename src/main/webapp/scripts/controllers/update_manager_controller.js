/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateManagerCtrl',
  ['registryService', 'registryServiceData',
    function (registryService, registryServiceData) {

      var vm = this;

      vm.registry = registryService;
      vm.registryData = registryServiceData;

      registryService.retrieve_images();
      registryService.retrieve_tags_by_image_id("imageId");
      registryService.retrieve_image_info_by_image_id("imageId");
      registryService.create_image_info_by_image_id("imageId", "imageInfo");
      registryService.update_image_info_by_image_id("imageId", "imageInfo2");
      registryService.delete_image_info_by_image_id("imageId");

    }
  ]
);
