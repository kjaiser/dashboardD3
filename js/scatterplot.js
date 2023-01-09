const scatter = d3.select("#graf1");

//generar margenes automaticos
const scatterMargins = { top: 10, right: 20, bottom: 30, left: 50 };
const scatterTotalWith = +scatter.style("width").slice(0, -2);
const scatterTotalHeigth = (scatterTotalWith * 7) / 16;
const scatterWith = scatterTotalWith - scatterMargins.left - scatterMargins.right;
const scatterHeigth = scatterTotalHeigth - scatterMargins.top - scatterMargins.bottom;

// crear dimensiones del chart
const svg1 = scatter
  .append("svg")
  .attr("width", scatterTotalWith)
  .attr("height", scatterTotalHeigth)
  .attr("class", "graf");

// Agrupar elementos en el chart
const g1 = svg1
  .append("g")
  .attr("transform", `translate(${scatterMargins.left}, ${scatterMargins.top})`);

// generar escaladores para los ejes
const scatterX = d3.scaleBand().range([0, scatterWith]);
// invertir y (por defecto está inverso)
const scatterY = d3.scaleLinear().range([scatterHeigth, 0]);
// // crear ejes del chart
const scatter_xAxis = g1
  .append("g")
  .attr("transform", "translate(0," + scatterHeigth  + ")")
  .attr("class", "axis");

const scatter_yAxis = g1.append("g").attr("class", "axis");

$(".tituloGrafica").html("<h3>"+parameter+"</h3> ");
// cargar los datos y crear los dominios de las ejes
const ScatterPlot= async () => {
  const data = await readData(bd.crimen); // obtener los datos

  // filtrar unicamente los datos del parametro indiciado(filtro)
  const newData = data.filter((d) => d.Parametro === parameter);

  scatterX.domain(newData.map((d) => (d.Agno = `${d.Periodo.replace("Trimestre ", "T")} (${d.Agno})`))).padding(0.2);
  scatterY.domain([0, d3.max(newData, (d) => d.Valor) * 1.1]);

  //axisY = d3.axisLeft(scatterY)
  

  // efectos al actualizar el filtro
  scatter_xAxis.transition().duration(1000).call(d3.axisBottom(scatterX).tickSizeOuter([0]));
  scatter_yAxis.transition().duration(1000).call(d3.axisLeft(scatterY).ticks(5).tickSize(0));

  //style("stroke-dasharray", ("10,3"))

  /*
  g4.append("text")
    .attr("x", scatterWith / 2)
    .attr("y", -15)
    .attr("class", "labels fs-6")
    .attr("text-anchor", "middle")
    .text("Infracciones Penales por Trimestre");
*/
/*
  g1.append("g")
    .attr("transform", `translate(-15,-5)`)
    .append("text")
    //.attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Und");
*/
  const circle = g1.selectAll("circle").data(newData);

  actualizarscatter(circle);
};

// funcion que genera y actualiza la grafica según los datos obtenidos
const actualizarscatter = (circle) => {

  circle
    .enter()
    .append("circle")
    .merge(circle)
    .attr("cx", (d) => scatterX(d.Agno)+scatterX.bandwidth()/2)
    //.attr("y", scatterHeigth)
    .transition()
    .duration(1000)
    .attr("cy", (d) => scatterY(d.Valor))
    .attr("r", (d) => (graficaBarrasHeigth-scatterY(d.Valor))/8)
    //.attr("width", scatterX.bandwidth())
    .attr("fill",graf_Color);
};


ScatterPlot();

