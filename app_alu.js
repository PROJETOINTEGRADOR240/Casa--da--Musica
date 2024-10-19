const mysql = require('mysql2');

// Configura a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Usuário MySQL
  password: 'admin', // Senha MySQL
  database: 'casadamusica' // Nome do banco de dados
});

// Conecta ao banco de dados
connection.connect((err) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados: ' + err.message);
  }

  console.log('Conectado ao MySQL com sucesso.');

  // SQL para atualizar a tabela alunos
  const alterAlunosTable = `
    ALTER TABLE alunos
    MODIFY COLUMN idaluno INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD COLUMN cpf_cnpj VARCHAR(14) NULL,
    ADD COLUMN nome VARCHAR(45) NULL,
    ADD COLUMN telefone VARCHAR(20) NULL,
    ADD COLUMN email VARCHAR(33) NULL,
    ADD COLUMN data_nasc DATE NULL,
    ADD COLUMN idade INT NULL,
    ADD COLUMN sexo VARCHAR(10) NULL,
    ADD COLUMN cor VARCHAR(10) NULL,
    ADD COLUMN docu_resp VARCHAR(11) NULL,
    ADD COLUMN nome_resp VARCHAR(45) NULL,
    ADD COLUMN cep VARCHAR(9) NULL,
    ADD COLUMN endereco VARCHAR(45) NULL,
    ADD COLUMN numero VARCHAR(15) NULL,
    ADD COLUMN bairro VARCHAR(30) NULL,
    ADD COLUMN cidade VARCHAR(30) NULL,
    ADD COLUMN estado VARCHAR(25) NULL,
    ADD COLUMN complemento VARCHAR(45) NULL,
    ADD COLUMN obs VARCHAR(145) NULL
  `;

  // Executa o comando SQL
  connection.query(alterAlunosTable, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar tabela alunos: ' + err.message);
    } else {
      console.log('Tabela alunos atualizada com sucesso.');
    }

    // Encerra a conexão com o banco de dados
    connection.end();
  });
});
