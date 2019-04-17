app.service('recordService',
  ['recordServiceApi', 'recordServiceData',
    function (recordServiceApi, recordServiceData) {

      var service = {};

      service.retrieve_records_by_element_id = function (elementId) {
        recordServiceData.retrievalStatus = recordServiceData.operationStatus.IN_PROGRESS;

        recordServiceApi.retrieve_records_by_element_id(elementId)
          .then(
            function (response) {
              var records = response.data;

              recordServiceData.recordsByElementId[elementId] = records;
              records.forEach(
                function (record) {
                  recordServiceData.recordsById[record.id] = record;
                }
              );

              recordServiceData.retrievalStatus = recordServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              recordServiceData.retrievalStatus = recordServiceData.operationStatus.FAILURE;
            }
          )

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
            }
          )
          .catch(
            function () {
              recordServiceData.createStatus = recordServiceData.operationStatus.FAILURE;
            }
          )
      };

      service.update_record = function (record) {
        recordServiceData.updateStatus = recordServiceData.operationStatus.IN_PROGRESS;

        recordServiceApi.update_record(record)
          .then(
            function (response) {
              var record = response.data;

              recordServiceData.recordsById[record.id] = record;

              var result = recordServiceData.recordsByElementId.filter(
                function (record) {
                  return record.id !== recordId;
                }
              );
              recordServiceData.recordsByElementId[record.elementId] = result;
              recordServiceData.recordsByElementId[record.elementId].push(record);

              recordServiceData.updateStatus = recordServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              recordServiceData.updateStatus = recordServiceData.operationStatus.FAILURE;
            }
          )
      };

      service.delete_record = function (elementId, recordId) {
        recordServiceData.deleteStatus = recordServiceData.operationStatus.IN_PROGRESS;

        recordServiceApi.delete_record(elementId, recordId)
          .then(
            function (response) {
              var record = response.data;

              delete recordServiceData.recordsById[record.id];

              var result = recordServiceData.recordsByElementId.filter(
                function (record) {
                  return record.id !== recordId;
                }
              );
              recordServiceData.recordsByElementId[record.elementId] = result;

              recordServiceData.deleteStatus = recordServiceData.operationStatus.SUCCESS;
            }
          )
          .catch(
            function () {
              recordServiceData.deleteStatus = recordServiceData.operationStatus.FAILURE;
            }
          )
      };

      return service;

    }
  ]
);
