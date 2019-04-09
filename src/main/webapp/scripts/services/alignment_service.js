app.service('alignmentService',
  ['alignmentServiceApi', 'alignmentServiceData',
    function (alignmentServiceApi, alignmentServiceData) {

      var service = this;

      service.retrieveAlignments = function (clientId) {
        alignmentServiceApi.getAlignments(clientId)
          .then(
            function (response) {
              alignmentServiceData.alignments = [];
              var data = response.data;
              data.forEach(
                function (value) {
                  alignmentServiceData.alignments.push(value);
                }
              );
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.retrieveAlignment = function (name, version, clientId) {
        alignmentServiceApi.getAlignment(name, version, clientId)
          .then(
            function (response) {
              alignmentServiceData.currentAlignment = response.data;
            }
          )
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      service.getAlignments = function() {
        return alignmentServiceData.alignments;
      };

      service.getCurrentAlignment = function() {
        return alignmentServiceData.currentAlignment;
      }

      service.createAlignment = function(clientId) {
        alignmentServiceApi.createAlignment(clientId);
      };

      service.deleteAlignment = function(name, version, clientId) {
        alignmentServiceApi.deleteAlignment(name, version, clientId);
      };

      return service;

    }
  ]
);
