import { Model, DataTypes } from "sequelize";
import { db } from "../postgres-database";

class OfertasYseguros extends Model {}

OfertasYseguros.init(
  {
  
    seguros: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    prestamos: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    
  },

  {
    sequelize: db, // Instancia de Sequelize
    modelName: "ofertas_y_seguros", // Nombre del modelo
  }
);

export { OfertasYseguros };
