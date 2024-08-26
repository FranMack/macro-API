import { Model, DataTypes } from "sequelize";
import { AhorrosYbeneficios } from "./ahorrosYbeneficios.models";
import { OfertasYseguros } from "./ofertasYseguros.models";
import { TuCuenta } from "./tuCuenta.models";
import { Tarjetas } from "./tarjetas.models";
import { PagoServicios } from "./pagoServicios.models";
import { Inversiones } from "./inversiones.models";
import { Cheques } from "./cheques.models";
import { db } from "../postgres-database";



class Users extends Model {
  public id!: number; // Aquí declaras explícitamente el campo id
  public name!: string;
  public lastname!: string;
  public email!: string;
  public username!: string;
  public emailValidated!: boolean;
  public password!: string;
  public role!: string[];
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Lastname is required" },
        notEmpty: { msg: "Lastname cannot be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Email is required" },
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Username is required" },
        notEmpty: { msg: "Username cannot be empty" },
      },
    },
    emailValidated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password cannot be empty" },
      },
    },
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["USER_ROLE"],
      validate: {
        isIn: {
          args: [["ADMIN_ROLE", "USER_ROLE"]],
          msg: "Role must be either 'ADMIN_ROLE' or 'USER_ROLE'",
        },
      },
    },
  },
  {
    sequelize: db, // Instancia de Sequelize
    modelName: "user", // Nombre del modelo
  }
);

Users.afterCreate(async (user, options) => {
  await Promise.all([
    AhorrosYbeneficios.create({ userId: user.id }),
    OfertasYseguros.create({ userId: user.id }),
    TuCuenta.create({ userId: user.id }),
    Tarjetas.create({ userId: user.id }),
    PagoServicios.create({ userId: user.id }),
    Inversiones.create({ userId: user.id }),
    Cheques.create({ userId: user.id }),
  ]);
  
});

export { Users };
