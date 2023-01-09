
const barMax= (db,añoSelect)=>{
  
  var dominio  = db.map(d => d);
  console.log(dominio)
  const scaleB = d3.scaleBand().domain(dominio).range([0, ancho2]).paddingInner(0.2).paddingOuter(0.2);
  const y = d3.scaleLinear().domain([0,d3.max(db, (d) => d)]).range([0,alto2])
  const color = d3.scaleOrdinal().domain(dominio).range(d3.schemeCategory10)


  const xAxis = d3.axisBottom(scaleB)
  .tickSize(0)
  const yAxis = d3.axisLeft(y)
  .tickSize(0)

  g2.append("g")
    .attr("transform", `translate(0, ${alto2})`)
    .attr("class", "ejes")
    .call(xAxis)
    .selectAll("text")
      .attr("y","5")
      .attr("x","-5")
      .attr("text-anchor", "middle")

  g2.append("g")
    .attr("class", "ejes")
    .call(yAxis)


  const bar = g2.append("g")
    .selectAll("bar")
    .data(db)
    .enter();


  bar.append("rect")
    .attr("y",alto2)
    .attr("x",(d) => scaleB(d))
    .attr("width",  scaleB.bandwidth)
    .attr("height", 0)
    .transition()
    .duration(2000)
    .attr("y", (d) => alto2 - y(d))
    .attr("height", (d) => y(d))
    .attr("fill",color);

}


const graficaBarras = (data,añoSelect)=>{
  const newData = d3.filter(data, (d) => d.year == añoSelect);

  var dominio  = newData.map(d => d.country);
  const scaleB = d3.scaleBand().domain(dominio).range([0, ancho]).paddingInner(0.2).paddingOuter(0.2);
  const y = d3.scaleLog().domain([d3.min(newData, (d) => d.population), d3.max(newData, (d) => d.population)]).range([0,alto]).base(10)
  const color = d3.scaleOrdinal().domain(dominio).range(d3.schemeCategory10)

  const xAxis = d3.axisBottom(scaleB)
  .tickSize(0)
  const yAxis = d3.axisLeft(y)
  .tickSize(-ancho)

  g2.append("g")
    .attr("transform", `translate(0, ${alto})`)
    .attr("class", "ejes")
    .call(xAxis)
    .selectAll("text")
      .attr("y","0")
      .attr("x","-5")
      .attr("text-anchor", "end")
      .attr("transform","rotate(-90)")

  g2.append("g")
    .attr("class", "ejes")
    .call(yAxis)

  const bar = g2.append("g")
    .selectAll("bar")
    .data(newData)
    .enter();


  bar.append("rect")
    .attr("y",alto)
    .attr("x",(d) => scaleB(d.country))
    .attr("width",  scaleB.bandwidth)
    .attr("height", 0)
    .transition()
    .duration(2000)
    .attr("y", (d) => alto - y(d.population))
    .attr("height", (d) => y(d.population))
    .attr("fill",color);
}

const colocaEjes = (ejex, ejey)=>{
  
}


const scatterPlot=(data,añoSelect)=>{
  
  const newData = d3.filter(data, (d) => d.year == añoSelect)

  console.log(parameter);
  const year = g
    .append("text")
    .attr("x", 5*ancho / 6)
    .attr("y", 4*alto / 5)
    .attr("class", "year")


  const x = d3.scaleLog().range([0, ancho])
  const y = d3.scaleLinear().range([alto, 0])
  const xAxis = d3.axisBottom(x)
  .tickSize(0)
  const yAxis = d3.axisLeft(y)
  .tickSize(0)
  const A = d3.scaleLinear().range([20, 30600])

  const continente = d3.scaleOrdinal().range(d3.schemeSet2)

  var iy, miny, maxy

  x.domain(d3.extent(data, (d) => d.income))
  y.domain(d3.extent(data, (d) => d.life_exp))
  A.domain(d3.extent(data, (d) => d.population))
  continente.domain(Array.from(new Set(data.map((d) => d.continent))))

  miny = d3.min(newData, (d) => d.year)
  maxy = d3.max(newData, (d) => d.year)
  iy = miny

  g.append("g")
    .attr("transform", `translate(0, ${alto})`)
    .attr("class", "ejes")
    .call(xAxis)
  g.append("g").attr("class", "ejes").call(yAxis)

/*  g.append("text")
    .attr("x", ancho / 2)
    .attr("y", alto + 30)
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Ingreso per cápita anual (USD)")

  g.append("g")
    .attr("transform", `translate(-25, ${alto / 2})`)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Expectativa de Vida (años)")
*/  

  const circle = g.append("g")
    .attr("class","g-circular")
    .selectAll("circle")
    .data(newData)
    .enter();

  circle
    .append("circle")
    .attr("cx", (d) => x(d.income))
    .attr("cy", (d) => y(d.life_exp))
    .attr("r", 0)
    .attr("fill", "#00FF0088")
    .attr("stroke", "#00000088")
    .attr("clip-path", "url(#clip)")
    .on("click", (_, d) => showTooltip(d))
    // .on("mouseout", () => hideTooltip())
    .merge(circle)
    .transition()
    .duration(500)
    .attr("cx", (d) => x(d.income))
    .attr("cy", (d) => y(d.life_exp))
    .attr("r", (d) => Math.sqrt(A(d.population) / Math.PI))
    .attr("fill", (d) => continente(d.continent) + "88")

    circle
    .exit()
    .transition()
    .duration(500)
    .attr("r", 0)
    .attr("fill", "#ff000088")
    .remove()

  year.text(iy)

}
