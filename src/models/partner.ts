import mongoose from "mongoose";
import { IPartner } from "@/types/partnerTypes";

const partnerSchema = new mongoose.Schema<IPartner>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  currentLoad: { type: Number, default: 0 },
  areas: {
    type: [String],
  },
  shift: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
  metrics: {
    rating: {
      type: Number,
    },
    completedOrders: {
      type: Number,
    },
    cancelledOrders: {
      type: Number,
    },
  },
});

export const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
