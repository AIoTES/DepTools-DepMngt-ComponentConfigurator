'use strict';

app.controller('platformInfoCtrl',
  ['platformService', 'platformServiceData',
    function (platformService, platformServiceData) {

      var vm = this;

      vm.platform = platformService;
      vm.platformData = platformServiceData;

    }
  ]
);
