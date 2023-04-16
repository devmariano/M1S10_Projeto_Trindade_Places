const yup = require("yup");
//yup é um modulo de validação de dados
const validation = yup.object().shape({
    name: yup
    .string("O nome deve ser uma string")
    .required("Nome é obrigatorio"),
    password: yup
    .string()
    .min(4,"A senha deve ter no minino 4 caracteres")
    .required("Senha é obrigatorio"),
    username: yup
    .string("O username deve ser uma string")
    .required("username é obrigatorio"),
})

function validateNewUser(request, response, next) {
console.log("dado original", request.body)
//quando o validade sync encontra alguam inconsistencia ele lança uma excessão pr isso utilizar dentro do try 
//console.log(validation.validateSync(request.body))
try {
    validation.validateSync(request.body)
    next()
} catch (error) {
    //pega o texto do erro gerado no yup através do error.message
    //se der o response de erro a requisição é barrada no  middleware mesmo, não passa pra frente
response.status(404).json({message: error.message})
}
}

module.exports = validateNewUser;