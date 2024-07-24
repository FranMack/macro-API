import mongoose from "mongoose";
import { Schema } from "mongoose";

const pushNotificationsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        default: true,
      },
      adminOnly: {
        type: Boolean,
        default: false,
      },
      subscribers: [
        {
          type: Schema.Types.ObjectId,
          ref: "Usuario",
        },
      ],
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
      },
});

export const PushNotificationsModel = mongoose.model("PushNotifications", pushNotificationsSchema);
