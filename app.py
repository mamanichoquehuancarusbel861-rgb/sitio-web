from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
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

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Aquí puedes recibir los datos si deseas validarlos
        email = request.form.get('email')
        password = request.form.get('password')
        
        # Redirige exitosamente al panel de administración cuando hacen clic en ingresar
        return redirect(url_for('admin'))
        
    return render_template('login.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

if __name__ == '__main__':
    app.run(debug=True)