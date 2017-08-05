app.service('MyService', function ($http) {

    var req = {
    method: 'POST',
    //method: 'GET',
     //url: 'http://3752fdde.ngrok.io/fetchRecords',
    // url: 'http://localhost:3000/data.json',
     url: 'http://uitask.azurewebsites.net/fetchRecords',
    headers: {
    'Content-Type': 'application/json'
    },
    data: {
            "RequestObject":"Telemetry",
            "UserID": "Admin",
            "containerName":"garwareanaloginputtelemetry",
            "fromDate":"2017-07-22 00:00:00",
            "toDate":"2017-07-22 23:00:00"
        }
    }
    this.getData = function(Tags){
        req.data.Tags = Tags;
        console.log('reqData', req);
        return $http(req);
    }
});
