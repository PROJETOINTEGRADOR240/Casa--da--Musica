const express = require('express');
const router = express.Router();
const db = require('../db'); // Certifique-se de criar um arquivo db.js ou configurar a conexão

// CRUD para tabela DISCIPLINA

// CREATE
router.post('/', (req, res) => {
    const { nome, professor_id } = req.body;
    const sql = 'INSERT INTO disciplina (nome, professor_id) VALUES (?, ?)';
    db.query(sql, [nome, professor_id], (err, result) => {
        if (err) {
            console.error('Erro ao inserir disciplina:', err);
            res.status(500).send('Erro ao cadastrar disciplina.');
        } else {
            res.send('Disciplina cadastrada com sucesso!');
        }
    });
});

// READ
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM disciplina';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar disciplinas:', err);
            res.status(500).send('Erro ao listar disciplinas.');
        } else {
            res.json(results);
        }
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    const { nome, professor_id } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE disciplina SET nome = ?, professor_id = ? WHERE id = ?';
    db.query(sql, [nome, professor_id, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar disciplina:', err);
            res.status(500).send('Erro ao atualizar disciplina.');
        } else {
            res.send('Disciplina atualizada com sucesso!');
        }
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM disciplina WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir disciplina:', err);
            res.status(500).send('Erro ao excluir disciplina.');
        } else {
            res.send('Disciplina excluída com sucesso!');
        }
    });
});

module.exports = router;

