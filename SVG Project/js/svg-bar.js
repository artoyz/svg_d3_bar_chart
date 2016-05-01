/* 
 * Generic Bar Chart
 * with D3 js, SVG, CSS3
 * 
 * author: arruiz
 */

function SvgBar(containerId, width, height) {
    
    //Properties with default settings
    this.width = width;
    this.height = height;
    this.barColor = "steelblue";          //default
    this.barHighlightColor = "brown";     //default
     
    //Overridable Event Handlers
    //This will provide the DOMElement, Data, and Index
    this.onClick = null;
    this.onMouseOver = null;
    this.onMouseOut = null;
    
    var self = this;
    
    var svg = d3.select("#" + containerId).append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
   
    //Main method to call
    this.draw = function (data) {
        
        var maxData = d3.max(data);

        //Compute graph scales
        var dataCount = data.length;
        var barWidth = (this.width / dataCount) - 5; //TODO: make sure not 0
        var xScale = d3.scale.linear().domain([0, dataCount]).range([0, this.width]);
        var yScale = d3.scale.linear().domain([0, maxData]).range([0, this.height]);
        
        //Bind
        var rectSelection = svg.selectAll("rect").data(data);
        
        //Create new bars
        rectSelection.enter()
                .append("rect")
                .attr("class", "bar");
        
        //Update existing bars
        rectSelection
                .attr("fill", this.barColor)
                .attr("x", function(d, i) { return xScale(i); })
                .attr("y", function(d) { return self.height - yScale(d); })
                .attr("width", barWidth)
                .attr("height", function(d) { return yScale(d); })
                .on("click", function(d, i) { click(this, d, i); })
                .on("mouseover", function(d, i) { mouseover(this, d, i); })
                .on("mouseout", function(d, i) { mouseout(this, d, i); });
        
        //Delete missing bars
        rectSelection.exit().remove();
        
    };
    
    var click = function(dom, data, index) {
        $(dom).css("fill", self.barHighlightColor);
        if(self.onClick !== null) {
            self.onClick(dom, data, index);
        }
    };
        
    var mouseover = function(dom, data, index) {
        $(dom).css("fill", self.barHighlightColor);
        if(self.onMouseOver !== null) {
            self.onMouseOver(dom, data, index);
        }
    };
        
    var mouseout = function(dom, data, index) {
        $(dom).css("fill", self.barColor);
        if(self.onMouseOut !== null) {
            self.onMouseOut(dom, data, index);
        }
    };
}




