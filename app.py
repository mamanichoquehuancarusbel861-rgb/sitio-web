from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/operaciones')
def operaciones():
    return render_template('operaciones.html')

@app.route('/proyectos')
def proyectos():
    return render_template('proyectos.html')

@app.route('/empleos')
def empleos():
    return render_template('empleos.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)