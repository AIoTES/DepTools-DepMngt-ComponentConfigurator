/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('createEditorCtrl',
  ['registryService', 'registryServiceData', '$location',
    function (registryService, registryServiceData, $location) {

      var vm = this;

      vm.registry = registryService;
      vm.registryData = registryServiceData;

      // vm.tags = registryServiceData.imagesData.tags;
      // registryService.create_image_info_by_image_id("imageId", "imageInfo");
      // registryService.update_image_info_by_image_id("imageId", "imageInfo2");
      // registryService.delete_image_info_by_image_id("imageId");

      function getDescription() {
        return registryServiceData.imagesData[registryServiceData.currentImage].info;
      }
      getDescription();

      vm.description = '';

      vm.saveDescription = function () {
        registryService.create_image_info_by_image_id(registryServiceData.currentImage, vm.description);
      };

      vm.closeUpdateDescription = function () {
        $location.path('/main/update_manager/update_info');
      };

    }
  ]
);
