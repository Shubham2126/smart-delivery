import { NextRequest, NextResponse } from "next/server";
import { IPartner } from "@/types/partnerTypes";
import { Partner } from "@/models/partner";
import connectDB from "@/database/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: IPartner = await request.json();
    const existPartner = await Partner.findOne({ email: body.email });
    if (existPartner) {
      return NextResponse.json(
        { message: "Partner already exists" },
        { status: 400 }
      );
    }

    const partner = await Partner.create(body);
    return NextResponse.json({ success: true, data: partner }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating partner" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const partners = await Partner.find();
    return NextResponse.json({ success: true, data: partners }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching partners" },
      { status: 500 }
    );
  }
}