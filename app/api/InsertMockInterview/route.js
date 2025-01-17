import connectDB from "@/utils/connectDB";
import MockInterview from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { mockResp, jobPosition, jobDesc, jobExperience, createdBy } = body;

    // Validate inputs (you can replace this with a schema validation library)
    // if (!Array.isArray(mockResp) || !jobPosition || !jobDesc || !createdBy || jobExperience < 0) {
    //   return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    // }

    // Check for duplicates (optional)
    // const existing = await MockInterview.findOne({ jobPosition, createdBy });
    // if (existing) {
    //   return NextResponse.json({ error: "Interview already exists" }, { status: 400 });
    // }

    // Create and save a new document
    const savedInterview = await MockInterview.create({
      mockResp,
      jobPosition,
      jobDesc,
      jobExperience,
      createdBy,
    });

 //   console.log("Interview saved:", savedInterview);

    return NextResponse.json({ success: true, data: savedInterview }, { status: 201 });
  } catch (error) {
    console.error("Error during API request:", error.message, error.stack);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
