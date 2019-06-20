/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateInfoCtrl',
  ['registryService', 'registryServiceData', '$location', '$showdown', '$scope',
    function (registryService, registryServiceData, $location, $showdown, $scope) {

      var vm = this;

      vm.registry = registryService;
      vm.registryData = registryServiceData;

      // registryService.create_image_info_by_image_id("imageId", "imageInfo");
      // registryService.update_image_info_by_image_id("imageId", "imageInfo2");
      // registryService.delete_image_info_by_image_id("imageId");

      function getTags() {
        return registryServiceData.imagesData[registryServiceData.currentImage].tags;
      }
      getTags();

      function getDescription() {
        return registryServiceData.imagesData[registryServiceData.currentImage].info;
      }
      getDescription();

      vm.showAddButton = false;
      if (registryServiceData.imagesData[registryServiceData.currentImage].info === undefined) {
        vm.showAddButton = true;
      } else {
        vm.showAddButton = false;
      }

      vm.tags = registryServiceData.imagesData[registryServiceData.currentImage].tags;
      vm.descriptionMarkdown = $showdown.makeHtml(registryServiceData.imagesData[registryServiceData.currentImage].info);

      vm.deleteImage = function () {
        registryService.delete_image_info_by_image_id(registryServiceData.currentImage);
        $location.path('/main/update_manager');
      };

      vm.createDescription = function () {
        $location.path('/main/update_manager/update_info/create_editor');
      };

      vm.editDescription = function () {
        $location.path('/main/update_manager/update_info/update_editor');
      };

    }
  ]
);
