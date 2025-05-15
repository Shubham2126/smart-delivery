// app/api/orders/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import { Order } from "@/models/order";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } =  params;
   
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ message: "Status is required" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true}, { status: 200 });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
