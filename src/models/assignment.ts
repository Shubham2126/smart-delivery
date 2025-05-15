import mongoose from "mongoose";
import { IAssignment } from "@/types/assignment";
const assignmentSchema = new mongoose.Schema<IAssignment>({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",

  },
  status: { type: String, enum: ["success", "failed"], default: "success" },
  reason: { type: String },
},
{timestamps: true}
);

export const Assignment =
  mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);
