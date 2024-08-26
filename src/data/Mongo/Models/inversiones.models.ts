import { Model, DataTypes } from "sequelize";
import { db } from "../postgres-database";

class Inversiones extends Model {}

Inversiones.init(
  {
    alternativas_inversion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    aviso_vencimiento_plazofijo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      operacion_titulos_y_valores: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
   
  },

  {
    sequelize: db, // Instancia de Sequelize
    modelName: "inversiones", // Nombre del modelo
  }
);

export { Inversiones };
