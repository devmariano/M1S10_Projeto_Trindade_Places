const jwt = require('jsonwebtoken')
const User = require('../models/user')

function validateToken(request, response, next) {
    // validar se tem token no Header da requisição
    console.log(request.headers.authorization)
    //criar uma variavel par aarmazenar o token para validar com if
    const token = request.headers.authorization

    console.log(token)

    // verificar se token pelo menos está presente, ou coneudo somente igual bearer pois o insomnia envia o inicio bearer 
    if (!token || token === 'Bearer') {
        return response.status(403).json({ message: 'Token não presente' })
    }
    //corta o token para remover o bearer
    const tokenJwt = token.slice(7)
    //valida o token com o jwt 
    // isso (error, conteudoDescodificado) => {} é igual a isso function(error, conteudoDescodificado) {}
     jwt.verify(tokenJwt, 'segredo', (error, conteudoDescodificado) => {
        if (error) {
            //procura os diversos tipos de erros
            if (error.name === "TokenExpiredError") {
                return response.status(401).json({ message: 'Token Expirado' })
            } else if (error.name === "JsonWebTokenError") {
                return response.status(401).json({ message: 'Token inválido' })
            } else{
                return response.status(500).json({ error: 'Internal Server Error' });
            }

        } else {
            //caso não ache erro passa com o next
            console.log(conteudoDescodificado);
            request.body.userId = conteudoDescodificado.id
            return next();
        }
    })

}

module.exports = validateToken