"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import InterviewCard from "./InterviewCard"
import { motion,useInView } from 'framer-motion'
import { useRef } from 'react'

function PreviousInterview() {
  const {user}=useUser();
  const [interviews,setInterviews]=useState([]);
 // const email = user.primaryEmailAddress?.emailAddress

  const ref=useRef(null);
  const isInView=useInView(ref,{
    once:true
  })





  useEffect(()=>{


    async function getInterview(){
      const response=await fetch("https://ai-interview-nrlk.vercel.app/api/GetInterview?id=diptanshumaurya39@gmail.com");
      const result=await response.json();
      console.log("result",result) 
      setInterviews(result.data);
    }

   
      getInterview();
    
    




  },[])
  return (
    <div>
       <h1 className="font-bold text-2xl  m-5">Previous Interviews:</h1> 

       <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 m-4  rounded-lg'
       ref={ref}
       initial={{
         opacity:0,
         y:50
       }}
       animate={
         isInView?{opacity:1,y:0}:{opacity:0,y:50}
       }
       transition={
         {duration:2}
       }
       
       >

        




       {interviews&& interviews.map((interview,i)=>(

          <InterviewCard key={i} interview={interview}></InterviewCard>
          ))
 
}
       </motion.div>
       

             
    </div>
  )
}

export default PreviousInterview
