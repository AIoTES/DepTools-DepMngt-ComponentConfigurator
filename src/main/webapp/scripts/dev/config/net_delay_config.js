/**
 * Created by truenos on 3/01/17.
 */

(function (add_delay) {
    var NET_DELAY = 1500;

    if (add_delay) {
        homeAppDev.config(function ($provide) {
            $provide.decorator('$httpBackend', function ($delegate) {
                var proxy = function (method, url, data, callback, headers) {
                    var interceptor = function () {
                        var _this = this,
                            _arguments = arguments;
                        setTimeout(function () {
                            callback.apply(_this, _arguments);
                        }, NET_DELAY);
                    };
                    return $delegate.call(this, method, url, data, interceptor, headers);
                };
                for (var key in $delegate) {
                    proxy[key] = $delegate[key];
                }
                return proxy;
            });
        });
    }
})(false);
