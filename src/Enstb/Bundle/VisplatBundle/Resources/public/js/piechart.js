function createPieChart(jsonData) {

    //d3.json(, function (error, data) {
    // Binding json data from json object instead of reading from file
    data = JSON.parse(jsonData);
        data.forEach(function (d) {
            d.Event = d.Event.toLowerCase();
            d.Duration = (d.Duration * 100).toFixed(2);
        });

        var margin = {top: 40, right: 20, bottom: 10, left: 50};

        var w = 1200,                           //width
            h = 900,                            //height
            r = 250,                            //radius
            color = d3.scale.category10();     //range of colors

        // -------------------------------------------------------------------------------------------------------------------------------
        // CREATION OF TITLE

        var svg = d3.select("#piechart")
            .append("svg")
            .attr("width", w)
            .attr("height", margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("text")
            .attr("x", (w / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "28px")
            .style("font-family", "Arial")
            .style("text-decoration", "underline")
            .text("Time-consuming activities");

        // -------------------------------------------------------------------------------------------------------------------------------
        // CREATION OF PIE CHART

        var vis = d3.select("#piechart")
            .append("svg:svg")
            .append("svg:svg")
            .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
            .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + (r + 400) + "," + (r + 10) + ")")    //choose of position of the pie chart in the page

        var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
            .outerRadius(r);

        var pie = d3.layout.pie()           //this will create arc data for us given a list of values
            .value(function (d, i) {
                return data[i].Duration;
            });    //we must tell it out to access the value of each element in our data array

        var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
            .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
            .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
            .attr("class", "slice");    //allow us to style things in the slices (like text)

        arcs.append("svg:path")
            .attr("fill", function (d, i) {
                return color(i);
            }) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function


        // second arc for labels
        var arc2 = d3.svg.arc()
            .outerRadius(r)
            .innerRadius(r + 170);

        // label attached to second arc

        arcs.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc2.centroid(d) + ")";
            })
            .attr("dy", "-2.5em")
            .style("text-anchor", "middle")
            .text(function (d, i) {
                if ((data[i].Duration) >= 10) {
                    return data[i].Event + " ; Freq. : " + data[i].Frequency + " ; " + data[i].Duration + "%";
                }
            });


        // -------------------------------------------------------------------------------------------------------------------------------
        // CREATION OF TABLE FOR DETAILS

        function tabulate(data, columns) {
            var table = d3.select("#piechartTable").append("table"),
                thead = table.append("thead"),
                tbody = table.append("tbody");

            // append the header row
            thead.append("tr")
                .selectAll("th")
                .data(columns)
                .enter()
                .append("th")
                .text(function (column) {
                    return column;
                });

            // create a row for each object in the data
            var rows = tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr");

            // create a cell in each row for each column
            var cells = rows.selectAll("td")
                .data(function (row) {
                    return columns.map(function (column) {
                        return {column: column, value: row[column]};
                    });
                })
                .enter()
                .append("td")
                .text(function (d) {
                    return d.value;
                });

            return table;
        }

// render the table
        var activities = tabulate(data, ["Event", "Frequency", "Duration"]);

// uppercase the column headers
        activities.selectAll("thead th")
            .text(function (column) {
                return column.charAt(0).toUpperCase() + column.substr(1);
            });

// sort by frequency
        activities.selectAll("tbody tr")
            .sort(function (a, b) {
                return d3.descending(a.Frequency, b.Frequency);
            });


 //   }); // end of json import
}