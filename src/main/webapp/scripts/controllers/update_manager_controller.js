/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateManagerCtrl',
  ['registryService', 'registryServiceData', '$location',
    function (registryService, registryServiceData, $location) {

      var vm = this;

      vm.registry = registryService;
      vm.registryData = registryServiceData;

      vm.openMenu = false;

      registryServiceData.currentImageId = 'Select an Image';
      registryService.retrieve_images();

      vm.selectImage = function (image) {
        registryServiceData.currentImageId = image;
        registryService.retrieve_tags_by_image_id(image);
        registryService.retrieve_image_info_by_image_id(image);
        $location.path('/main/update_manager/update_info');
      };

    }
  ]
);
