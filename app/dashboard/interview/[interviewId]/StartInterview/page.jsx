"use client";
import Webcam from "react-webcam";
import { BiWebcam } from "react-icons/bi";
import { IoBulbOutline } from "react-icons/io5";
import  QuestionSection from "../../../../Components/QuestionSection"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import RecordAnswerSection from "../../../../Components/RecordAnswerSection"

function StartInterview({ params }) {
  const [id, setId] = useState(null); // State to store interview ID
  // const [interviewData, setInterviewData] = useState(null);
 
  const [interviewQuestion,setInterviewQuestion]=useState();
  const [activeQuesIdx,setActiveQuesIdx]=useState(0);

  // Unwrap the params if it's a Promise
  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params; // Unwrap the Promise
      setId(resolvedParams.interviewId); // Access the interviewId
    }

    resolveParams();
  }, [params]);

  // Fetch interview data once the ID is available
  useEffect(() => {
    if (!id) return; // Don't fetch data if ID is not yet resolved

    // async function getInterviewData(id) {
    //   try {
    //     const response = await fetch(`http://localhost:3000/api/GetInterviewData?id=${id}`);
    //     const result = await response.json();
    //     console.log(result.data)
    //    // setInterviewData(result.data);
    //    console.log("json response:",JSON.parse(result.data.mockResp[0]))
    //     setInterviewQuestion(JSON.parse(result.data.mockResp[0])) // Store the fetched data
    //   } catch (error) {
    //     console.error("Error fetching interview data:", error);
    //   }
    // }
    async function getInterviewData(id) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/GetInterviewData?id=${id}`);
        const result = await response.json();
        console.log(result.data);
    
        // Check if mockResp and mockResp[0] exist
        if (result.data && Array.isArray(result.data.mockResp) && result.data.mockResp[0]) {
          const mockRespString = result.data.mockResp[0];
        //  const correctResponse=(mockRespString).replace('```','');
          console.log("JSON string to parse:", mockRespString);
    
          // Parse the JSON string
          try {
            const parsedData = JSON.parse(mockRespString);
            console.log("Parsed Data:", parsedData);
    
            // Store the parsed data in state
            setInterviewQuestion(parsedData);
            setTimeout(()=>{
              console.log("interviewQuestion",interviewQuestion);
            },3000)
            
          } catch (parseError) {
            console.error("Error parsing JSON:", parseError.message);
          }
        } else {
          console.error("mockResp is not in the expected format or is empty.");
        }
      } catch (error) {
        console.error("Error fetching interview data:", error.message);
      }
    }
    getInterviewData(id);
  }, [id]);

  return (
    <>
     {!interviewQuestion && <div>Loading....</div>}

    <div className="flex items-center justify-center p-4 gap-32 ">
      <div className=" border w-[50%] p-4 ml-40 bg-slate-50 mt-20">

     <QuestionSection interviewQuestion={interviewQuestion} activeQuesIdx={activeQuesIdx} setActiveQuesIdx={setActiveQuesIdx}>  </QuestionSection>
      </div>
      <div className="mr-40 mt-20 h-96 ">
        <RecordAnswerSection interviewQuestion={interviewQuestion} activeQuesIdx={activeQuesIdx} id={id}  setActiveQuesIdx={setActiveQuesIdx}></RecordAnswerSection>
      </div>
      </div>
   
    </>
      
    
  );
}

export default StartInterview;
