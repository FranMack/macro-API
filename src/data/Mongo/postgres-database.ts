import {Sequelize} from "sequelize"

export const db = new Sequelize("macro", "", "", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});


