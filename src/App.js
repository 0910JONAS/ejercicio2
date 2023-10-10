
import './App.css';

import Chart from 'chart.js/auto';

let mychart;
const datos = [18.799, 14.889, 20.977, 25.106, 24.793, 26.933, 11.266, 19.063, 24.380, 15.653,
  17.239, 13.238, 12.612, 16.089, 16.906, 11.528, 17.728, 18.384, 20.539, 18.538,
  18.692, 18.519, 25.371, 19.659, 19.255, 17.947, 27.889, 23.463, 29.503, 17.380,
  26.646, 13.550, 22.156, 23.609, 27.676, 19.662, 17.905, 22.701, 18.475, 23.030,
  14.223, 16.611, 13.914, 18.548, 19.870, 20.112, 18.709, 28.778, 13.030, 17.054,
  9.690, 25.791, 14.881, 17.386, 23.031, 21.867, 23.498, 22.383, 14.513, 15.537,
  22.776, 21.291, 16.241, 19.036, 20.526, 22.231, 20.555, 16.356, 27.539, 21.949,
  20.289, 23.319, 23.448, 17.454, 16.307, 24.445, 15.195, 13.764, 22.845, 22.554,
  28.823, 25.775, 25.216, 20.452, 20.008, 21.815, 19.898, 15.781, 12.901, 3.313,
  21.777, 22.472, 20.854, 15.892, 24.953, 18.755, 16.640, 16.715, 18.284, 18.187];

datos.sort((a, b) => a - b);
function App() {

  function calcularMedia(datos) {
    let suma = 0;
    for (let i = 0; i < datos.length; i++) {
      suma += datos[i];
    }
    return (suma / datos.length).toFixed(2);
  }
  function calcularVarianza(datos) {
    let media = calcularMedia(datos);
    let suma = 0;
    for (let i = 0; i < datos.length; i++) {
      suma += Math.pow(datos[i] - media, 2);
    }
    return (suma / datos.length).toFixed(2);
  }
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
  
      const key = `${rangoInicio.toFixed(2)}-${rangoFin.toFixed(2)}`;
  
      if (frecuencia[key]) {
        frecuencia[key]++;
      } else {
        frecuencia[key] = 1;
      }
    });
  
    return frecuencia;
  }

  function crearGrafico() {
    const ctx = document.getElementById('myChart');
    let min = Math.min(...datos);
    let max = Math.max(...datos);
    let rango = max - min; 
    let intervalos = Math.ceil(Math.sqrt(datos.length));
    let amplitud = rango / intervalos;
    let frecuencias = calcularFrecuenciaEnRango(datos, min, amplitud);  

    console.log(min, max, rango, intervalos);

    if (mychart) {
      mychart.destroy();
    }
    mychart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(frecuencias),
        datasets: [{
          label: '# of Votes',
          data: Object.values(frecuencias),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  crearGrafico();



  return (
    <div className="App">
      <div className='contenedor'>
        <div className="contenedor-p">
          {
            datos.map((dato, index) => (
              <div className="numero" key={index}>
                {dato}
              </div>
            ))
          }
        </div>

        <div className="contenedor-p">
          <div>
            <h2>Media</h2>
            <p>{calcularMedia(datos)}</p>
          </div>
          <div>
            <h2>Varianza</h2>
            <p>{calcularVarianza(datos)}</p>
          </div>
        </div>
        <div className='contenedor-p'>
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;

