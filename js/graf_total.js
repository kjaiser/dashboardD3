
const graficaTotal = d3.select("#grafTotal");

//generar margenes automaticos
const graficaTotalMargins = { top: 25, right: 20, bottom: 30, left: 50 };
const graficaTotalTotalWith = +graficaTotal.style("width").slice(0, -2);
const graficaTotalTotalHeigth = (graficaTotalTotalWith * 6) / 16;
const graficaTotalWith = graficaTotalTotalWith - graficaTotalMargins.left - graficaTotalMargins.right;
const graficaTotalHeigth = graficaTotalTotalHeigth - graficaTotalMargins.top - graficaTotalMargins.bottom;

// crear dimensiones del chart
const svgTotal = graficaTotal
  .append("svg")
  .attr("width", graficaTotalTotalWith)
  .attr("height", graficaTotalTotalHeigth)
  .attr("class", "graf");

// Agrupar elementos en el chart
const gTotal = svgTotal
  .append("g")
  .attr("transform", `translate(${graficaTotalMargins.left}, ${graficaTotalMargins.top})`);

// generar escaladores para los ejes
const graficaTotalY = d3.scaleBand().range([0, graficaTotalHeigth]);
// invertir y (por defecto está inverso)
const graficaTotalX = d3.scaleLinear().range([0,graficaTotalWith]);

// // crear ejes del chart
const graficaTotal_xAxis = gTotal
  .append("g")
  .attr("transform", "translate(0," + graficaTotalHeigth  + ")")
  .attr("class", "axis");

const graficaTotal_yAxis = gTotal.append("g").attr("class", "axis");

// cargar los datos y crear los dominios de las ejes
const graficaTotalB= async () => {
  const data = await readData(bd.crimen); // obtener los datos

  // filtrar unicamente los datos del parametro indiciado(filtro)
  const newData = data.filter((d) => d.Parametro === parameter);

  graficaTotalY.domain(newData.map((d) => (d.Agno = `${d.Periodo.replace("Trimestre ", "T")}(${d.Agno})`))).padding(0.1);
  graficaTotalX.domain([0,d3.max(newData, (d) => d.Valor)])
  //axisY = d3.axisLeft(graficaTotalY)
  graf_Color.domain(d3.map(newData, (d)=>d.Agno))

  // efectos al actualizar el filtro
  graficaTotal_xAxis.transition().duration(1000).call(d3.axisBottom(graficaTotalX).tickSizeOuter([0]));
  graficaTotal_yAxis.transition().duration(1000).call(d3.axisLeft(graficaTotalY).ticks(5).tickSize(0).tickSizeOuter([0]));

  gTotal.append("g")
    .attr("transform", `translate(-15,-5)`)
    .append("text")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Und");

  const bar = gTotal.selectAll("rect").data(newData);

  actualizargraficaTotal(bar);
};

// funcion que genera y actualiza la grafica según los datos obtenidos
const actualizargraficaTotal = (bar) => {

  bar
    .enter()
    .append("rect")
    .merge(bar)
    .attr("x", 0)
    //.attr("y", graficaTotalHeigth)
    .transition()
    .duration(1000)
    .attr("y", (d)=>  graficaTotalY(d.Agno))
    .attr("height",10)
    .attr("width", (d)=> graficaTotalX(d.Valor))
    .attr("fill", graf_Color);
};


optionsFilter();
graficaTotalB();

