const express = require('express');
const mysql = require('mysql2'); // Adicione a importação do mysql2
const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Criar a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin', // Corrija a senha aqui, se necessário
  database: 'casa_da_musica'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

// Rota básica
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

