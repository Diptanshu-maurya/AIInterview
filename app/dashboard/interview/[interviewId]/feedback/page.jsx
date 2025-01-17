"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from 'framer-motion';

function Feedback({ params }) {
  const resolvedParams = React.use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const containerVariants={
    hidden:{
      opacity:0
    },
    visible:{
     opacity:1,
     transition:{staggerChildren:0.1}
    }
  }
  const itemsVariants={
    hidden:{
      opacity:0,
      y:20
    },
    visible:{
      opacity:1,
      y:0,
      transition:{
        duration:0.5
      }
    }
  }





  useEffect(() => {
    async function getUserFeedback() {
      try {
        if (!resolvedParams.interviewId) {
          setError("No interview ID provided");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3000/api/GetUserFeedback?id=${resolvedParams.interviewId}`);
        const result = await response.json();
        console.log("result",result)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        
        
        if (!result.data) {
          throw new Error("No data received from server");
        }

        setData(result.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getUserFeedback();
  }, [resolvedParams.interviewId]);

  if (error) {
    return (
      <div className="p-10">
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold ml-10'> Here is your Result: </h2>

      {loading ? (
        <div className="flex justify-center items-center p-10">
          <div className="text-lg">Loading...</div>
        </div>
      ) : (
        <motion.div 
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        
        
        
        
        className='space-y-4'>
          {data && data.map((d, i) => (
            <motion.div
            variants={itemsVariants}
            key={i}
            >
            <Collapsible  className='m-10'>
              <CollapsibleTrigger className='border bg-secondary p-4 rounded-md shadow-md flex w-full'>
                <div className='font-bold mr-2'>Question {i + 1}:</div>
                <div className='font-medium'>{d.question}</div>
              </CollapsibleTrigger>
              <CollapsibleContent className='space-y-2 mt-2'>
                <div className='border bg-yellow-100 p-4 rounded-md shadow-md'>
                  <strong>Your Answer:</strong> {d.userAns}
                </div>
                <div className='border bg-blue-100 p-4 rounded-md shadow-md'>
                  <strong>Correct Answer:</strong> {d.correctAns}
                </div>
                <div className='border bg-purple-100 p-4 rounded-md shadow-md'>
                  <strong>Feedback:</strong> {d.feedback}
                </div>
                <div className='border bg-red-100 p-4 rounded-md shadow-md'>
                  <strong>Rating:</strong> {d.rating}
                </div>
              </CollapsibleContent>
            </Collapsible>
            </motion.div>
          ))}
          
          <Link href='/dashboard/'>
            <Button className='ml-10 flex items-center gap-2'>
              Go to Homepage <FaArrowRightLong />
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default Feedback;