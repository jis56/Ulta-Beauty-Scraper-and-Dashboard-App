//init function to fill in the select option

/* function init() {
    data = ulta_data;
    var selectValues = [];
    ulta_data.forEach((x)=>{
      var selectValue=x.product
      selectValues.push
    })
    //var selectValues = ulta_data.product;
    var selectOption = d3.select("#selDataset");

    console.log(selectValues)

    selectValues.forEach(value => {
      selectOption
        .append("option")
        .text(value)
        .attr("value", function() {
          return value;
        });
    });
    d3.selectAll("#selDataset").on("change", plotFunctions);
    d3.select('#selDataset').property('value', 'Blush');
  
    plotFunctions();
  }; */

  function updateChart(productID) {
      $.getJSON('/'+productID, {
      }, function(data) {
        ulta_data = data;
        createChart();
      })
      .fail(function() { alert("error"); })
      //.always(function() { alert("complete"); });
      return false;
  }; 

function createChart() {
  $(".chart").html("");
  var svgWidth = 960;
  var svgHeight = 500;

  var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
  };
    
  // Calculate chart width and height
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3.select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import Data

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(ulta_data, d => d.price)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([1, d3.max(ulta_data, d => d.rating)])
    .range([height, 0]);

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(ulta_data)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.price))
  .attr("cy", d => yLinearScale(d.rating))
  .attr("r", "10")
  .attr("fill", "pink")
  .attr('stroke', '#e3e3e3')
  .attr("opacity", "1");

  // Step 6: Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`Product:${d.product}<br>Price: ${d.price}<br>Rating: ${d.rating}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
    var panel = d3.select(".panel-body");
    var panelInfo = `Category: ${data.product_type}`; 
    panelInfo += `<br>Brand: ${data.brand}`;
    panelInfo += `<br>Product: ${data.product}`;
    panelInfo += `<br>Price: $${data.price}`;
    panelInfo += `<br>Rating: ${data.rating}`;
    panelInfo +='<br><br><img src = "'+ data.image_url + '">';

    panel.html(panelInfo);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Rating (out of 5)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Price (USD)");
}

createChart();

