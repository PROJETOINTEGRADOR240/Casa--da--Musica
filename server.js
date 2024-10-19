const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Importar os roteadores
const alunosRouter = require('./routes/alunos');
const professoresRouter = require('./routes/professores');
const notasRouter = require('./routes/notas');
const disciplinasRouter = require('./routes/disciplinas');
const faltasRouter = require('./routes/faltas');
const usuariosRouter = require('./routes/usuarios');

// Configurar body-parser para ler dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // Para tratar requisições com JSON também

// Configurar conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'casa_da_musica',
    port: 3306
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Configurar as rotas
app.use('/alunos', alunosRouter);
app.use('/professores', professoresRouter);
app.use('/notas', notasRouter);
app.use('/disciplinas', disciplinasRouter);
app.use('/faltas', faltasRouter);
app.use('/usuarios', usuariosRouter);

// Configurar o servidor para rodar na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
