var mockServerClient = require('mockserver-client').mockServerClient;
mockServerClient("localhost", 1080)
    .retrieveRecordedRequests({})
    .then(
        function (recordedRequests) {
            console.log(JSON.stringify(recordedRequests));
        },
        function (error) {
            console.log(error);
        }
    );