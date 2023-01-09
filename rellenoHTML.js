
const rellenarHtml=(data)=>{
  var años = getAnos(data);
  const campos = Object.keys(data[0]);

  console.log(campos);
  campos.forEach(element => {
    $("#campos").append(
      "<li><a class='dropdown-item fs-4' href='#'>"+element+"</a></li>" );
      options.append("option").text(element).property("value", element);
  });

  console.log(años);
  años.forEach(element => {
    listAños.append("option").text(element).property("value", element);
  })

}

function getAnos(data){
  var _años = new Set(data.map(d => d.year));
  return _años;
}