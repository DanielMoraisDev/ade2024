import { DataTypes } from 'sequelize';
import conn from '../config/conn.js'; 

const Publicacao = conn.define('publicacoes', {
  publicacao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Publicacao;