import UserAnswerSchema from "@/utils/UserAnswerSchema" 
import connectDB from "@/utils/connectDB"
import { NextResponse } from "next/server";


export async function GET(req){

  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
     const data=await UserAnswerSchema.find({mockId:id})

    return NextResponse.json({data:data},{status:201})
    
  } catch (error) {
    return NextResponse.json({error:error.message},{status:500});
    
  }
    





}