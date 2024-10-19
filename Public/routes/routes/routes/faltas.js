const express = require('express');
const router = express.Router();
const db = require('../db'); // Certifique-se de criar um arquivo db.js ou configurar a conexão

// CRUD para tabela FALTA

// CREATE
router.post('/', (req, res) => {
    const { aluno_id, disciplina_id, data } = req.body;
    const sql = 'INSERT INTO falta (aluno_id, disciplina_id, data) VALUES (?, ?, ?)';
    db.query(sql, [aluno_id, disciplina_id, data], (err, result) => {
        if (err) {
            console.error('Erro ao inserir falta:', err);
            res.status(500).send('Erro ao cadastrar falta.');
        } else {
            res.send('Falta cadastrada com sucesso!');
        }
    });
});

// READ
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM falta';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar faltas:', err);
            res.status(500).send('Erro ao listar faltas.');
        } else {
            res.json(results);
        }
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    const { aluno_id, disciplina_id, data } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE falta SET aluno_id = ?, disciplina_id = ?, data = ? WHERE id = ?';
    db.query(sql, [aluno_id, disciplina_id, data, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar falta:', err);
            res.status(500).send('Erro ao atualizar falta.');
        } else {
            res.send('Falta atualizada com sucesso!');
        }
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM falta WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir falta:', err);
            res.status(500).send('Erro ao excluir falta.');
        } else {
            res.send('Falta excluída com sucesso!');
        }
    });
});

module.exports = router;
