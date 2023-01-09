
var data;
var iy;

const graf1 = d3.select("#graf1")
const graf2 = d3.select("#graf2")
const options = d3.select("#options");
const listAños = d3.select("#f-años")

const margins = { left: 20, top: 10, right: 10, bottom: 25 }
const anchoTotal = +graf1.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16
const ancho = anchoTotal - margins.left - margins.right
const alto = altoTotal - margins.top - margins.bottom

let parameter = "";
let añoSelect;
  
let scaleMaxB;
let yMaxBar ;
let colorMaxBar;
let xAxisGroup, yAxisGroup ;

const margins2 = { left: 25, top: 10, right: 20, bottom: 22 }
const anchoTotal2 = +graf2.style("width").slice(0, -2)
const altoTotal2 = (anchoTotal2 * 9) / 16
const ancho2 = anchoTotal2 - margins2.left - margins2.right
const alto2 = altoTotal2 - margins2.top - margins2.bottom

const svg = graf1
  .append("svg")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "fig")

const g = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)
  
const svg2 = graf2
  .append("svg")
  .attr("width", anchoTotal2)
  .attr("height", altoTotal2)
  .attr("class", "fig")

  const g2 = svg2
  .append("g")
  .attr("transform", `translate(${margins2.left}, ${margins2.top})`)

// aplica el filtro seleccionado para actualizar los datos
const render=(añoSelect)=>{
  barMax(topData(data, 5),añoSelect);
  scatterPlot(data,añoSelect)
}

const load = async () => {
  data = await d3.csv("data/gapminder.csv", d3.autoType)
  data = d3.filter(data, (d) => d.income > 0 && d.life_exp != null)


  rellenarHtml(data);
  iy = d3.min(data, (d) => d.year);
  render(iy);
  //scatterPlot(data);
  //barMax(topData(data, 5));
  //optionsFilter ();
}

load()
