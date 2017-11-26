var T, opt;

var Y; // tsne result stored here
var data;

function updateEmbedding() {

  // get current solution
  var Y = T.getSolution();
  // move the groups accordingly
  gs.attr("transform", function(d, i) { return "translate(" +
                                          ((Y[i][0]*20*ss + tx) + 400) + "," +
                                          ((Y[i][1]*20*ss + ty) + 400) + ")"; });
}

var svg;
function initEmbedding() {
  $("#embed").empty();
    var div = d3.select("#embed");

    tooltip = div.append("div")	// tooltip is global
        .attr("class", "tooltip")
        .style("opacity", 0);

    var table = tooltip.append("table")

    toolTipTableCells = [];  // tooltipTableCells is global

    var row1 = table.append("tr");
    toolTipTableCells[7] = row1.append("td");
    toolTipTableCells[0]= row1.append("td");
    toolTipTableCells[1] = row1.append("td");

    var row2 = table.append("tr");
    toolTipTableCells[6] = row2.append("td");
    row2.append("td").text("\u2191");
    toolTipTableCells[2] = row2.append("td");

    var row3 = table.append("tr");
    toolTipTableCells[5] = row3.append("td");
    toolTipTableCells[4] = row3.append("td");
    toolTipTableCells[3] = row3.append("td");

    svg = div.append("svg") // svg is global
        .attr("width", "100%")
        .attr("height", "80vh")
        .attr("style","border: 1px solid #333;");
}

var gs;
var cs;
var ts;

function drawEmbedding() {
    gs = svg.selectAll(".b")
        .data(data)
        .enter().append("g")
        .attr("class", "u");

    cs = gs.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
        .attr('fill', 'rgb(100,100,255)')
        .on("mouseover", function(d) {
            tooltip.style("opacity", .9);

            d.map(
                (v, i) =>
                    toolTipTableCells[i].html( v )
            );

            tooltip
                .style("left", (d3.event.pageX + 14) + "px")
                .style("top", (d3.event.pageY - 13) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.style("opacity", 0);
        });

    ts = gs.append("text")
        .attr("text-anchor", "top")
        .attr("transform", "translate(5, -7)")
        .attr("font-size", 12)
        .attr("fill", "#333")
        .text(function(d,i) { return labels[i]; });

    var zoomListener = d3.behavior.zoom()
            .scaleExtent([0.1, 10])
            .center([0,0])
            .on("zoom", zoomHandler);
    zoomListener(svg);
}

var tx=0, ty=0;
var ss=1;
function zoomHandler() {
    tx = d3.event.translate[0];
    ty = d3.event.translate[1];
    ss = d3.event.scale;
}

var stepnum = 0;
function step() {
    if(dotrain) {
        var cost = T.step(); // do a few steps
        $("#cost").html("iteration " + T.iter + ", cost: " + cost);
    }
    updateEmbedding();
}

labels = [];
dotrain = true;
iid = -1;
$(window).load(function() {
  initEmbedding();

  $("#stopbut").click(function() {
    dotrain = false;
  });

  $("#inbut").click(function() {
      initEmbedding();
      // set globals
      labels = _.map( ANIMALS, charFor );
      data = _.map( ANIMALS, 'genes');

      // ok lets do this
      opt = {epsilon: parseFloat($("#lrtxt").val()), perplexity: parseInt($("#perptxt").val()), dim: data[0].length};
      console.log('opt', opt);
      T = new tsnejs.tSNE(opt); // create a tSNE instance

      T.initDataRaw(data);

      drawEmbedding();
      iid = setInterval(step, 10);
      dotrain = true;
  });
});
