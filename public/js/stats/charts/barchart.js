function BarChart(params) {

   let data = params.data

   let margin, width, height, mainContainerId, parentContainerId, color


   // // Bar chart

   // barChartOptions = {
   //    mainContainerId: "activity-time-chart",
   //    parentContainerId: "dashboard-tabs",
   //    chartTitle: "Nivel de energía",
   //    chartLegend: "",
   //    margin: margin,
   //    width: width,
   //    height: height
   //    color: color
   // }

   if (params.options) {
      margin = params.options.margin
      width = params.options.width
      height = params.options.height
      mainContainerId = params.options.mainContainerId
      parentContainerId = params.options.parentContainerId
      color = params.options.color

      // Get container width dynamically
      var parentContainer = document.getElementById(parentContainerId)

      if (parentContainer) {
         width = parentContainer.getBoundingClientRect().width - margin.left - margin.right
      }
   } else {
      margin = { top: 20, right: 10, bottom: 30, left: 40 }
      width = 600 - margin.left - margin.right
      height = 450 - margin.top - margin.bottom
      color = "steelblue"
   }

   // set the ranges
   var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

   var y = d3.scaleLinear()
      .range([height, 0]);

   let mainContainer = d3.select("#" + mainContainerId)

   let svg = mainContainer.selectAll("svg#" + mainContainerId + "_chart").data([params.data])
      .join("svg")
      .attr("id", mainContainerId + "_chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

   let g = svg.selectAll("g.mainGroup").data([params.data])
      .join("g")
      .attr("class", "mainGroup")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


   x.domain(data.map(function (d) {
      return d.date
   }));

   y.domain([0, d3.max(data, function (d) { return d.value; })]);


   // add the x Axis
   let horizontalAxis = g.selectAll("g.x.axis").data([data])
      .join("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0));

   horizontalAxis.selectAll("g.tick").each(function (d) {
      let thisTick = d3.select(this)
      let thisText = thisTick.select("text").text()
      thisTick.select("text").text(dateToTextFormatter(thisText))
   })

   // add the y Axis
   let verticalAxis = g.selectAll("g.y.axis").data([data])
      .join("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y).ticks(5));

   // Add horizontal grid lines and correct positions of axes ticks
   verticalAxis.selectAll("g.tick").each(function (d) {

      let thisTick = d3.select(this)

      thisTick
         .select("text")
         .attr("x", "-10")

      thisTick
         .select("line")
         .attr("class", "gridline horizontal")
         .attr("x1", "0")
         .attr("x2", width)
   })

   horizontalAxis.selectAll("g.tick text").each(function (d) {
      d3.select(this).attr("y", 15)
   })

   // Add legend
   chartLegendG = g.selectAll("g.chartLegend").data([data])
      .join("g")
      .attr("class", "chartLegend")
      .attr("transform", "translate(" + (10 - margin.left) + "," + (10 - margin.top) + ")")

   chartLegendG.selectAll("rect.legend").data([data])
      .join("rect")
      .attr("class", "legend")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", color)

   chartLegendG.selectAll("text.legend").data([data])
      .join("text")
      .attr("class", "legend")
      .attr("y", 15)
      .attr("x", 30)
      // .attr("fill", color)
      .text(params.options.legend)

   // append the rectangles for the bar chart
   g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x(d.date); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.value); })
      .attr("fill", color)
      .attr("height", function (d) { return height - y(d.value); });


   function dateToTextFormatter(date) {
      let splitted = String(date).split(" ")

      if (width < 350) {
         return splitted[0]
      }
      return splitted[0] + " " + String(+splitted[2])

   }
}

