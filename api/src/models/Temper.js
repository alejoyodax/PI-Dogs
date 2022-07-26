const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temper', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  // EMPIEZA DESDE EL ID=1 Y VA INCREMENTANDO
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  },
    {
      timestamps: false
    }
  );
};