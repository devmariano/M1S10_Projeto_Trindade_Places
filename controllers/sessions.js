const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

  async function sessions(request, response) {
    
    try {
        const userInDatabase = await User.findOne({
            where: {
                username: request.body.username
            }
        })
        
        // verifica username
        if (!userInDatabase) {
            return response.status(404).json({ message: 'username ou senha incorretos' })
            console.log('nome ok')
        }
        
        const passwordIsValid = await bcrypt.compare(request.body.password, userInDatabase.password)
        
        // verifica se a senha está correta  
        if (!passwordIsValid) {
            return response.status(404).json({ message: 'Crendeciais incorreta[password]' })
            console.log('pass ok')
        }

        const token = jwt.sign(
            {
                id: userInDatabase.id,
                name: userInDatabase.name
            },
            'segredo',
            {
                expiresIn: '1h'
            }
        )
      
        response.json({ name: userInDatabase.name, token: token })

    } catch (error) {
      //console.log('passei aqui @@@@@@@@@@@@@@@@:'+error)
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }
}

module.exports = sessions;