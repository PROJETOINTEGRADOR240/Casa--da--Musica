const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Para interpretar JSON no corpo da requisição

// Exemplo de rota
app.get('/', (req, res) => {
    res.send('Olá, Casa da Música!');
});

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin', // Substitua pela sua senha
    database: 'casa_da_musica'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
app.get('/edit/:idaluno', (req, res) => {
    const { idaluno } = req.params;
    const sql = 'SELECT * FROM alunos WHERE idaluno = ?';
    db.query(sql, [idaluno], (err, result) => {
      if (err) throw err;
      res.render('edit_aluno', { aluno: result[0] }); // Renderiza o formulário de edição com os dados do aluno
    });
  });
  