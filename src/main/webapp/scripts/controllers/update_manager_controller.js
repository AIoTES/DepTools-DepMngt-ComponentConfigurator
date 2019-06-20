/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateManagerCtrl',
  ['registryService', 'registryServiceData', '$location',
    function (registryService, registryServiceData, $location) {

      var vm = this;

      vm.registry = registryService;
      vm.registryData = registryServiceData;

      registryServiceData.currentImage = 'Select an Image';
      registryService.retrieve_images();
      // registryService.retrieve_tags_by_image_id("imageId");
      // registryService.retrieve_image_info_by_image_id("imageId");
      // registryService.create_image_info_by_image_id("imageId", "imageInfo");
      // registryService.update_image_info_by_image_id("imageId", "imageInfo2");
      // registryService.delete_image_info_by_image_id("imageId");

      console.log(registryServiceData.currentImage);

      vm.selectImage = function (image) {
        registryServiceData.currentImage = image;
        registryService.retrieve_tags_by_image_id(image);
        registryService.retrieve_image_info_by_image_id(image);
        $location.path('/main/update_manager/update_info');
      };

    }
  ]
);
