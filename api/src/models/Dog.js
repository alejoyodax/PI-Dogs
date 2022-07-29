const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  // EMPIEZA DESDE EL ID=1 Y VA INCREMENTANDO
      primaryKey: true,
      // get() {
      //   const rawValue = this.getDataValue("id");
      //   return rawValue ? `A${rawValue}` : null
      // }
    },
    isFromBD: {
      type: DataTypes.VIRTUAL,
      get() {
        return `A${this.id}`
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    altura_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    altura_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    peso_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    peso_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    años_de_vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
    {
      timestamps: false
    }
  );
};