angular.module("HTTPRequester", [])

    .service("HTTPService", function ($http) {

        this.get = function (url, data) {
            return $http({
                "method": "GET",
                "url": url,
                "params": data
            });
        };

        this.post = function (url, data) {
            return $http({
                "method": "POST",
                "url": url,
                "data": data,
                "headers": {
                    "Content-Type": "application/json"
                }
            });
        };

    });
