"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { motion } from 'framer-motion';


function Hero() {
  const {user,isSignedIn}=useUser();
   const router=useRouter();

   useEffect(()=>{
      
    if(isSignedIn){
     router.push("/dashboard");
     }





   },[isSignedIn])

  
  return (
    <div>
      <section className=" text-white bg-zinc-600">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <motion.h1
      initial={{opacity:0,y:-50}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.5}}



        className="bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Ace Your Interviews with AI-Powered Mock Sessions

       
      </motion.h1>

      <motion.p 
      initial={{opacity:0,y:-50}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.5}}
      
      className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      Personalized feedback to improve your confidence and land your dream job.
      </motion.p>
  

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <motion.div
        whileHover={{scale:1.1}}
        whileTap={{scale:0.9}}
        
        >

        
         <Link
          className="block w-full rounded border border-zinc-200 bg-zinc-800 px-12 py-3 text-md font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto hover:bg-zinc-700"
          href={'/sign-up'}
        >
          Get Started
        </Link>
        </motion.div>
         

        <a
          className="block w-full rounded bg-zinc-500 border border-zinc-200 px-12 py-3 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring active:bg-zinc-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
       
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero
