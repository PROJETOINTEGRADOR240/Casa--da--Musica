const express = require('express');
const router = express.Router();
const db = require('../db'); // Certifique-se de criar um arquivo db.js ou configurar a conexão

// CRUD para tabela NOTA

// CREATE
router.post('/', (req, res) => {
    const { aluno_id, disciplina_id, nota } = req.body;
    const sql = 'INSERT INTO nota (aluno_id, disciplina_id, nota) VALUES (?, ?, ?)';
    db.query(sql, [aluno_id, disciplina_id, nota], (err, result) => {
        if (err) {
            console.error('Erro ao inserir nota:', err);
            res.status(500).send('Erro ao cadastrar nota.');
        } else {
            res.send('Nota cadastrada com sucesso!');
        }
    });
});

// READ
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM nota';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar notas:', err);
            res.status(500).send('Erro ao listar notas.');
        } else {
            res.json(results);
        }
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    const { aluno_id, disciplina_id, nota } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE nota SET aluno_id = ?, disciplina_id = ?, nota = ? WHERE id = ?';
    db.query(sql, [aluno_id, disciplina_id, nota, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar nota:', err);
            res.status(500).send('Erro ao atualizar nota.');
        } else {
            res.send('Nota atualizada com sucesso!');
        }
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM nota WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir nota:', err);
            res.status(500).send('Erro ao excluir nota.');
        } else {
            res.send('Nota excluída com sucesso!');
        }
    });
});

module.exports = router;
