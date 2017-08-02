app.controller('myCtrl', function($scope,MyService) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    $scope.names = ["DT_5_3","PT_2_9","LT_2_6","O2A","TE_2_4","PercentageLoad"];
    $scope.selectedTagX;
    $scope.result = [];
    $scope.getDataOfSelectedTags = function(){
         console.log('reached',$scope.selectedTagX);   
    }

    var getDataDefer = MyService.getData();
    getDataDefer.then(function(data){
        console.log('data',data);
        $scope.result = data;
    },function(error){
        console.log('error',error);
    });


    

    $scope.plotGraphFunction = function(){
        var svg = d3.select("body").append("svg").attrs({width:1000, height:300});
        svg.selectAll("circle")
        .data($scope.result.data)
        .enter()
        .append("circle")
        .attrs({
            cx: function(d) { return d.LT_2_6 * 10},
            cy: function(d) { return d.PercentageLoad * 5},
            r: 5,
            "fill": "red"
        });

        svg.selectAll("text")
        .data($scope.result.data)
        .enter()
        .append("text")
        .attrs({
            x: function(d) { return d.LT_2_6 * 4.7},
            y: function(d) { return d.PercentageLoad * 4},
            "fill": "blue"
        });
    }
    
    $scope.plotRefresh = function(){

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 50, left: 70},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom


        var scaleY = d3.scaleLinear()
                        .domain([0,1000])
                        .range([200,0]);

        var axisVertical = d3.axisLeft(scaleY);
        d3.select("#scatterPlotSVG").append("svg")
            .attr("width", 5)
            .attr("height", height)
            .append("g")
            // .attr("transform", "translate(0,30)")
            .attr("transform", 'translate(0, 30)rotate(180)')
            .style("stroke-width","2px")
            .style("stroke","red")
            .call(axisVertical);



        var scaleX = d3.scaleLinear()
                        .domain([0, 1000])
                        .range([0, 200]); 


        var axisHorizontal = d3.axisBottom(scaleX);
        d3.select("#scatterPlotSVG").append("svg")
            .attr("width", width)
            .attr("height", 30)
            .append("g")
            .attr("transform", "translate(0,30)")
            .style("stroke-width","10px")
            .style("stroke","red")
            .call(axisHorizontal);
    }
});
