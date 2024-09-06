import { Sequelize } from "sequelize";

import { envs } from "../../config";
// export const db = new Sequelize("macro", "", "", {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false,
// });

export const db = new Sequelize(envs.DATABASE_URL!, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Asegura que se utilice SSL para la conexión
      rejectUnauthorized: false, // Esto se debe incluir para evitar problemas con certificados en Heroku
    },
  },
  logging: false, // Opcional, desactiva el logging de Sequelize
});
