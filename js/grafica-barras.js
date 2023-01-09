// Seleccionar elemento chart
//const graficaBarras = d3.select("#grafica-barras");
const graficaBarras = d3.select("#graf1");

const options = d3.select("#options");

//generar margenes automaticos
const graficaBarrasMargins = { top: 25, right: 20, bottom: 30, left: 50 };
const graficaBarrasTotalWith = +graficaBarras.style("width").slice(0, -2);
const graficaBarrasTotalHeigth = (graficaBarrasTotalWith * 6) / 16;
const graficaBarrasWith = graficaBarrasTotalWith - graficaBarrasMargins.left - graficaBarrasMargins.right;
const graficaBarrasHeigth = graficaBarrasTotalHeigth - graficaBarrasMargins.top - graficaBarrasMargins.bottom;

// crear dimensiones del chart
const svg4 = graficaBarras
  .append("svg")
  .attr("width", graficaBarrasTotalWith)
  .attr("height", graficaBarrasTotalHeigth)
  .attr("class", "graf");

// Agrupar elementos en el chart
const g4 = svg4
  .append("g")
  .attr("transform", `translate(${graficaBarrasMargins.left}, ${graficaBarrasMargins.top})`);

// generar escaladores para los ejes
const graficaBarrasX = d3.scaleBand().range([0, graficaBarrasWith]);
// invertir y (por defecto está inverso)
const graficaBarrasY = d3.scaleLinear().range([graficaBarrasHeigth, 0]);

const graf_Color = d3.scaleOrdinal().range(d3.schemeCategory10)

const axisY = d3.axisLeft(graficaBarrasY).ticks(5).tickSize(-graficaBarrasWith).tickSizeOuter([0])
// // crear ejes del chart
const graficaBarras_xAxis = g4
  .append("g")
  .attr("transform", "translate(0," + graficaBarrasHeigth  + ")")
  .attr("class", "axis");

const graficaBarras_yAxis = g4.append("g").attr("class", "axis");

// por defecto filtrar los datos de este parametro
let parameter = "Agresión sexual con penetración";
$(".tituloGrafica").html("<h3>"+parameter+"</h3> ");

// cargar los datos y crear los dominios de las ejes
const graficaBarra= async () => {
  const data = await readData(bd.crimen); // obtener los datos

  // filtrar unicamente los datos del parametro indiciado(filtro)
  const newData = data.filter((d) => d.Parametro === parameter);

  graficaBarrasX.domain(newData.map((d) => (d.Agno = `${d.Periodo.replace("Trimestre ", "T")}(${d.Agno})`))).padding(0.2);
  graficaBarrasY.domain([0, d3.max(newData, (d) => d.Valor) * 1.1]);
  //axisY = d3.axisLeft(graficaBarrasY)
  graf_Color.domain(d3.map(newData, (d)=>d.Agno))

  // efectos al actualizar el filtro
  graficaBarras_xAxis.transition().duration(1000).call(d3.axisBottom(graficaBarrasX).tickSizeOuter([0]));
  graficaBarras_yAxis.transition().duration(1000).call(axisY);

  //style("stroke-dasharray", ("10,3"))

  /*
  g4.append("text")
    .attr("x", graficaBarrasWith / 2)
    .attr("y", -15)
    .attr("class", "labels fs-6")
    .attr("text-anchor", "middle")
    .text("Infracciones Penales por Trimestre");
*/

  g4.append("g")
    .attr("transform", `translate(-15,-5)`)
    .append("text")
    //.attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Und");

  const rect = g4.selectAll("rect").data(newData);

  actualizarGraficaBarras(rect);
};

// funcion que genera y actualiza la grafica según los datos obtenidos
const actualizarGraficaBarras = (rect) => {

  rect
    .enter()
    .append("rect")
    .merge(rect)
    .attr("x", (d) => graficaBarrasX(d.Agno))
    //.attr("y", graficaBarrasHeigth)
    .transition()
    .duration(1000)
    .attr("y", (d) => graficaBarrasY(d.Valor))
    .attr("height", (d) => graficaBarrasHeigth - graficaBarrasY(d.Valor))
    .attr("width", graficaBarrasX.bandwidth())
    .attr("fill", graf_Color);
};

// agrega los parametros obtenidos del dataset a elemento de seleccion
const optionsFilter = async () => {

  const data = await readData(bd.crimen);

  const filters = new Set(data.map((d) => d.Parametro)); // solo valores unicos

  // Actualiza el dom del select para agregar los valores
  filters.forEach((sample) => {
    options.append("option").text(sample).property("value", sample);
  });
};



optionsFilter();
graficaBarra();

