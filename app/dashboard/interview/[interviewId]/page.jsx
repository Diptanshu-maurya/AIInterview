"use client";
import Webcam from "react-webcam";
import { BiWebcam } from "react-icons/bi";
import { IoBulbOutline } from "react-icons/io5";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

function Interviewpage({ params }) {
  const [id, setId] = useState(null); // State to store interview ID
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnable,setWebcamEnable]=useState(false);
  const [interviewQuestion,setInterviewQuestion]=useState(null);


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
    // Don't fetch data if ID is not yet resolved

    async function getInterviewData(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/GetInterviewData?id=${id}`);
        const result = await response.json();
        console.log(result.data)
        setInterviewData(result.data);
        setInterviewQuestion(JSON.parse(result.data?.mockResp[0])) 
       // console.log("parsed:",JSON.parse(result.data?.mockResp[0]))
        // Store the fetched data
      } catch (error) {
        console.error("Error fetching interview data:", error);
      }
    }
     if(id!=null){
      getInterviewData(id);
     }

    
  }, [id]);

  return (
     <div className="my-3">
      <div className="flex items-center justify-center">
      <div className="font-bold text-2xl  ">Lets get started </div>
      </div>
      

     
    <div className="flex items-center gap-10 justify-center  ">

      <div className="w-[40%] ">

      
    
       {interviewData&&  <div className="bg-secondary  p-4 border rounded-xl "> 
        <h2 className="p-2"> <strong>Job Position:</strong>{interviewData.jobPosition} </h2>
        <h2 className="p-2"> <strong>Job Description:</strong> {interviewData.jobDesc}</h2>
        <h2 className="p-2">  <strong>Years of Experience:</strong>{interviewData.jobExperience}</h2>

       </div>

       }
        <div className=" p-2 border rounded-xl  bg-yellow-100 mt-6" >
          <div className="flex gap-2">
          <span><IoBulbOutline className="text-xl"></IoBulbOutline></span> 
          <strong>Information</strong>
         
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus libero facilis mollitia atque iusto quidem, recusandae doloribus placeat ab cumque possimus, obcaecati dignissimos hic quae rerum, expedita suscipit tempora modi.
          </div>
        
      
        </div>
       </div>
      
       <div className=" w-[40%]">
        {webcamEnable?<Webcam 
         onUserMedia={()=>setWebcamEnable(true)}
         onUserMediaError={()=>setWebcamEnable(false)}
         style={
          {
            height:400,
            width:400
          }
         }
         ></Webcam>:
         <>
         
        <BiWebcam className="my-5 h-72 w-full bg-secondary border rounded-lg"></BiWebcam>
        <Button onClick={()=>setWebcamEnable(true)} className='w-full'>Enable/Disable webcam</Button>
        </>
        }
    
        

       
        
         <Link href={`/dashboard/interview/${id}/StartInterview/`}>
         <Button className="mt-5" >Start Interview <FaArrowRightLong></FaArrowRightLong> </Button>
         </Link>
          
       </div>
      
    </div>
    
    </div>
  );
}

export default Interviewpage;
