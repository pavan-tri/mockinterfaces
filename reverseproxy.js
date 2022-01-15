var mockServerClient = require('mockserver-client').mockServerClient;
var HTTP_PORT = 1080;
mockServerClient("localhost", HTTP_PORT)
            .mockAnyResponse({
                "httpRequest": {
                    "headers": {
                        "Host": ["service-ext1.mydomain.com"]
                    },
                    "path": "/.*"
                },
                "httpForward": { // local instance
                    "host": "127.0.0.1",
                    "port": 8080,
                    "scheme": "HTTP"
                },
                "times": {
                    "unlimited": true
                }
            })
            .then(
                function () {
                    // forward all other request to QA environment
                    mockServerClient("localhost", HTTP_PORT)
                        .mockAnyResponse({
                            "httpRequest": {
                                "headers": {
                                    "Host": ["staging.lambda.mydomain.com"]
                                },
                                "path": "/.*"
                            },
                            "httpForward": { // localstack instance
                                "host": "127.0.0.1",
                                "port": 4566,
                                "scheme": "HTTP"
                            },
                            "times": {
                                "unlimited": true
                            }
                        })
                        .then(
                            function () {
                                console.log("created expectations");
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                },
                function (error) {
                    console.log(error);
                }
            );