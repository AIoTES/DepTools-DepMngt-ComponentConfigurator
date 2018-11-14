/**
 * Created by truenos on 20/12/16.
 */

app.factory('websocketService', [function () {

    var service = {
        sources: {}
    };

    service.addEventSource = function (name, url) {
        if (!service.isEventSourceAdded(name))
            this.sources[name] = new EventSource(url);
    };

    service.addEventListener = function (name, eventName, callback) {
        this.sources[name].addEventListener(eventName, callback);
    };

    service.isEventSourceAdded = function (name) {
        return service.sources.hasOwnProperty(name);
    };

    return service;

}]);
