const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const validateNewUser = require('../middlewares/validateNewUser');

//Rota para criar um cadastro
router.post('/', validateNewUser, (req, res) => {
  const { name, email, username, password } = req.body;
  User.create({ name, email, username, password})
  .then(user => {
    res.status(201).json({ message: 'User criado com sucesso', user });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar user', error: err });
  });
});

module.exports = router;
