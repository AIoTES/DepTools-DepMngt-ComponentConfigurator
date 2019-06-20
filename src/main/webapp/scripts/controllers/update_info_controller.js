/**
 * Created by JaviHop on 09/04/2019.
 */

app.controller('updateInfoCtrl',
  ['registryService', 'registryServiceData', '$location', '$showdown',
    function (registryService, registryServiceData, $location, $showdown) {

      var vm = this;

      var array = [];

      vm.registry = registryService;
      vm.registryData = registryServiceData;

      if (registryServiceData.currentImageId === 'Select an Image')
        $location.path('/main/update_manager');


      vm.deleteImage = function () {
        registryService.delete_image_info_by_image_id(registryServiceData.currentImageId);
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
