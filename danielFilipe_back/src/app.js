import express from "express";
import cors from "cors";
import Usuario from "./models/Usuario.js";
import Publicacao from "./models/Publicacao.js";
import { publicacaoesControllers, usuariosControllers } from "./controllers/generalControllers.js";
import Like from "./models/Like.js";
import Comentario from "./models/Comentario.js";

const app = express();

Usuario.sync()
Publicacao.sync()
Comentario.sync({ force: true })
Like.sync({ force: true })

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/publicacoes/all", publicacaoesControllers.getAll)
app.post("/usuarios/login", usuariosControllers.login)

app.use((request, response) => {
  response.status(404).json({ message: "Recurso não encontrado" });
});

export default app;
