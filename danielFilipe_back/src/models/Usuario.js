import { DataTypes } from 'sequelize';
import conn from '../config/conn.js'; 

const Usuario = conn.define('usuarios', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nick_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
    timestamps: false
});

export default Usuario;