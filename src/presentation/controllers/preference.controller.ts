import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.errors";
import { PreferenceServices } from "../services/preference.services";
import { EmailService } from "../services/email.services";
import { UserDataMailTemplate } from "../utils/mailTemplate";

export class PreferenceControllers {
  static async preferenceList(req: Request, res: Response) {
    const { username } = req.params;

    try {
      const preferences = await PreferenceServices.preferenceList(username);

      res.status(200).json(preferences);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updatePreference(req: Request, res: Response) {
    const { username, category, preferences } = req.body;

    try {
      const updatedPreferences = await PreferenceServices.updatePreference(
        username,
        category,
        preferences
      );

      res.status(200).json(updatedPreferences);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async sendNotification(req: Request, res: Response) {
    const { category, subcategory, title, paragraph } = req.body;
    try {
      const notification = await PreferenceServices.sendNotification(
        category,
        subcategory,
        title,
        paragraph
      );
      res.status(200).json(notification);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async sendUserDataByEmail(req: Request, res: Response){
    const { email } = req.body;

    try{

      const htmlBody=UserDataMailTemplate()

      const sendEmail= await EmailService.sendEmail({
        to: email,
        subject: "Servicio al cliente",
        htmlBody,
      });

      res.status(200).json("Email send")

    }

    catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }

  }
}
