
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });
  
  // Initialize the dashboard at start up 
  function init() {
  
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
  
      // Use D3 to get sample names and populate the drop-down selector
      d3.json(url).then((data) => {
          
          // Set a variable for the sample names
          let names = data.names;
  
          // Add  samples to dropdown menu
          names.forEach((id) => {
  
              // Log the value of id for each iteration of the loop
              console.log(id);
  
              dropdownMenu.append("option")
              .text(id)
              .property("value",id);
          });
  
          // Set the first sample from the list
          let sampleFirst = names[0];
  
          // Log the value of sample_one
          console.log(sampleFirst);
  
          // create initial gauge chart
          createGaugeChart(sampleFirst);
      });
  };
  
  // Function that creates the gauge chart
  function createGaugeChart(sample) {
  

      // Use D3 to retrieve all of the data
      d3.json(url).then((data) => {
  
          // Retrieve all metadata
          let mymetadata = data.metadata;
  
          // Filter based on the value of the sample
          let value = mymetadata.filter(result => result.id == sample);
  
          // Log the array of metadata objects after the have been filtered
          console.log(value)
  
          // Get the first index from the array
          let valueData = value[0];
          
          //let washFrequency = Object.values(valueData)[6];
          let washFrequency = valueData.wfreq;
          
          // Set up the trace for the gauge chart
          let gaugetrace = {
              value: washFrequency,
              
              domain: {x: [0,1], y: [0,1]},
              title: {
                  text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                  font: {color: "black", size: 16}
              },
              type: "indicator",
              mode: "gauge+number",
              
              gauge: {
                  
                   
                  axis: {
                    range: [0,10], 
                     tickmode: "linear",
                     ticks: "outside"},
                       
                  bar: {color: "gray"},
                   

                  steps: [
                      {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                      {range: [1, 2], color: "rgba(245, 226, 202, 0.5)"},
                      {range: [2, 3], color: "rgba(225, 206, 145, 0.5)"},
                      {range: [3, 4], color:  "rgba(202, 209, 95, 0.5)"},
                      {range: [4, 5], color:  "rgba(195, 205, 68, 0.5)"},
                      {range: [5, 6], color: "rgba(185, 202, 42, 0.5)"},
                      {range: [6, 7], color: "rgba(165, 178, 35, 0.5)"},
                      {range: [7, 8], color:  "rgba(145, 154, 22, 0.5)"},
                      {range: [8, 9], color: "rgba(110, 143, 10, 0.5)"},
                      {range: [9, 10], color: "rgba(75, 143, 10, 0.5)"},
                      
                  ],
                     
                  threshold: {
                    line: { color: "red", width: 4 },  // Color and width of the threshold line
                    thickness: 0.75,  // Thickness of the threshold line
                    value: 2  // Value at which the threshold line is drawn
                  }
                             
              } 
          };
         
        
    
          // Set up the Layout
          let layout = {
          width: 400, 

          height: 400,
         margin: {t: 0, b:0}
        
    
          };
        
  
          // Call Plotly to plot the gauge chart
          Plotly.newPlot("gauge", [gaugetrace], layout)
      
        });  
    }
  // Call the initialize function
  init();

  // Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call chart and table functions 
    
    createMetadata(value);
    createbarchart(value);
    createBubbleChart(value);
    createGaugeChart(value);
};

