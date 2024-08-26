import { Model, DataTypes } from "sequelize";
import { db } from "../postgres-database";

class Tarjetas extends Model {}

Tarjetas.init(
  {
    resumen_semanal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    novedades: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    
  },

  {
    sequelize: db, // Instancia de Sequelize
    modelName: "tarjetas_credito_y_debito", // Nombre del modelo
  }
);

export { Tarjetas };
