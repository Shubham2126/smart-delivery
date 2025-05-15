import mongoose from "mongoose";
import { IOrder } from "@/types/orderTypes";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },

    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner",
      default: null,
    },

    customer: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },

    area: { type: String },

    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "assigned", "picked", "delivered"],
      default: "pending",
    },

    scheduledFor: { type: String },

    assignedTo: {
      type: String
    },

    totalAmount: { type: Number, required: true },
  },

  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
