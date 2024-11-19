import { DataTypes } from "sequelize";
import conn from "../config/conn.js";
import Publicacao from "./Publicacao.js";
import Usuario from "./Usuario.js";

const Comentario = conn.define("Comentarios", {
  comentario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "usuario_id"
    }
  },
  publicacao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "publicacoes",
      key: "publicacao_id"
    }
  },
});

Usuario.belongsToMany(Publicacao, {
  through: Comentario,
  foreignKey: "usuario_id",
  otherKey: "publicacao_id",
});
Publicacao.belongsToMany(Usuario, {
  through: Comentario,
  foreignKey: "publicacao_id",
  otherKey: "usuario_id",
});

export default Comentario;
