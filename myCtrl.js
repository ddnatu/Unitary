app.controller('myCtrl', function($scope,MyService) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    $scope.names = ["DT_5_3","PT_2_9","LT_2_6","O2A","TE_2_4","PercentageLoad"];
    $scope.selectedTagX = '';
    $scope.selectedTagY = '';
    $scope.result = [];
    $scope.flag = false;
    $scope.getDataOfSelectedTags = function(){
        console.log($scope.selectedTagX );   
        console.log($scope.selectedTagY);


        var TagsArr = [$scope.selectedTagX, $scope.selectedTagY];
        var getDataDefer = MyService.getData(TagsArr);
        getDataDefer.then(function(data){
            console.log('data',data);
            $scope.result = data;
            $scope.flag = true;
        },function(error){
            console.log('error',error);
        });

    }

    $scope.plotGraphFunction = function(){

        var headers = {
            devicetime: 'Device Time'.replace(/,/g, ''), // remove commas to avoid errors
            LT_2_6: "LT_2_6",
            O2A: "O2A",
            PercentageLoad: "Percentage Load"
        };

        $scope.exportCSVFile(headers,$scope.result,'unitary');
    }

    $scope.plotRefresh = function(){
        var scaleY = d3.scaleLinear()
                        .domain([0,100])
                        .range([0,550]);
        var axisVertical = d3.axisLeft(scaleY);
        d3.select("#scatterPlotSVG")
            .append("svg")
            .append("g")
            .attr("transform", 'translate(0, 580)rotate(-180)')
            .style("stroke-width","2px")
            .style("stroke","red")
            .call(axisVertical);

        var scaleX = d3.scaleLinear()
                        .domain([0, 100])
                        .range([0, 550]); 
        var axisHorizontal = d3.axisBottom(scaleX);
        d3.select("#scatterPlotSVG").append("svg")
            .append("g")
            .attr("transform", "translate(0,580)")
            .style("stroke-width","2px")
            .style("stroke","red")
            .call(axisHorizontal);


        var svg2 = d3.select("#scatterPlotSVG");
        var g = svg2.append('g')
        g.selectAll("circle")
            .data($scope.result.data)
            .enter().append("circle")
            .attr("r", 2)
            .attr("cx", function(d) { return d[$scope.selectedTagX] * 5.5; }).attr("transform","translate(-550,0)rotate(180)")
            .attr("cy", function(d) { return d[$scope.selectedTagY] * 5.5; }).attr("transform","translate(550,550)rotate(180)")
            .attr("fill","blue");
    }



    $scope.convertToCSV= function(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }
        console.log('str', str);
        return str;
    }

    $scope.exportCSVFile= function(headers, items, fileTitle) {
        // if (headers) {
        //     items.unshift(headers);
        // }

        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);

        var csv = $scope.convertToCSV(jsonObject);
        console.log('csv', csv);
        var exportedFilename = fileTitle + '.csv' || 'export.csv';

        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
});
