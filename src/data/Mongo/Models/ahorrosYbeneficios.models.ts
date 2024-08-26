import { Model, DataTypes } from "sequelize";
import { db } from "../postgres-database";

class AhorrosYbeneficios extends Model {}

AhorrosYbeneficios.init(
  {
    noticias_institucionales: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ahorros_y_promociones: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    capacitacion_y_becas: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize: db, // Instancia de Sequelize
    modelName: "ahorros_y_beneficios", // Nombre del modelo
  }
);

export { AhorrosYbeneficios };
