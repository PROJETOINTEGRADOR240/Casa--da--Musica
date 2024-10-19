const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Configuração do dotenv
dotenv.config();

const app = express();
app.use(express.json());

// Configura a conexão com o banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conecta ao banco de dados
connection.connect((err) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados: ' + err.message);
  }
  console.log('Conectado ao MySQL com sucesso.');
});

// Criação da tabela disciplinas se não existir
const createDisciplinasTable = `
  CREATE TABLE IF NOT EXISTS disciplinas (
    iddisciplina INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    carga_horaria INT NOT NULL,
    PRIMARY KEY (iddisciplina)
  )
`;

connection.query(createDisciplinasTable, (err) => {
  if (err) {
    console.error('Erro ao criar tabela disciplinas: ' + err.message);
  } else {
    console.log('Tabela disciplinas criada com sucesso.');
  }
});

// Endpoint para adicionar uma nova disciplina
app.post('/disciplinas', (req, res) => {
  const { nome, carga_horaria } = req.body;

  const insertDisciplina = `
    INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)
  `;
  connection.query(insertDisciplina, [nome, carga_horaria], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao adicionar disciplina: ' + err.message });
    }
    res.status(201).json({ id: results.insertId, nome, carga_horaria });
  });
});

// Endpoint para listar todas as disciplinas
app.get('/disciplinas', (req, res) => {
  const selectDisciplinas = 'SELECT * FROM disciplinas';
  connection.query(selectDisciplinas, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar disciplinas: ' + err.message });
    }
    res.json(results);
  });
});

// Endpoint para atualizar uma disciplina
app.put('/disciplinas/:id', (req, res) => {
  const { id } = req.params;
  const { nome, carga_horaria } = req.body;

  const updateDisciplina = `
    UPDATE disciplinas SET nome = ?, carga_horaria = ? WHERE iddisciplina = ?
  `;
  connection.query(updateDisciplina, [nome, carga_horaria, id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar disciplina: ' + err.message });
    }
    res.json({ message: 'Disciplina atualizada com sucesso.' });
  });
});

// Endpoint para excluir uma disciplina
app.delete('/disciplinas/:id', (req, res) => {
  const { id } = req.params;

  const deleteDisciplina = `
    DELETE FROM disciplinas WHERE iddisciplina = ?
  `;
  connection.query(deleteDisciplina, [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao excluir disciplina: ' + err.message });
    }
    res.json({ message: 'Disciplina excluída com sucesso.' });
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


