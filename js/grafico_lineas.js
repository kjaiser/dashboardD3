//const grafLinea = d3.select("#graf1")
const grafLinea = d3.select("#grafica-barras")

// Establecemos las dimensiones y los márgenes del gráfico
const grafLinea_margin = {top: 0, right: 0, bottom: 20, left: 50}
const grafLinea_anchoTotal = +grafLinea.style("width").slice(0, -2)
const grafLinea_altoTotal = (grafLinea_anchoTotal * 7) / 16
const grafLinea_width = grafLinea_anchoTotal - grafLinea_margin.left - grafLinea_margin.right
const grafLinea_height = grafLinea_altoTotal - grafLinea_margin.top - grafLinea_margin.bottom;
// Creamos la figura svg
const grafLinea_svg = grafLinea
    .append("svg")
    .attr("width", grafLinea_anchoTotal)
    .attr("height", grafLinea_altoTotal)
    .attr("class", "fig")

const g5 = grafLinea_svg
    .append("g")
    .attr("transform",`translate(${grafLinea_margin.left}, ${grafLinea_margin.top})`);

// generar escaladores para los ejes
const grafLinea_x = d3.scaleBand().range([0, grafLinea_width]);
// invertir y (por defecto está inverso)
const grafLinea_y = d3.scaleLinear().range([grafLinea_height, 0]);

// Creamos una línea que más tarde cargaremos en el path

var valueline = d3.line()
    .x(function(d) { return grafLinea_x(d.Agno); })
    .y(function(d) { return grafLinea_y(d.Valor); })
    .curve(d3.curveBasis);

// Establecemos las escalas y sus rangos a lo largo de los ejes x y
// Compilamos un parser para las fechas (por ejemplo: 1-May-12)
const grafLinea_xAxis = g5
  .append("g")
  .attr("transform", "translate(0," + grafLinea_height  + ")")
  .attr("class", "axis");

const grafLinea_yAxis = g5.append("g").attr("class", "axis");

// Obtenemos los datos
const graficaLineas = async ()=>{
    const dataL = await readData(bd.crimen); // obtener los datos
    console.log(dataL)
    // Escalamos el rango de los datos
    grafLinea_x.domain(dataL.map((d) => (d.Agno = `${d.Periodo.replace("Trimestre ", "T")}(${d.Agno})`)));
    grafLinea_y.domain([0, d3.max(dataL, (d) => d.Valor) * 1.1]);
    
  // efectos al actualizar el filtro
    grafLinea_xAxis.transition().duration(1000)
        .call(d3.axisBottom(grafLinea_x).tickSize(-grafLinea_height)
        .tickSizeOuter([0]));
    grafLinea_yAxis.transition().duration(1000).call(d3.axisLeft(grafLinea_y).ticks(5).tickSize(-grafLinea_width).tickSizeOuter([0]));
  
    const linea = g5.append("path")
        .data(dataL)
        .attr("class", "line")
        .attr("d", valueline) 
    linea.attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        ;
  }

graficaLineas();