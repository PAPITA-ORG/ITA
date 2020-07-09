
// General
let margin = { top: 20, right: 50, bottom: 30, left: 50 },
   width = 630 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom,
   color1 = "#69D2E7",
   color2 = "#FA6900";

// Manage data
let data = [],
   data2 = []

let formatTime = d3.timeParse("%d-%b-%y")

for (let i = 0; i < 7; i++) {
   data.push({ date: formatTime(+(i + 1) + "-Jun-20"), value: getRandomInt(100) })
   data2.push({ date: formatTime(+(i + 1) + "-Jun-20"), value: getRandomInt(100) })
}

let optionsObject = {
   mainContainerId: "mainChart",
   switchesContainerId: "energySwitches",
   margin: margin,
   width: width,
   height: height
}

let chart1 = {
   id: "energy-before",
   data: data,
   color: color1
}

let chart2 = {
   id: "energy-after",
   data: data2,
   color: color2
}

// Call line chart function
lineChart({ options: optionsObject, charts: [chart1, chart2] })

// // Manage switches
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

function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}

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