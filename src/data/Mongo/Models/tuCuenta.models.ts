import { Model, DataTypes } from "sequelize";
import { db } from "../postgres-database";

class TuCuenta extends Model {}

TuCuenta.init(
  {
    alerta_saldo_min: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    aviso_semanal_saldo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    saldo_en_descubierto: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    beneficios: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize: db, // Instancia de Sequelize
    modelName: "tu_cuenta", // Nombre del modelo
  }
);

export { TuCuenta };
