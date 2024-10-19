// CRUD para tabela USUÁRIO

// CREATE (Cadastrar Usuário)
app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).send('Erro ao cadastrar usuário.');
        } else {
            res.send('Usuário cadastrado com sucesso!');
        }
    });
});

// READ (Listar Usuários)
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuario';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar usuários:', err);
            res.status(500).send('Erro ao listar usuários.');
        } else {
            res.json(results);
        }
    });
});

// UPDATE (Atualizar Usuário)
app.put('/usuarios/:id', (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?';
    db.query(sql, [nome, email, senha, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).send('Erro ao atualizar usuário.');
        } else {
            res.send('Usuário atualizado com sucesso!');
        }
    });
});

// DELETE (Excluir Usuário)
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuario WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir usuário:', err);
            res.status(500).send('Erro ao excluir usuário.');
        } else {
            res.send('Usuário excluído com sucesso!');
        }
    });
});
