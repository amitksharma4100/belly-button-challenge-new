// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//get the JSON data and console log it
d3.json(url).then(function(data) {console.log(data);
});

//Initialize the dashboard
function init() {

// Create drop down menu using D3
let dropDownMenu = d3.select("#selDataset");

// Retrieve sample names and populate dropdown menu
d3.json(url).then((data) => {

//declare sample name variable
let names = data.names;

// Add samples to dropdown menu
   
        names.forEach((myid) => {
// Console log each value of ID in the for loop
            console.log(myid);

            dropDownMenu.append("option")

            .text("id")
            .property("value",myid);

});

//create list for sample names

let sampleFirst = names[0];

//console log the value of sampleFirst
console.log(sampleFirst);

// create the initial charts and metadata table
 createMetadata(sampleFirst);
createbarchart(sampleFirst);
createBubbleChart(sampleFirst);
  });

}
//Declare function to populate metadata details
function createMetadata(sample) {

// call out D3 to retrieve entire data
d3.json(url).then((data) => {

// retrieve all of metadata
let mymetadata = data.metadata;

// Filter based on the value of the sample
let value = mymetadata.filter(result => result.id == sample);

// Log the array of metadata objects after the have been filtered
console.log(value)

// Get the first index from the array
let dataValue = value[0];

// Clear out mymetadata
d3.select("#sample-metadata").html("");

// Use Object.entries to add each key/value pair to the panel
Object.entries(dataValue).forEach(([key,value]) => {

// console log the individual key/value pairs as they are being appended to the metadata panel
console.log(key,value);

d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

//declare function for creating bar chart
function createbarchart(sample) {

// use D3 for all of the data retrieval 
d3.json(url).then((data) => {

//sample data collection
let mysample = data.samples;

//filter based upon sample value
let value = mysample.filter(result => result.id == sample);

//obtain first entry from the array
let dataValue = value[0]

// Get the otu_ids, lables, and sample values
let otu_ids = dataValue.otu_ids;
let otu_labels = dataValue.otu_labels;
let sample_values = dataValue.sample_values;

// console Log the data 
console.log(otu_ids,otu_labels,sample_values);

// Set top ten items to display in descending order
let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
let xticks = sample_values.slice(0,10).reverse();
let labels = otu_labels.slice(0,10).reverse();
        
// Set up the trace for the bar chart
let trace = {
    x: xticks,
    y: yticks,
    z: labels,
      type: "bar",
      marker: {
        color: sample_values.slice(0, 10).reverse(),
        colorscale: "Viridis",
      },

    text: labels,
    orientation: "h"
    };

// Setup the layout
let layout = {
    title: "Top 10 OTUs"
    };

// Call Plotly to plot the bar chart
    Plotly.newPlot("bar", [trace], layout)
    });
};

// declare Function to create bubble chart
function createBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let dataValue = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = dataValue.otu_ids;
        let otu_labels = dataValue.otu_labels;
        let sample_values = dataValue.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Electric"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria(s) Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    createMetadata(value);
    createbarchart(value);
    createBubbleChart(value);
    
};

// Call the initialize function
init();
