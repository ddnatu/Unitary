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
            .attr("cx", function(d) { return d.LT_2_6* 5.5; })
            .attr("cy", function(d) { return d.PercentageLoad* 5.5; }).attr("transform","translate(550,580)rotate(180)")
            .attr("fill","blue");
    }
});
