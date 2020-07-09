function lineChart(params) {

   // Params validation
   try {
      if (Object.entries(params) === 0) throw 'Empty params'
      if (!params.charts || !params.charts.length) throw 'Empty charts in params'
   }
   catch (e) {
      console.log(e)
   }

   let margin, width, height, mainContainerId;

   if (params.options) { // If no options passed, set default values
      margin = params.options.margin
      width = params.options.width
      height = params.options.height
      mainContainerId = params.options.mainContainerId
   } else {
      margin = { top: 20, right: 50, bottom: 30, left: 50 }
      width = 630 - margin.left - margin.right
      height = 400 - margin.top - margin.bottom
      mainContainerId = "mainChart"
   }

   // Find max values between the datasets
   let maxValue = 0, minDates = [], maxDates = [], datalength = 0

   params.charts.forEach(chart => {
      // Find date range
      minDates.push(d3.min(chart.data, function (d) { return d.date }))
      maxDates.push(d3.max(chart.data, function (d) { return d.date }))

      // Find max value
      chart.data.forEach(datum => {
         if (datum.value > maxValue) maxValue = datum.value
      })

      // Store data length
      if (chart.data.length > datalength) datalength = chart.data.length
   })

   try {
      if (maxValue === 0) throw 'All data is 0 or null'
      if (!minDates.length || !maxDates.length) throw 'Empty dates or incorrect date format'
   } catch (e) {
      console.log(e)
   }

   // Make scales
   let x = d3.scaleTime()
      .domain([d3.min(minDates), d3.max(maxDates)])
      .range([0, width]);

   let y = d3.scaleLinear()
      .domain([0, 100]) // This is for charts that go from 0 to 100 always, otherwise must refactor code
      .range([height, 0]);

   let xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSize(0)

   let yAxis = d3.axisLeft(y)
      .tickFormat(function (d) { return d })
      .ticks(5)
      .tickSize(0)

   // Line generator object
   let line = d3.line()
      .x(function (d) { return x(d.date); })
      .y(function (d) { return y(d.value); })
   // .curve(d3.curveMonotoneX) // this makes the lines 'curvy', leave commented for straight lines

   // Add main SVG
   let svg = d3.select("#" + mainContainerId).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   // Append axis
   let horizontalAxis = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

   let verticalAxis = svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

   // Add horizontal grid lines and correct positions of axes ticks
   // svg.append("g").attr("class", "gridlines")

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


   // Append groups
   // svg.selectAll("g.chartgroup")
   //    .data([1, 2])
   //    .enter().append("g")
   //    .attr("class", "chartgroup");

   let lines = [], circles = [] // These will be used for animations

   // Append lines and circles
   params.charts.forEach(function (chart) {

      let path = svg.selectAll("path.line." + chart.id).data([chart.data]);

      path = path
         .enter()
         .append("path")
         .attr("id", "firstLine")
         .attr("class", "line " + chart.id)
         .attr("d", function (d) { return line(d); })
         .style("stroke", chart.color);

      lines.push(path)

      // // Append circles for each data point
      let circle = svg.selectAll(chart.id + ".dot").data(chart.data)

      circle = circle
         .enter().append("circle")
         .attr("class", chart.id + " dot")
         .attr("cx", function (d) { return x(d.date) })
         .attr("cy", function (d) { return y(d.value) })
         .attr("r", 7)
         .attr("fill", chart.color)
         .attr("stroke", "#fff")
         .attr("stroke-width", "2px")
         .attr("opacity", 0)
      // .on("mouseover", function (a, b, c) {
      // 	console.log(a)
      // 	this.attr('class', 'focus')
      // })
      // .on("mouseout", function () { })

      circles.push(circle)

   })

   // Animate lines
   lines.forEach(line => {
      let totalLength = line._groups[0][0].getTotalLength()

      d3.select(line._groups[0][0])
         .attr("stroke-dasharray", totalLength + " " + totalLength)
         .attr("stroke-dashoffset", totalLength)
         .transition()
         .duration(2000)
         .ease(d3.easeLinear)
         .attr("stroke-dashoffset", 0);
   })

   // Animate circles
   let counter = 0;
   const intervalId = setInterval(() => {

      circles.forEach(circle => {
         circle.each(function (d, i) {
            if (i === counter) {
               d3.select(this)
                  .transition()
                  .duration(1000)
                  .attr("opacity", 100)
            }
         })
      })

      counter += 1;
      if (counter === datalength) {
         clearInterval(intervalId);
      }
   }, 2000 / datalength);

   // Manage switches that toggle lines
   // params.charts.forEach(chart => {
   //    let switchId = '#switch-' + chart.id
   // })

   // let el1 = document.querySelector('#switch-previo');
   // let mySwitch1 = new Switch(el1,
   //    {
   //       checked: true,
   //       onSwitchColor: color1,
   //       onChange: function () {
   //          toggleLine("first", this.getChecked())
   //       }
   //    })

   // let el2 = document.querySelector('#switch-despues');
   // let mySwitch2 = new Switch(el2,
   //    {
   //       checked: true,
   //       onSwitchColor: color2,
   //       onChange: function () {
   //          toggleLine("second", this.getChecked())
   //       }

   //    });


   // function toggleLine(lineId, toggle) {
   //    d3.select("#" + lineId + "Line")
   //       .transition()
   //       .duration(200)
   //       .style("opacity", function () {
   //          return toggle ? 1 : 0
   //       })

   //    d3.selectAll("." + lineId + ".dot")
   //       .transition()
   //       .duration(200)
   //       .style("opacity", function () {
   //          return toggle ? 1 : 0
   //       })
   // }
}