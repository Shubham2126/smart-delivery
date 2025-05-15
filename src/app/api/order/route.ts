import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/models/order";
import connectDB from "@/database/db";
import { IOrder } from "@/types/orderTypes";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find();

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: IOrder = await request.json();
    const order = await Order.create(body);
    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
}
