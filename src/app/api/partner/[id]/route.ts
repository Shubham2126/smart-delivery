import { NextRequest, NextResponse } from "next/server";
import { Partner } from "@/models/partner";
import connectDB from "@/database/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const body = await req.json();
    const updated = await Partner.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json(
        { message: "Partner not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating partner" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = context.params.id;
    const deleted = await Partner.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { message: "Partner not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: deleted }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting partner" },
      { status: 500 }
    );
  }
}
