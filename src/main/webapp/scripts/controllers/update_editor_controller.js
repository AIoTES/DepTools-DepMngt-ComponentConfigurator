/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateEditorCtrl',
  ['registryService', 'registryServiceData', '$location',
    function (registryService, registryServiceData, $location) {

      var vm = this;

      vm.registry = registryService;
      vm.registryData = registryServiceData;

      function getDescription() {
        return registryServiceData.imagesData[registryServiceData.currentImageId].info;
      }

      getDescription();

      vm.description = registryServiceData.imagesData[registryServiceData.currentImageId].info;

      vm.saveDescription = function () {
        registryService.update_image_info_by_image_id(registryServiceData.currentImageId, vm.description);
      };

      vm.closeUpdateDescription = function () {
        $location.path('/main/update_manager/update_info');
      };

    }
  ]
);
