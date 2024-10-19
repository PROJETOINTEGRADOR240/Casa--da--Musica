const express = require('express');
const router = express.Router();
const db = require('../db'); // Certifique-se de criar um arquivo db.js ou configurar a conexão

// CRUD para tabela PROFESSOR

// CREATE
router.post('/', (req, res) => {
    const { nome, email, especialidade } = req.body;
    const sql = 'INSERT INTO professor (nome, email, especialidade) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, especialidade], (err, result) => {
        if (err) {
            console.error('Erro ao inserir professor:', err);
            res.status(500).send('Erro ao cadastrar professor.');
        } else {
            res.send('Professor cadastrado com sucesso!');
        }
    });
});

// READ
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM professor';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar professores:', err);
            res.status(500).send('Erro ao listar professores.');
        } else {
            res.json(results);
        }
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    const { nome, email, especialidade } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE professor SET nome = ?, email = ?, especialidade = ? WHERE id = ?';
    db.query(sql, [nome, email, especialidade, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar professor:', err);
            res.status(500).send('Erro ao atualizar professor.');
        } else {
            res.send('Professor atualizado com sucesso!');
        }
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM professor WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir professor:', err);
            res.status(500).send('Erro ao excluir professor.');
        } else {
            res.send('Professor excluído com sucesso!');
        }
    });
});

module.exports = router;
