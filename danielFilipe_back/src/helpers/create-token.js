import jwt from "jsonwebtoken";

const createToken = (usuario, req, res) => {
  // Dados do payload (informações que você quer incluir no token)
  const payload = {
    id: usuario.usuario_id, // ID do usuário
    email: usuario.email, // Nome do usuário
    senha: usuario.senha, // Papel ou função do usuário
  };

  // Chave secreta usada para assinar o token
  const secretKey = "mySecretKey";

  // Geração do token JWT
  const token = jwt.sign(payload, secretKey);

  return token
};

export default createToken