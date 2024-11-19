import createToken from "../helpers/create-token.js"
import Publicacao from "../models/Publicacao.js"
import Usuario from "../models/Usuario.js"

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body

    const checkUserEmail = await Usuario.findOne({ where: { email: email } })
    
    if (!checkUserEmail) {
        return res.status(500).json({ errorEmail: "nao foi possivel achar" })
    }

    const checkUser = await Usuario.findOne({ where: { email: email, senha: senha } })
    
    if (!checkUser) {
        return res.status(500).json({ errorSenha: "senha nao coincide" })
    }

    const token = createToken(checkUser, req, res)

    return res.json({ token: token })
}

export const usuariosControllers = {
    login: loginUsuario
}

const getAllPublicacoes = async (req, res) => {
    const publicacoes = await Publicacao.findAll()

    return res.json({ message: publicacoes })
}

export const publicacaoesControllers = {
    getAll: getAllPublicacoes
}