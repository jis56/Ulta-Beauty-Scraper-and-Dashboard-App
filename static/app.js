var data;

//init function to fill in the select option

function init() {
    data = ulta_data;
    var selectValues = [];
    ulta_data.forEach((x)=>{
      var selectValue=x.product
      selectValues.push(selectValue)
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
  };



function plotFunctions() {
  var valueSelect = d3.select("#selDataset").node().value;
  console.log(valueSelect);
  demographicInfo(valueSelect);
  barChart(valueSelect);
  bubbleChart(valueSelect);
  gaugeChart(valueSelect);
};

function demographicInfo(valueSelect) {
    var filteredValue = data.metadata.filter(d => d.product == +valueSelect);

    var panel = d3.select(".panel-body");
    panel.html("");
    panel.append("p").text(`ID: ${filteredValue[0].id}`);
    panel.append("p").text(`Ethnicity: ${filteredValue[0].ethnicity}`);
    panel.append("p").text(`Gender: ${filteredValue[0].gender}`);
    panel.append("p").text(`Age: ${filteredValue[0].age}`);
    panel.append("p").text(`Location: ${filteredValue[0].location}`);
    panel.append("p").text(`Bbtype: ${filteredValue[0].bbtype}`);
    panel.append("p").text(`Wfreq: ${filteredValue[0].wfreq}`);
    }

function barChart(valueSelect) {
  var filteredValue = data.samples.filter(d => d.id == +valueSelect);
  var ouid = filteredValue.map(d => d.otu_ids);
  ouid = fixOuid(ouid[0].slice(0, 10));
  var valueX = filteredValue.map(d => d.sample_values);
  valueX = valueX[0].slice(0, 10);

  var otu_label = filteredValue.map(d => d.otu_labels);
  var names = fixBacteria(otu_label[0]).slice(0, 10);
  console.log(ouid);
  console.log(valueX);
  console.log(otu_label);
  console.log(names);

  var trace = {
    x: valueX,
    y: ouid,
    text: names,
    type: "bar",
    orientation: "h"
  };

  var layout = {
    yaxis: {
      autorange: "reversed"
    }
  };

  var barData = [trace];

  Plotly.newPlot("bar", barData, layout);
}


function bubbleChart(valueSelect) {
  var filteredValue = data.samples.filter(value => value.id == +valueSelect);
  var ouid = filteredValue.map(d => d.otu_ids);
  ouid = ouid[0];
  var yValue = filteredValue.map(d => d.sample_values);
  yValue = yValue[0];

  var otu_label = filteredValue.map(d => d.otu_labels);
  otu_label = fixBacteria(otu_label[0]);

  var trace1 = {
    x: ouid,
    y: yValue,
    mode: "markers",
    marker: {
      color: ouid,
      size: yValue
    },
    text: otu_label
  };

  var bubbleData = [trace1];

  var layout = {
    showlegend: false,
    xaxis: { title: "OTU ID" }
  };

  Plotly.newPlot("bubble", bubbleData, layout);
}

init();