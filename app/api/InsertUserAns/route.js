import connectDB from "@/utils/connectDB";
import Userans from "@/utils/UserAnswerSchema"
import { NextResponse } from "next/server";


export async function POST(req){

  await connectDB();
  try {
      const body=await req.json();
      const {mockId,question,correctAns,userAns,feedback,rating,createdAt,createdBy}=body;
      console.log("body",body)

      const data=await Userans.create({
        mockId,
        question,
        correctAns,
        userAns,
        feedback,
        rating,
        createdAt,
        createdBy

      })
      console.log("data",data)

    return NextResponse.json({data:data},{status:201});
  } catch (error) {

    return NextResponse.json({error:error.message},{status:500});
  }
  

 
}