import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from "sonner";
import { chatSession } from '@/utils/AiModel';
import { useUser } from '@clerk/nextjs';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

function RecordAnswerSection({ interviewQuestion, activeQuesIdx, id, setActiveQuesIdx }) {
  const [userAns, setUserAns] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [recordedAnswer, setRecordedAnswer] = useState('');
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    timeout: 10000000,
    speechRecognitionProperties: {
      lang: 'en-US',
      interimResults: true,
    }
  });

  useEffect(() => {
    if (error) {
      toast.error('Error with speech recognition. Please check microphone permissions.');
    }
  }, [error]);

  useEffect(() => {
    if (interimResult) {
      setUserAns(prev => prev + ' ' + interimResult);
    }
  }, [interimResult]);

  useEffect(() => {
    if (results.length > 0) {
      const transcripts = results.map(result => result.transcript).join(' ');
      setUserAns(transcripts);
    }
  }, [results]);

  const handleRecordClick = async () => {
    if (isRecording) {
      await stopSpeechToText();
      const finalTranscript = results.map(result => result.transcript).join(' ');
      setRecordedAnswer(finalTranscript);
      setShowConfirmation(true);
    } else {
      setUserAns('');
      setResults([]);
      try {
        await startSpeechToText();
      } catch (err) {
        toast.error('Failed to start recording. Please check microphone permissions.');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!recordedAnswer || recordedAnswer.length < 10) {
        toast.error('Answer is too short. Please try again');
        return;
      }

      const feedbackPrompt = `Question:${interviewQuestion[activeQuesIdx]?.question},UserAnswer:${recordedAnswer} .According to the question and useranswer give the feedback along with rating out of 10 . feedback should be in 2 to 3 lines. Response should have feedback and rating field. Response should be in that format so that i can convert it into json easily`;
      const result = await chatSession.sendMessage(feedbackPrompt);
      console.log("result",result)
      const responseText =  result.response.text();
      const jsonResponse = responseText.replace("```json", "").replace("```", "");
      const jsonFeedback = JSON.parse(jsonResponse);
      console.log("jsonFeedback",jsonFeedback)

      const reqData = {
        "mockId": id,
        "question": interviewQuestion[activeQuesIdx]?.question,
        "correctAns": interviewQuestion[activeQuesIdx]?.answerHints[0],
        "userAns": recordedAnswer,
        "feedback": jsonFeedback.feedback,
        "rating": jsonFeedback.rating,
        "createdBy": user?.primaryEmailAddress?.emailAddress
      };
      console.log("interviewQuestion",interviewQuestion);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/InsertUserAns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData)
      });

     const Result= await res.json();
     console.log("Result",Result)
      toast.success('Answer saved successfully');
      setShowConfirmation(false);
      setUserAns('');
      setRecordedAnswer('');

    } catch (error) {
      console.log("error",error)
      toast.error('Error saving answer. Please try again');
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setUserAns('');
    setRecordedAnswer('');
    setResults([]);
  };

  return (
    <div>
      {activeQuesIdx == interviewQuestion?.length - 1 &&
        <Link href={'/dashboard/interview/' + id + '/feedback'}>
          <div className='flex justify-center mb-4 items-center'>
            <Button>End Interview</Button>
          </div>
        </Link>
      }

      <div className='flex justify-center flex-col items-center border h-80 bg-secondary w-96'>
        <Image src={'/webcam.jpg'} width={200} height={200} alt="webcam img" className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            width: '100%',
            height: 300,
            zIndex: 30
          }}
        />

        <Button 
          className="my-2"
          onClick={handleRecordClick}
          variant={isRecording ? "destructive" : "default"}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
        

        
      </div>
      {/* <div>
        {isRecording && (
          <textarea rows={5} cols={5} className="mt-2 text-sm text-gray-600">
            
          </textarea>
        )}
        </div> */}

      <div className='flex gap-4 m-4 justify-between'>
        {activeQuesIdx != 0 &&
          <Button onClick={() => setActiveQuesIdx(prev => prev - 1)}>
            <FaArrowLeftLong /> Previous
          </Button>
        }
        {activeQuesIdx != interviewQuestion?.length - 1 &&
          <Button onClick={() => setActiveQuesIdx(prev => prev + 1)}>
            Next <FaArrowRightLong />
          </Button>
        }
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Answer</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="font-medium mb-2">Your recorded answer:</h3>
            <p className="text-sm text-gray-500 max-h-40 overflow-y-auto">
              {recordedAnswer || 'No answer recorded'}
            </p>
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Answer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RecordAnswerSection;