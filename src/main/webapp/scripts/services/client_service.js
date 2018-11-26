/**platformServiceData
 * Created by JaviHop on 21/08/2018.
 */

app.service('clientService',
  ['clientServiceApi', 'clientServiceData',
    function (clientServiceApi, clientServiceData) {

      var service = this;

      service.retrieveClients = function (clientId) {
        if (clientServiceData.clientStatus !== clientServiceData.retrievalStatus.SUCCESS) {
          clientServiceApi.getClients(clientId)
            .then(
              function (response) {
                clientServiceData.clients = [];
                var data = response.data;
                data.forEach(
                  function (value) {
                    clientServiceData.clients.push(value);
                  }
                );
              }
            )
            .catch(
              function (error) {
                console.log(error);
              }
            );
        }
      };

      service.getClients = function () {
        return clientServiceData.clients;
      };

      service.getCurrentClientId = function () {
        if (clientServiceData.clientStatus !== clientServiceData.retrievalStatus.SUCCESS) {
          if (clientServiceData.clientStatus === clientServiceData.retrievalStatus.NOT_STARTED) {
            clientServiceData.clientStatus = clientServiceData.retrievalStatus.IN_PROGRESS;

            clientServiceApi.getCurrentClientId()
              .then(
                function (response) {
                  clientServiceData.currentClientId = response.data["Client-Id"];
                  clientServiceData.clientStatus = clientServiceData.retrievalStatus.SUCCESS;
                }
              )
              .catch(
                function (error) {
                  clientServiceData.clientStatus = clientServiceData.retrievalStatus.FAILURE;
                  console.log(error);
                }
              );
          }
        }
        else
          return clientServiceData.currentClientId;
      };

      service.setCurrentClientId = function (client) {
        clientServiceData.currentClientId = client.clientId;
        clientServiceApi.setCurrentClientId(client.clientId)
          .catch(
            function (error) {
              console.log(error);
            }
          );
      };

      return service;

    }
  ]
);
