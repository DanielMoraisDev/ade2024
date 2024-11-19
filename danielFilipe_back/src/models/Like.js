import { DataTypes } from "sequelize";
import conn from "../config/conn.js";
import Publicacao from "./Publicacao.js";
import Usuario from "./Usuario.js";

const Like = conn.define("likes", {
  like_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "usuario_id",
    },
  },
  publicacao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "publicacoes",
      key: "publicacao_id",
    },
  },
});

Usuario.belongsToMany(Publicacao, {
  through: Like,
  foreignKey: "usuario_id",
  otherKey: "publicacao_id",
});
Publicacao.belongsToMany(Usuario, {
  through: Like,
  foreignKey: "publicacao_id",
  otherKey: "usuario_id",
});

export default Like;
