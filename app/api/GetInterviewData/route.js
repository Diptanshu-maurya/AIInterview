import connectDB from "@/utils/connectDB";
import MockInterview from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(req){
  


   await connectDB();
   
  try {
    const { searchParams } = new URL(req.url);
   
    const id = searchParams.get("id");
  //  console.log("id",id);
    const data= await MockInterview.findOne({ _id: id });
  //  console.log("data",data)
    return NextResponse.json({data:data},{status:201});
    
  } catch (error) {
      return NextResponse.json({error:error},{status:500})
  }
  



}
