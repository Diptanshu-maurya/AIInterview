import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MdOutlineFeedback } from "react-icons/md";
import Link from 'next/link';

function InterviewCard({interview}) {
  useEffect(()=>{
    console.log("interview",interview)
  },[])
  return (
    <div className='border shadow-sm bg-secondary hover:shadow-md hover:shrink rounded-lg'>
      <h1 className='font-semibold bg-zinc-600 p-2'> Job Position: {interview?.jobPosition} </h1>
       <h2 className='font-medium p-2 '> <strong>Job Description:</strong> {interview?.jobDesc}</h2>
       <h3 className='p-2'> <strong>Years of Experience:</strong> {interview?.jobExperience}</h3>
       
       <div className=' mb-2 mr-2 text-right'>
       <Link href={'/dashboard/interview/'+interview?._id+"/feedback"}>
       <Button className="">Feedback <MdOutlineFeedback></MdOutlineFeedback></Button>
       </Link>
       </div>
      
       
    </div>
  )
}

export default InterviewCard;
