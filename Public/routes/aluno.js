const express = require('express');
const router = express.Router();
const db = require('../db'); // Certifique-se de criar um arquivo db.js ou configurar a conexão

// CRUD para tabela ALUNO

// CREATE
router.post('/', (req, res) => {
    const { nome, email, idade } = req.body;
    const sql = 'INSERT INTO aluno (nome, email, idade) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, idade], (err, result) => {
        if (err) {
            console.error('Erro ao inserir aluno:', err);
            res.status(500).send('Erro ao cadastrar aluno.');
        } else {
            res.send('Aluno cadastrado com sucesso!');
        }
    });
});

// READ
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM aluno';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar alunos:', err);
            res.status(500).send('Erro ao listar alunos.');
        } else {
            res.json(results);
        }
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    const { nome, email, idade } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE aluno SET nome = ?, email = ?, idade = ? WHERE id = ?';
    db.query(sql, [nome, email, idade, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar aluno:', err);
            res.status(500).send('Erro ao atualizar aluno.');
        } else {
            res.send('Aluno atualizado com sucesso!');
        }
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM aluno WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir aluno:', err);
            res.status(500).send('Erro ao excluir aluno.');
        } else {
            res.send('Aluno excluído com sucesso!');
        }
    });
});

module.exports = router;

  