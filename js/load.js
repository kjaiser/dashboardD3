const readData = async (dataName) => {
    const {
      Respuesta: {
        Datos: { Metricas: metrics },
      },
    } = await d3.json("data/"+dataName, d3.autoType);
    // autoType asigna el tipo de dato segun el valor del campo
    // OJO: verificar el valor de los datos cuando (null, false)
  
    const data = metrics[0].Datos; // se obtiene unicamente el array de datos
  
    return data;
};
