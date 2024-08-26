from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

# Configuração de conexão com o RDS MySQL
db = pymysql.connect(
    host="pond3-database.cdugtaxwrdsa.us-east-1.rds.amazonaws.com",
    user="admin",
    password="pond-sem03",
    db="ponddatabase"
)

@app.route('/')
def index():
    return "Aplicação Web Integrada com RDS MySQL"


@app.route('/produtos', methods=['GET'])
def listar_produtos():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM produtos")
    produtos = cursor.fetchall()
    return jsonify(produtos)

@app.route('/produtos', methods=['POST'])
def criar_produto():
    data = request.json
    cursor = db.cursor()
    cursor.execute("INSERT INTO produtos (nome, preco, quantidade, data_cadastro) VALUES (%s, %s, %s, %s)",
                   (data['nome'], data['preco'], data['quantidade'], data['data_cadastro']))
    db.commit()
    return 'Produto criado com sucesso', 201




if __name__ == '__main__':
    app.run(host='0.0.0.0')
