from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/calcular-bernoulli', methods=['POST'])
def calcular_bernoulli():
    # Obtener los datos del cuerpo de la solicitud JSON
    datos = request.get_json()

    # Verificar si todos los campos necesarios están presentes
    if 'presion_estatica' not in datos or 'velocidad_fluido' not in datos or 'altura_fluido' not in datos:
        return jsonify({'error': 'Faltan datos'}), 400

    # Extraer los valores necesarios
    P = datos['presion_estatica']
    v = datos['velocidad_fluido']
    h = datos['altura_fluido']

    # Calcular la constante de Bernoulli
    g = 9.81  # Aceleración debido a la gravedad en m/s^2
    constante_bernoulli = P + 0.5 * v**2 + g * h

    # Preparar la respuesta en formato JSON
    respuesta = {
        'constante_bernoulli': constante_bernoulli
    }

    # Devolver la respuesta
    return jsonify(respuesta)

if __name__ == '__main__':
    app.run(debug=True)
