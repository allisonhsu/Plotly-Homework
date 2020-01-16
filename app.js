// test for connection
console.log("test")

// ======  homework ===== 
function init(){
    file = "samples.json";

// 1. Use the D3 library to read in `samples.json`.
    d3.json(file).then(function(data){
        // console.log(data);
        var options = data.names
        options.forEach(x => {
            d3.select("#selDataset")
            .append("option")
            .attr("value",x)
            .text(x)
        });

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// * Use `sample_values` as the values for the bar chart.
// * Use `otu_ids` as the labels for the bar chart.
// * Use `otu_labels` as the hovertext for the chart.
// ![bar Chart](Images/hw01.png)

        // var sample_values = data.samples[0].sample_values;
        // console.log(sample_values)
        var initId = data.samples.filter(i =>i.id.toString() === id)[0];
        console.log(initId)
        var sample_values = data.samples[s].sample_values;
        var otu_ids = data.samples[s].otu_ids;
        var otu_labels = data.samples[s].otu_labels;
        var barC = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse(),
            hovertext: otu_labels,
            type: 'bar',
            orientation: 'h'
        }]
        Plotly.newPlot('bar', barC);

// 3. Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values.
// ![Bubble Chart](Images/bubble_chart.png)

        var bubbleC = [{ 
            x: otu_ids.slice(0,10).reverse(),
            y: sample_values.slice(0,10).reverse(),
            mode: "maker",
            marker: {
                size: sample_values,
                color: otu_ids},
            text: otu_labels
        }];
        Plotly.newPlot('bubble',bubbleC);

// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// ![hw](Images/hw03.png)
        var metadata = data.metadata;
        console.log(metadata)
        Object.entries(metadata).forEach(function([k,v]){
            d3.select("sample-metadata")
            .append("ul")
            .text(`${k}:${v}`)
        });

// The following task is advanced and therefore optional.
// * Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.
// * You will need to modify the example gauge code to account for values ranging from 0 through 9.
// * Update the chart whenever a new sample is selected.
// ![Weekly Washing Frequency Gauge](Images/gauge.png)
        var GaugeC = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: 270,
            title: { text: "Speed" },
            type: "indicator",
            mode: "gauge+number"
        }];
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', GaugeC, layout);
    });
};

// 6. Update all of the plots any time that a new sample is selected.

function updatePlotly(){
    var selection = d3.select("#selDataset").property("value");

};

init();
