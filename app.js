const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'casa_da_musica'
});

// Conecta ao banco de dados
db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para inserir um aluno
app.post('/alunos', (req, res) => {
    const { nome, idade } = req.body;
    const sql = 'INSERT INTO alunos (nome, idade) VALUES (?, ?)';
    db.query(sql, [nome, idade], (err, result) => {
        if (err) throw err;
        res.send('Aluno cadastrado com sucesso!');
    });
});

// Rota para inserir um professor
app.post('/professores', (req, res) => {
    const { nome, especialidade } = req.body;
    const sql = 'INSERT INTO professores (nome, especialidade) VALUES (?, ?)';
    db.query(sql, [nome, especialidade], (err, result) => {
        if (err) throw err;
        res.send('Professor cadastrado com sucesso!');
    });
});

// Rota para inserir uma disciplina
app.post('/disciplinas', (req, res) => {
    const { nome, carga_horaria } = req.body;
    const sql = 'INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)';
    db.query(sql, [nome, carga_horaria], (err, result) => {
        if (err) throw err;
        res.send('Disciplina cadastrada com sucesso!');
    });
});

// Rota para inserir uma falta
app.post('/faltas', (req, res) => {
    const { aluno_id, professor_id, disciplina_id, data_falta } = req.body;
    const sql = 'INSERT INTO faltas (aluno_id, professor_id, disciplina_id, data_falta) VALUES (?, ?, ?, ?)';
    db.query(sql, [aluno_id, professor_id, disciplina_id, data_falta], (err, result) => {
        if (err) throw err;
        res.send('Falta registrada com sucesso!');
    });
});

// Rota para inserir uma nota
app.post('/notas', (req, res) => {
    const { aluno_id, professor_id, disciplina_id, nota } = req.body;
    const sql = 'INSERT INTO notas (aluno_id, professor_id, disciplina_id, nota) VALUES (?, ?, ?, ?)';
    db.query(sql, [aluno_id, professor_id, disciplina_id, nota], (err, result) => {
        if (err) throw err;
        res.send('Nota cadastrada com sucesso!');
    });
});

// Servidor escutando na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3306');
});
