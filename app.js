const express = require('express');
//const bodyParser = require('body-parser');
const db = require('./config/database');
const app = express();



// Teste de conexão com o banco de dados
  db.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
  .catch(err => console.log('Erro ao conectar com o banco de dados', err));

// Middleware para converter o corpo das requisições em JSON
//app.use(bodyParser.json()); outra forma de fazer tem que importar o bodyParser
app.use(express.json());

// Rota de cadastro
app.use('/places/cadastro', require('./routes/cadastro'));
// Rota de pesquisa 
app.use('/places/pesquisa', require('./routes/cadastro'));
// Rota de deleção 
app.use('/places/deleta', require('./routes/cadastro'));
// Rota de atualização
app.use('/places/atualiza', require('./routes/cadastro'));

//user
// Rota de cadastroUser
app.use('/places/user', require('./routes/user'));
// Loga User
app.use('/places/sessions', require('./controllers/sessions'));

//db.sync({alter: true})
// Iniciar o servidor
app.listen(3535, () => console.log('Servidor iniciado na porta 3535'));
/*
//outra forma de subir o server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
*/