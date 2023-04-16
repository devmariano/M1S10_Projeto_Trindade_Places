const express = require('express');
const router = express.Router();
const Cadastro = require('../models/cadastro');

const validateToken = require('../middlewares/validateToken');

//Rota para criar um cadastro
router.post('/', validateToken, (req, res) => {
  const { name, telephone, opening_hours, description, latitude, longitude } = req.body;
  Cadastro.create({ name, telephone, opening_hours, description, latitude, longitude})
  .then(cadastro => {
    res.status(201).json({ message: 'Cadastro criado com sucesso', cadastro });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar cadastro', error: err });
  });
});

// Rota para pesquisar um cadastro pelo ID
router.get('/:id',  (req, res) => {
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
router.delete('/:id', validateToken, (req, res) => {
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
router.put('/:id', validateToken, (req, res) => {
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

module.exports = router;
