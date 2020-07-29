
// General
let margin = { top: 20, right: 50, bottom: 50, left: 50 },
   margin2 = { top: 50, right: 25, bottom: 30, left: 30 },
   width = 630 - margin.left - margin.right, // default width
   height = 400 - margin.top - margin.bottom,
   color1 = "#69D2E7",
   color2 = "#FA6900";

// Manage data
let data = [],
   data2 = []

let formatTime = d3.timeParse("%d-%b-%y")

for (let i = 0; i < 7; i++) {
   data.push({ date: formatTime(+(i + 1) + "-Jul-20"), value: getRandomInt(100) })
   data2.push({ date: formatTime(+(i + 1) + "-Jul-20"), value: getRandomInt(100) })
}

// Line chart
let lineChartOptions = {
   mainContainerId: "energy-line-chart",
   parentContainerId: "dashboard-tabs",
   chartTitle: "Nivel de energía",
   chartLegend: "",
   margin: margin,
   width: width,
   height: height
}

let switches = [
   {
      containerId: "switch-previous-container",
      switchId: "switch-previous",
      lineId: "energy-before"
   },
   {
      containerId: "switch-after-container",
      switchId: "switch-after",
      lineId: "energy-after"
   }]

let line1 = {
   id: "energy-before",
   data: data,
   color: color1,
   label: "Antes"
}

let line2 = {
   id: "energy-after",
   data: data2,
   color: color2,
   label: "Después"
}

// Call line chart function
LineChart({ options: lineChartOptions, charts: [line1, line2], switches: switches, event: 'create' })

// Bar chart

barChartOptions = {
   mainContainerId: "activity-time-chart",
   parentContainerId: "dashboard-tabs",
   chartTitle: "Nivel de energía",
   chartLegend: "",
   margin: margin2,
   width: width,
   height: height,
   color: color1,
   legend: "Minutos"
}

BarChart({ options: barChartOptions, data: data })



// Resize charts
window.addEventListener('resize', function (event) {
   LineChart({ options: lineChartOptions, charts: [line1, line2], switches: switches, event: 'resize' })
   BarChart({ options: barChartOptions, data: data })
});



function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}
