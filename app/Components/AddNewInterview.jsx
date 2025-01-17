"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/AiModel";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { IoMdAddCircleOutline } from "react-icons/io";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [years, setYears] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mockResp,setMockResp]=useState([]);
  
  const {user}=useUser();
  const router=useRouter();

  const openDialogHandler = () => setOpenDialog(true);
  const closeDialogHandler = () => setOpenDialog(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const PROMPT = `JOB POSITION: ${jobPosition}, JOB DESCRIPTION: ${jobDesc}, YEARS OF EXPERIENCE: ${years}. Depending on this information give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION} interview questions. Give the response in that format so that i can parse it into json data easily.question ,hint,answer as a field . `;

      const result = await chatSession.sendMessage(PROMPT);
      const responseText =  result.response.text();
      const jsonResponse = (responseText.replace('```json', '')).replace('```', '');
      setMockResp(jsonResponse);

      const reqData={
        mockResp:jsonResponse,
        jobPosition:jobPosition,
        jobDesc:jobDesc,
        jobExperience:years,
        createdBy:user?.primaryEmailAddress?.emailAddress
      };

      const res=await fetch("https://ai-interview-nrlk.vercel.app/api/InsertMockInterview/",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(reqData)
      })
      if (res.ok) {
        let Data = await res.json();
        console.log("Data inserted successfully:", Data);
        router.push('/dashboard/interview/'+Data.data._id);
       // console.log(data._id)
        
      } else {
        throw new Error("Failed to save interview data");
      }

     // const MockRes = JSON.parse(jsonResponse);
      
    } catch (error) {
      console.error("Error processing AI response:", error);
      alert("Failed to generate interview questions. Please try again.");
    } finally {
      setLoading(false);
      closeDialogHandler();

      
    }
  }

  return (
    <div className="p-5">
      <div
        className="h-40 w-1/4 bg-slate-300 flex items-center justify-center rounded-lg hover:shadow-md hover:shrink hover:bg-slate-200 text-lg border font-semibold hover:cursor-pointer"
        onClick={openDialogHandler}
      >
       <IoMdAddCircleOutline></IoMdAddCircleOutline> Add New
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tell us more about your interview</DialogTitle>

            <DialogDescription>
              <span>Add details for job position, job description, and years of experience.</span>
              <form onSubmit={handleSubmit}>
                <div className="mt-3">
                  <div className="my-2">Job Position</div>
                  <Input onChange={(e) => setJobPosition(e.target.value)} required />

                  <div className="my-2">
                    <label htmlFor="OrderNotes" className="block text-sm font-medium text-gray-700">
                      Job Description
                    </label>
                    <textarea
                      id="OrderNotes"
                      className="mt-2 w-full rounded-lg border-gray-900 align-top shadow-sm sm:text-sm"
                      rows="4"
                      placeholder="e.g., React, Django, Node.js"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="my-2">Years of Experience</div>
                  <Input
                    type="number"
                    max="60"
                    min="0"
                    required
                    onChange={(e) => setYears(e.target.value)}
                  />
                </div>

                <div className="flex gap-4 justify-end items-center my-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <svg
                        className="w-5 h-5 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle> 
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path> 
                      </svg> 
                    ) : (
                      <>Start Interview</>
                    )}
                  </Button>
                  <Button onClick={closeDialogHandler}>Cancel</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
