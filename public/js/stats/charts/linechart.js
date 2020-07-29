// const { param } = require("../../../../routes/views/views");

function LineChart(params) {

   // Params validation
   try {
      if (Object.entries(params) === 0) throw 'Empty params'
      if (!params.charts || !params.charts.length) throw 'Empty charts in params'
   }
   catch (e) {
      console.log(e)
   }

   let margin, width, height, mainContainerId, parentContainerId, chartTitle, switches;

   if (params.options) {
      margin = params.options.margin
      width = params.options.width
      height = params.options.height
      mainContainerId = params.options.mainContainerId
      parentContainerId = params.options.parentContainerId
      chartTitle = params.options.chartTitle
      switches = params.switches
   } else {
      // If no options passed, set default values
      margin = { top: 20, right: 50, bottom: 30, left: 50 }
      width = 630 - margin.left - margin.right
      height = 400 - margin.top - margin.bottom
      mainContainerId = "mainChart"
      chartTitle = "(Insert chart title)"
   }


   // Get container width dynamically
   var parentContainer = document.getElementById(parentContainerId)

   if (parentContainer) {
      width = parentContainer.getBoundingClientRect().width - margin.left - margin.right
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
      .tickFormat(function (d) {  return String(d).split(" ")[0] })
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
   let mainContainer = d3.select("#" + mainContainerId)

   let svg = mainContainer.selectAll("svg#" + mainContainerId + "_chart").data([params.charts])
      .join("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", mainContainerId + "_chart");

   let g = svg.selectAll("g#mainGroup").data([params.charts])
      .join("g")
      .attr("id", "mainGroup")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

   // Append axis
   let horizontalAxis = g.selectAll("g#xAxisGroup").data([params.charts])
      .join("g")
      .attr("class", "x axis")
      .attr("id", "xAxisGroup")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

   let verticalAxis = g.selectAll("g#yAxisGroup").data([params.charts])
      .join("g")
      .attr("class", "y axis")
      .attr("id", "yAxisGroup")
      .call(yAxis)

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

   let lines = [], circles = [] // These will be used for animations

   // Append lines and circles
   params.charts.forEach(function (chart) {

      let path = g.selectAll("path.line." + chart.id).data([chart.data])
         .join("path")
         .attr("id", chart.id)
         .attr("class", "line " + chart.id)
         .attr("d", function (d) { return line(d); })
         .style("stroke", chart.color);

      lines.push(path)

      // Append circles for each data point
      let circle = g.selectAll("." + chart.id + ".dot").data(chart.data)
         .join("circle")
         .attr("class", chart.id + " dot")
         .attr("cx", function (d) { return x(d.date) })
         .attr("cy", function (d) { return y(d.value) })
         .attr("r", 7)
         .attr("fill", chart.color)
         .attr("stroke", "#fff")
         .attr("stroke-width", "2px")
         .attr("opacity", () => {
            if (params.event === 'create') return 0
            else return 100
         })

      circles.push(circle)
   })

   if (params.event === 'create') {
      // Animate lines
      lines.forEach(l => {
         let totalLength = l._groups[0][0].getTotalLength()

         d3.select(l._groups[0][0])
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

   } else if (params.event === 'resize') {
      lines.forEach(l => {
         let totalLength = l._groups[0][0].getTotalLength()

         d3.select(l._groups[0][0])
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", 0);
      })
   }

   // Manage switches that toggle lines, if any
   if (switches.length > 0) {

      params.charts.forEach(chart => {
         switches.forEach(sw => {
            if (sw.lineId === chart.id) {
               let lineSwitchDOM = document.querySelector('#' + sw.switchId)

               let lineSwitch = new Switch(lineSwitchDOM,
                  {
                     checked: true,
                     onSwitchColor: chart.color,
                     onChange: function () {
                        toggleLine(chart.id, this.getChecked())
                     }
                  })
            }
         })
      })
   }

   function toggleLine(lineId, toggle) {
      svg.select("#" + lineId)
         .transition()
         .duration(200)
         .style("opacity", function () {
            return toggle ? 1 : 0
         })

      svg.selectAll("." + lineId + ".dot")
         .transition()
         .duration(200)
         .style("opacity", function () {
            return toggle ? 1 : 0
         })
   }
}