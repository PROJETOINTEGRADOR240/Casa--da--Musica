const mysql = require('mysql2');

// Configura a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário do MySQL
  password: 'auria', // Substitua pela sua senha do MySQL
  database: 'casadamusica' // Nome do banco de dados
});

// Conecta ao banco de dados
connection.connect((err) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados: ' + err.message);
  }

  console.log('Conectado ao MySQL com sucesso.');

  // SQL para criar a tabela faltas
  const createFaltasTable = `
    CREATE TABLE IF NOT EXISTS faltas (
      idfalta INT UNSIGNED NOT NULL AUTO_INCREMENT,
      idaluno INT UNSIGNED NOT NULL,
      iddisciplina INT UNSIGNED NOT NULL,
      idprofessor INT UNSIGNED NOT NULL,
      data_falta DATE NOT NULL,
      mes_falta VARCHAR(15) NULL,
      ano_falta INT NULL,
      falta INT NULL,
      obs VARCHAR(145) NULL,
      PRIMARY KEY (idfalta),
      INDEX fk_faltas_alunos1_idx (idaluno ASC),
      INDEX fk_faltas_professores1_idx (idprofessor ASC),
      INDEX fk_faltas_disciplinas1_idx (iddisciplina ASC),
      CONSTRAINT fk_faltas_alunos1
        FOREIGN KEY (idaluno)
        REFERENCES alunos (idaluno)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT fk_faltas_professores1
        FOREIGN KEY (idprofessor)
        REFERENCES professores (idprofessor)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT fk_faltas_disciplinas1
        FOREIGN KEY (iddisciplina)
        REFERENCES disciplinas (iddisciplina)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ) ENGINE = InnoDB;
  `;

  // Executa o comando SQL
  connection.query(createFaltasTable, (err, results, fields) => {
    if (err) {
      console.error('Erro ao criar tabela faltas: ' + err.message);
    } else {
      console.log('Tabela faltas criada ou já existe.');
    }

    // Encerra a conexão com o banco de dados
    connection.end();
  });
});
