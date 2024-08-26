import { Model, DataTypes } from "sequelize";
import { db } from "../postgres-database";

class PagoServicios extends Model {}

PagoServicios.init(
  {
    estado_servicios_adheridos: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    servicios_proximos_vencer: {
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
    modelName: "pago_servicios", // Nombre del modelo
  }
);

export { PagoServicios };
