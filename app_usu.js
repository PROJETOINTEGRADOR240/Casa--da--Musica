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

  // SQL para atualizar a tabela usuarios
  const alterUsuariosTable = `
    ALTER TABLE usuarios
    MODIFY COLUMN idusuario INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD COLUMN nome VARCHAR(45) NOT NULL,
    ADD COLUMN email VARCHAR(45) NOT NULL,
    ADD COLUMN senha VARCHAR(45) NOT NULL
  `;

  // Executa o comando SQL
  connection.query(alterUsuariosTable, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar tabela usuarios: ' + err.message);
    } else {
      console.log('Tabela usuarios atualizada com sucesso.');
    }

    // Encerra a conexão com o banco de dados
    connection.end();
  });
});
