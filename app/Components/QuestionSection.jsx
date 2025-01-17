"use client";
import React, { useEffect, useState } from 'react';
import { FaRegLightbulb } from "react-icons/fa";

function QuestionSection({ interviewQuestion, activeQuesIdx, setActiveQuesIdx }) {
  const [showHint, setShowHint] = useState(false);

   useEffect(()=>{

   console.log("interviewQuestion Question section",interviewQuestion) 




   },[])

   

  return interviewQuestion && (
    <div>
      <div>
        <div className="grid grid-cols-4 p-2">
          {interviewQuestion && interviewQuestion.map((q, i) => (
            <h2
              onClick={() => setActiveQuesIdx(i)}
              key={i}
              className={`p-2 m-2 bg-secondary rounded-full text-center hover:cursor-pointer ${activeQuesIdx === i ? 'bg-slate-400' : ''}`}
            >
              Question {i + 1}
            </h2>
          ))}
        </div>
        <h2 className="p-2">{interviewQuestion[activeQuesIdx]?.question}</h2>
      </div>

      <div className="mt-4 p-2">
        <div onClick={() => setShowHint(showHint => !showHint)} className="flex text-xl items-center justify-center gap-3 bg-yellow-200 hover:cursor-pointer rounded-full">
          <div><FaRegLightbulb /></div>
          <div>Hint!!</div>
        </div>

        {showHint && (
          <div className="p-3">
            {interviewQuestion[activeQuesIdx]?.hint}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionSection;
