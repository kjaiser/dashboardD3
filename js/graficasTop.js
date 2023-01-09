const grafTop1 = d3.select("#grafTop1")
//const grafTop2 = d3.select("#grafTop2")

const listAños = d3.select("#f-años")

const grafTop1_margins = { left: 27, top: 10, right: 20, bottom: 22 }
const grafTop1_anchoTotal = +grafTop1.style("width").slice(0, -2)
const grafTop1_altoTotal = (grafTop1_anchoTotal * 4) / 3
const grafTop1_ancho = grafTop1_anchoTotal - grafTop1_margins.left - grafTop1_margins.right
const grafTop1_alto = grafTop1_altoTotal - grafTop1_margins.top - grafTop1_margins.bottom

const svgTop1 = grafTop1
  .append("svg")
  .attr("width", grafTop1_anchoTotal)
  .attr("height", grafTop1_altoTotal)
  .attr("class", "fig")

const gTop1 = svgTop1
  .append("g")
  .attr("transform", `translate(${grafTop1_margins.left}, ${grafTop1_margins.top})`)

const grafTop1_ScaleB = d3.scaleBand().range([0, grafTop1_ancho]).paddingInner(0.2).paddingOuter(0.2);
const grafTop1_Y = d3.scaleLinear().range([grafTop1_alto,0])


const grafTop_xAxis = gTop1
  .append("g")
  .attr("transform", `translate(0, ${grafTop1_alto})`)
  .attr("class", "ejes")

const grafTop_yAxis = gTop1.append("g").attr("class", "ejes");

const grafTop = async ()=>{
  const db = await readData(bd.crimen); // obtener los datos

// filtrar unicamente los datos del parametro indiciado(filtro)
  const newDataTop = db.filter((d) => d.Parametro === parameter);
  //const db= await readData(); // obtener los datos
  var dominio  = await newDataTop.map(d => d.Valor);
  const top3 = topArray(dominio,3)
  console.log(top3)
  grafTop1_ScaleB.domain(top3)
  grafTop1_Y.domain([0,d3.max(top3, (d) => d)])
 
  
  grafTop_xAxis.transition().duration(1000).call(d3.axisBottom(grafTop1_ScaleB).tickSize(0));
  //grafTop_yAxis.transition().duration(1000).call(d3.axisLeft(grafTop1_Y).tickSize(0));


  const barTop1 = gTop1.selectAll("rect").data(top3);
  barTop1
    .exit()
    .transition()
    .duration(500)
    .attr("height", 0)
    .remove()

  actualizarGraficaTop(barTop1);
      
}

const actualizarGraficaTop = (barTop1) => {

  barTop1
    .enter()
    .append("rect")
    .merge(barTop1)
    .attr("x",(d) => grafTop1_ScaleB(d))
    .transition()
    .duration(1000)
    .attr("y", (d) =>grafTop1_Y(d))
    .attr("height", (d) => grafTop1_alto - grafTop1_Y(d))
    .attr("width",  grafTop1_ScaleB.bandwidth)
    .attr("fill",graf_Color);
  
};

grafTop()