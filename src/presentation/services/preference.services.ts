import { Model, ModelStatic,  Op } from "sequelize";

import {
  Users,
  AhorrosYbeneficios,
  OfertasYseguros,
  TuCuenta,
  Tarjetas,
  PagoServicios,
  Inversiones,
  Cheques,
} from "../../data/Mongo/Models";
import { CustomError } from "../../domain/errors/custom.errors";
import { EmailService } from "./email.services";

interface CategoryModels {
  ahorrosYbeneficios: ModelStatic<Model>;
  ofertasYseguros: ModelStatic<Model>;
  tuCuenta: ModelStatic<Model>;
  tarjetas: ModelStatic<Model>;
  pagoServicios: ModelStatic<Model>;
  inversiones: ModelStatic<Model>;
  cheques: ModelStatic<Model>;
}

export class PreferenceServices {
  static async preferenceList(username: string) {
    try {
      const userExist = await Users.findOne({ where: { username: username } });
      if (!userExist) {
        throw CustomError.badRequest("Wrong credentials");
      }

      const ahorrosYbeneficios = await AhorrosYbeneficios.findOne({
        where: { userId: userExist.dataValues.id },
      });
      const ofertasYseguros = await OfertasYseguros.findOne({
        where: { userId: userExist.dataValues.id },
      });
      const tuCuenta = await TuCuenta.findOne({
        where: { userId: userExist.dataValues.id },
      });
      const tarjetas = await Tarjetas.findOne({
        where: { userId: userExist.dataValues.id },
      });
      const pagoServicios = await PagoServicios.findOne({
        where: { userId: userExist.dataValues.id },
      });

      const inversiones = await Inversiones.findOne({
        where: { userId: userExist.dataValues.id },
      });
      const cheques = await Cheques.findOne({
        where: { userId: userExist.dataValues.id },
      });

      const {
        id: ahorrosId,
        userId: ahorrosUserId,
        createdAt: ahorrosCreatedAt,
        updatedAt: ahorrosUpdatedAt,
        ...ahorrosYbeneficiosInfo
      } = ahorrosYbeneficios?.dataValues || {};

      const {
        id: segurosId,
        userId: segurosUserId,
        createdAt: segurosCreatedAt,
        updatedAt: segurosUpdatedAt,
        ...ofertasYsegurosInfo
      } = ofertasYseguros?.dataValues || {};

      const {
        id: tuCuentaId,
        userId: tuCuentaUserId,
        createdAt: tuCuentaCreatedAt,
        updatedAt: tuCuentaUpdatedAt,
        ...tuCuentasInfo
      } = tuCuenta?.dataValues || {};

      const {
        id: tarjetasId,
        userId: tarjetasUserId,
        createdAt: tarjetasCreatedAt,
        updatedAt: tarjetasUpdatedAt,
        ...tarjetasInfo
      } = tarjetas?.dataValues || {};

      const {
        id: pagoServiciosId,
        userId: pagoServiciosUserId,
        createdAt: pagoServiciosCreatedAt,
        updatedAt: pagoServiciosUpdatedAt,
        ...pagoServiciosInfo
      } = pagoServicios?.dataValues || {};
      const {
        id: inversionesId,
        userId: inversionesUserId,
        createdAt: inversionesCreatedAt,
        updatedAt: inversionesUpdatedAt,
        ...inversionesInfo
      } = inversiones?.dataValues || {};

      const {
        id: chequessId,
        userId: chequesUserId,
        createdAt: chequesCreatedAt,
        updatedAt: chequesUpdatedAt,
        ...chequesInfo
      } = cheques?.dataValues || {};

      return {
        ahorrosYbeneficios: { ...ahorrosYbeneficiosInfo },
        ofertasYseguros: { ...ofertasYsegurosInfo },
        tuCuenta: { ...tuCuentasInfo },
        tarjetas: { ...tarjetasInfo },
        pagoServicios: { ...pagoServiciosInfo },
        inversiones: { ...inversionesInfo },
        cheques: { ...chequesInfo },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updatePreference(
    username: string,
    category: keyof CategoryModels,
    preferences: any
  ) {
    try {
      const userExist = await Users.findOne({ where: { username: username } });
      if (!userExist) {
        throw CustomError.badRequest("Wrong credentials");
      }




      const models:CategoryModels  = {
        ahorrosYbeneficios: AhorrosYbeneficios,
        ofertasYseguros: OfertasYseguros,
        tuCuenta: TuCuenta,
        tarjetas: Tarjetas,
        pagoServicios: PagoServicios,
        inversiones: Inversiones,
        cheques: Cheques,
      };
  
      const model = models[category];
  
      if (!model) {
        throw new Error("Categoría no válida");
      }



     
        const [afectedRows, updated] = await model.update(
          preferences, // Datos a actualizar
          { where: { userId: userExist.dataValues.id }, returning: true } // Condición de búsqueda
        );

        const { id, userId, createdAt, updatedAt, ...updatedValues } =
          updated[0].dataValues;

        return { ...updatedValues };
      

      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }




  static async sendNotification(
    category: keyof CategoryModels,
    subcategory: string,
    title: string,
    paragraph: string
  ) {
    try {
    

      const models:CategoryModels  = {
        ahorrosYbeneficios: AhorrosYbeneficios,
        ofertasYseguros: OfertasYseguros,
        tuCuenta: TuCuenta,
        tarjetas: Tarjetas,
        pagoServicios: PagoServicios,
        inversiones: Inversiones,
        cheques: Cheques,
      };
  
      const model = models[category];
  
      if (!model) {
        throw new Error("Categoría no válida");
      }
  
      const preferences = await model.findAll({
        where: { [subcategory]: true },
      });
  
      const userIds = preferences.map((item:any) => item.dataValues.id);
  
      const users = await Users.findAll({
        where: {
          id: {
            [Op.in]: userIds,
          },
        },
      });
  
      const userEmails = users.map((item) => item.dataValues.email);
  
      const htmlBody = `
        <h1>${title}</h1>
        <p>${paragraph}</p>
      `;
  
      const emailPromises = userEmails.map((email) => 
        EmailService.sendEmail({
          to: email,
          subject: `Banco Macro: ${title}`,
          htmlBody,
        })
      );
  
      await Promise.all(emailPromises);
  
      return userEmails;
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
