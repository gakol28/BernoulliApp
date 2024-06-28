// Variable global para almacenar la instancia del gráfico
let myChart;

function calculate() {
    // Obtener los valores de entrada
    let v1 = parseFloat(document.getElementById('velocity1').value);
    let P1 = parseFloat(document.getElementById('pressure1').value);
    let z1 = parseFloat(document.getElementById('height1').value);
    let v2 = parseFloat(document.getElementById('velocity2').value);
    let z2 = parseFloat(document.getElementById('height2').value);

    // Densidad del fluido (en este caso supondremos agua)
    let rho = 1000; // kg/m^3

    // Aceleración debido a la gravedad
    let g = 9.81; // m/s^2

    // Calcular la diferencia de presión usando la ecuación de Bernoulli
    let P2 = P1 + 0.5 * rho * (Math.pow(v1, 2) - Math.pow(v2, 2)) + rho * g * (z1 - z2);

    // Mostrar el resultado
    document.getElementById('result').innerHTML = `La diferencia de presión entre los puntos A y B es: ${P2.toFixed(2)} Pa`;

    // Actualizar la gráfica o crear una nueva si aún no existe
    if (myChart) {
        updateChart(P2);
    } else {
        createLogChart(P2);
    }
}

function createLogChart(pressureDifference) {
    let ctx = document.getElementById('myChart').getContext('2d');

    // Datos para la gráfica
    let data = {
        datasets: [{
            label: 'Diferencia de Presión (Pa)',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            data: [{
                x: 0,
                y: pressureDifference,
            }],
            pointRadius: 10,
            pointHoverRadius: 15,
            pointBackgroundColor: 'rgba(0, 123, 255, 1)',
            pointBorderColor: 'rgba(255, 255, 255, 1)',
            pointBorderWidth: 2,
        }]
    };

    // Opciones para la gráfica
    let options = {
        scales: {
            y: {
                type: 'logarithmic', // Escala logarítmica en el eje y
                ticks: {
                    callback: function(value, index, values) {
                        return Number(value.toString()); // Convierte el valor a número y evita notación científica
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Diferencia de Presión (Pa)'
                }
            },
            x: {
                display: false // Oculta el eje x
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Diferencia de Presión: ${context.parsed.y.toFixed(2)} Pa`;
                    }
                }
            }
        }
    };

    // Crear la instancia de la gráfica
    myChart = new Chart(ctx, {
        type: 'scatter', // Usamos un gráfico de dispersión para visualizar mejor la relación logarítmica
        data: data,
        options: options
    });
}

function updateChart(pressureDifference) {
    // Actualizar los datos de la gráfica
    myChart.data.datasets[0].data = [{
        x: 0,
        y: pressureDifference,
    }];

    // Actualizar la etiqueta del tooltip
    myChart.options.plugins.tooltip.callbacks.label = function(context) {
        return `Diferencia de Presión: ${context.parsed.y.toFixed(2)} Pa`;
    };

    // Actualizar la gráfica
    myChart.update();
}
