"use client"
import Image from "next/image";
import Hero from "./Components/Hero";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { UserButton,useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
   const {user,isSignedIn}=useUser();
   const router=useRouter();

   useEffect(()=>{
      
    if(isSignedIn){
     router.push("/dashboard");
     }





   },[])

  return (
    <div>  

   <Hero></Hero>
   

    </div>
  );
}
