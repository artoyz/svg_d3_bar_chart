/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function SvgPie(containerId, diameter) {
    
    //Properties with default values
    this.diameter = diameter;
    this.colors = ["red", "blue", "steelblue", "orange", "yellow"];
    
    //Event Handlers
    this.onClick = null;
    this.onMouseOver = null;
    this.onMouseOut = null;
    
    var self = this;
    
    var svg = d3.select("#" + containerId).append("svg")
            .attr("width", this.diameter)
            .attr("height", this.diameter);
    
    var g = svg.append("g")
        .attr("transform", "translate(" + this.diameter/2 + "," + this.diameter/2 + ")");
    
    this.draw = function(data) {
        
        var startAngle = 0;
        
        var scale = d3.scale.linear().domain([0, 100]).range([0, 2 * Math.PI]);
        
        //Declare arc drawer
        var arc = d3.svg.arc().innerRadius(0).outerRadius(self.diameter/2)
                .startAngle(function(d) { return startAngle; })
                .endAngle(function(d) { var prev = startAngle; startAngle = scale(d); return prev + scale(d); });
        
        
        var pathSelection = g.selectAll("path").data(data);
        
        //Create Arcs
        pathSelection.enter().append("path");
        
        //Update Arcs
        pathSelection
                //.attr("transform", "translate(" + self.diameter/2 + "," + self.diameter/2 + ")")
                .attr("class", "pie");
                
        
        pathSelection
                .transition()
                .attr("d", arc)
                .style("fill", function(d, i) { return self.colors[i]; }); 
               
        
        //Delete Arcs
        pathSelection.exit().remove();
        
        
    };
    
    var click = function (elem, data, index) {
        if(self.onClick !== null) {
            self.onClick(elem, data, index);
        }
    };
    
    var mouseOver = function (elem, data, index) {
        if(self.onMouseOver !== null) {
            self.onMouseOver(elem, data, index);
        }
    };
    
    var mouseOut = function (elem, data, index) {
        if(self.onMouseOut !== null) {
            self.onMouseOut(elem, data, index);
        }
    };
    
    
}


