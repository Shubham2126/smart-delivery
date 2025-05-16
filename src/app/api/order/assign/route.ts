import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import { Partner } from "@/models/partner";
import { Assignment } from "@/models/assignment";
import { Order } from "@/models/order";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { orderId } = await req.json();

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, statusText: "Order not found" },
        { status: 404 }
      );
    }

    const partners = await Partner.find({
      status: "active",
    });

    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

    const available = partners.filter((p) => {
      const [start, end] = [p.shift.start, p.shift.end].map((t) => {
        const [hours, minutes] = t.split(":").map(Number);
        return hours * 60 + minutes;
      });
      const withinShift = nowMinutes >= start && nowMinutes <= end;
      const canTakeOrder = p.currentLoad + order.items.length <= 3;
      return withinShift && canTakeOrder;
    });
    if (available.length === 0) {
      await Assignment.create({
        orderId: order._id,
        status: "failed",
        reason: "No available partner",
      });
      return NextResponse.json(
        { success: false, statusText: "No available partner" },
        { status: 200 }
      );
    }
    available.sort((a, b) => (b.metrics.rating || 0) - (a.metrics.rating || 0));

    const partner = available[0];

    order.assignedTo = partner.name;
    order.status = "assigned";
    await order.save();

    partner.currentLoad += order.items.length;
    await partner.save();

    await Assignment.create({
      orderId: order._id,
      partnerId: partner._id,
      status: "success",
      reason: "Partner has been Assigned",
    });

    return NextResponse.json({
      success: true,
      statusText: "Assigned successfully",
    });
  } catch (error) {
    console.error("Assignment Error:", error);
    return NextResponse.json(
      { success: false, statusText: "Server error" },
      { status: 500 }
    );
  }
}
