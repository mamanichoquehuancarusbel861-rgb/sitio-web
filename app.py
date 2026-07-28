from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "¡Bienvenido a mi página web minera!"

if __name__ == '__main__':
    app.run(debug=True)