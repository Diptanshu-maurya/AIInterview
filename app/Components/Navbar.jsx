"use client"
import Image from 'next/image'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'


function Navbar() {

  const {user,isSignedIn}=useUser();
   
  return (
    <div>
      <header className="bg-zinc-800">
  <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
    <Link className="block text-white  " href={'/'}>
      <span className="sr-only">Home</span>

       <Image className='p-2 text-white' src="/interview.png" alt="Interview" height={50} width={70}></Image>
      
    </Link>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
       
      </nav>

      <div className="flex items-center gap-4">
         


        { isSignedIn? 
        <div className="sm:flex sm:gap-4">

          <Link href={'/dashboard'}>

        <div
          className=" rounded-md bg-zinc-600 px-5 py-2 my-4 flex justify-center items-center text-md font-medium text-white transition hover:bg-zinc-700 hover:cursor-pointer"
          
        >
          <div>Dashboard</div>
        </div>

        </Link>

        <a
          className="hidden rounded-md  px-5 py-2.5 my-2 text-md font-medium text-white transition hover:text-white hover:bg-neutral-700 sm:block"
          href="#"
        >
          <UserButton></UserButton>
        </a>
        
        
        
        
      </div> 
        :
        <div className="sm:flex sm:gap-4">

        <Link
          className="block rounded-md bg-zinc-600 px-5 py-2.5 text-md font-bold text-white transition hover:bg-zinc-700"
          href={'/sign-in'}
        >
          Sign in
        </Link>

        <Link
          className="hidden rounded-md bg-zinc-600 px-5 py-2.5 text-md font-bold text-white transition hover:text-white hover:bg-neutral-700 sm:block"
          href={'/sign-up'}
        >
          Sign up
        </Link>
        
        
        
        
      </div>
        }
        
        

        <button
          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>
    </div>
  )
}

export default Navbar
