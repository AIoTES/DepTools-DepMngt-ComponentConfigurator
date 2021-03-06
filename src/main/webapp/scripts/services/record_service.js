app.service('recordService',
  ['recordServiceApi', 'recordServiceData', '$location',
    function (recordServiceApi, recordServiceData, $location) {

      var service = {};

      service.retrieve_records_by_element_id = function (elementId) {
        recordServiceData.retrievalStatus[elementId] = recordServiceData.operationStatus.IN_PROGRESS;

        recordServiceApi.retrieve_records_by_element_id(elementId)
          .then(
            function (response) {
              var records = response.data;
              recordServiceData.recordsByElementId[elementId] = records;
              records.forEach(
                function (record) {
                  recordServiceData.recordsById[record.id] = record;
                  recordServiceData.deletesStatus[record.id] = recordServiceData.operationStatus.NOT_STARTED;
                }
              );

              recordServiceData.retrievalStatus[elementId] = recordServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              recordServiceData.retrievalStatus[elementId] = recordServiceData.operationStatus.FAILURE;
            }
          )

      };

      service.setCurrentRecord = function (element) {
        recordServiceData.currentRecord = element;
      };

      service.create_record = function (record) {
        recordServiceData.createStatus = recordServiceData.operationStatus.IN_PROGRESS;

        recordServiceApi.create_record(record)
          .then(
            function (response) {
              var record = response.data;

              recordServiceData.recordsById[record.id] = record;
              recordServiceData.recordsByElementId[record.elementId].push(record);

              recordServiceData.createStatus = recordServiceData.operationStatus.SUCCESS;
              $location.path("/main/maintenance_panel/maintenance_info")

            }
          )
          .catch(
            function () {
              recordServiceData.createStatus = recordServiceData.operationStatus.FAILURE;
            }
          )
      };

      service.update_record = function (recordToUpdate) {
        recordServiceData.updateStatus = recordServiceData.operationStatus.IN_PROGRESS;

        recordServiceApi.update_record(recordToUpdate)
          .then(
            function (response) {
              var recordUpdated = response.data;

              var recordIndex = recordServiceData.records.findIndex(
                function (record) {
                  return record.id === recordUpdated.id;
                }
              );

              if (recordIndex !== -1)
                recordServiceData.records[recordIndex] = recordUpdated;


              recordIndex = recordServiceData.recordsByElementId[recordUpdated.elementId].findIndex(
                function (record) {
                  return record.id === recordUpdated.id;
                }
              );

              if (recordIndex !== -1)
                recordServiceData.recordsByElementId[recordUpdated.elementId][recordIndex] = recordUpdated;

              recordServiceData.updateStatus = recordServiceData.operationStatus.SUCCESS;
              $location.path("/main/maintenance_panel/maintenance_info")
            }
          )
          .catch(
            function () {
              recordServiceData.updateStatus = recordServiceData.operationStatus.FAILURE;
            }
          )
      };

      service.delete_record = function (elementId, recordId) {
        recordServiceData.deletesStatus[recordId] = recordServiceData.operationStatus.IN_PROGRESS;

        recordServiceApi.delete_record(elementId, recordId)
          .then(
            function () {
              delete recordServiceData.recordsById[recordId];

              var recordIndex = recordServiceData.recordsByElementId[elementId].findIndex(
                function (record) {
                  return record.id === recordId;
                }
              );

              if (recordIndex !== -1)
                recordServiceData.recordsByElementId[elementId].splice(recordIndex, 1);

              recordServiceData.deletesStatus[recordId] = recordServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              recordServiceData.deletesStatus[recordId] = recordServiceData.operationStatus.FAILURE;
            }
          )
      };

      return service;

    }
  ]
);
