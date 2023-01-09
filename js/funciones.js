var topArray = (array, n)=>{
    var top = array.map(d => d).sort(function(a, b) {
        return (b-a);
        });
    return top.slice(0, n);
}
// aplica el filtro seleccionado para actualizar los datos
const optionChanged = (option) => {
    parameter = option;

    $(".tituloGrafica").html("<h3>"+parameter+"</h3> ");
    console.log(parameter)
    graficaBarra();
   // ScatterPlot();
    grafTop();
    graficaTotalB();
  };