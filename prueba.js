function calcularFrecuenciaEnRango(arr, minimo, amplitud) {
    if (!Array.isArray(arr) || typeof minimo !== 'number' || typeof amplitud !== 'number') {
      return "Entrada no válida. Asegúrate de que arr sea un arreglo y minimo y amplitud sean números.";
    }
  
    const frecuencia = {};
  
    arr.forEach((numero) => {
      const rango = Math.floor((numero - minimo) / amplitud);
      const valor = minimo + rango * amplitud;
      const rangoInicio = valor;
      const rangoFin = valor + amplitud;
  
      const key = `${rangoInicio}-${rangoFin}`;
  
      if (frecuencia[key]) {
        frecuencia[key]++;
      } else {
        frecuencia[key] = 1;
      }
    });
  
    return frecuencia;
  }
  
  // Ejemplo de uso
  const numeros = [2, 5, 7, 10, 12, 15, 18, 20, 25, 27, 30];
  const minimo = 0;
  const amplitud = 10;
  
  const resultado = calcularFrecuenciaEnRango(numeros, minimo, amplitud);
  console.log(resultado);