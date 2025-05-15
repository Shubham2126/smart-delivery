import {  NextResponse } from "next/server";
import connectDB from "@/database/db";
import { Assignment } from "@/models/assignment";

export async function GET() {
    try {
        await connectDB()
        const assignment = await Assignment.find()
        return NextResponse.json({success: true, data: assignment}, {status: 200})
    } catch (error) {
         console.log(error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
        
    }
    
}