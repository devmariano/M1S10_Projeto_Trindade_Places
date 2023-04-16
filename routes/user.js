const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Rota para criar um cadastro
router.post('/', (req, res) => {
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

router.post('/sessions', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id }, 'segredo', { expiresIn: '1d' });

    return res.json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

/*
// Rota para pesquisar um cadastro pelo ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Cadastro.findByPk(id)
      .then(cadastro => {
        if (!cadastro) {
          res.status(404).json({ message: 'Cadastro não encontrado' });
        } else {
          res.json({ cadastro });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar cadastro', error: err });
      });
  });

  // Rota para pesquisar todos cadastros
router.get('/', (req, res) => {
    //const id = req.params.id;
    Cadastro.findAll()
      .then(cadastro => {
        if (!cadastro) {
          res.status(404).json({ message: 'Cadastros não encontrados' });
        } else {
          res.json({ cadastro });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar todos cadastros', error: err });
      });
  });

// Rota para excluir um cadastro pelo ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Cadastro.findByPk(id)
      .then(cadastro => {
        if (!cadastro) {
          res.status(404).json({ message: 'Cadastro não encontrado' });
        } else {
          cadastro.destroy()
            .then(() => {
              res.json({ message: 'Cadastro excluído com sucesso' });
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Erro ao excluir cadastro', error: err });
            });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar cadastro', error: err });
      });
  });

// Rota para atualizar um cadastro pelo ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, telephone, opening_hours, description, latitude, longitude } = req.body;
    Cadastro.findByPk(id)
      .then(cadastro => {
        if (!cadastro) {
          res.status(404).json({ message: 'Cadastro não encontrado' });
        } else {
          cadastro.update({
            name,
            telephone,
            opening_hours,
            description, 
            latitude, 
            longitude
          })
            .then(() => {
              res.json({ message: 'Cadastro atualizado com sucesso', cadastro });
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Erro ao atualizar cadastro', error: err });
            });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar cadastro', error: err });
      });
  });
*/
module.exports = router;
