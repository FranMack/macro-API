import { Model, DataTypes } from "sequelize";
import { db } from "../postgres-database";

class Cheques extends Model {}

Cheques.init(
  {
    cheques_por_acreditarse: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cheques_debitados: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      cheques_rechazados: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
      ,
      chequera: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
   
  },

  {
    sequelize: db, // Instancia de Sequelize
    modelName: "cheques", // Nombre del modelo
  }
);

export {Cheques };
