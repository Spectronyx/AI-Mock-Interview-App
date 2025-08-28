"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from "sonner"
import { generateQAFeedback } from '@/utils/geminiai'
import { userAnswerSchema }  from '@/utils/schema';

import { Toaster } from '@/components/ui/sonner'
import { db } from '@/utils/db'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex ,interviewData}) {
    const [userAnswer,setUserAnswer]=useState("");
    const [loading,setLoading]=useState(false);
    const {user}=useUser();
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
        useLegacyResults: false
    });
    useEffect(()=>{
        results.map((result)=>{
            setUserAnswer(prevAns=>prevAns+result?.transcript);
        })
    },[results])

    useEffect(()=>{
        if(!isRecording && userAnswer.length > 10){
            saveUserAnswer()
        }
    },[userAnswer])

    const startStopRecording = async()=>{
        if (isRecording) {
            setLoading(true);
            stopSpeechToText();
            // if(userAnswer.length < 10){
            //     setLoading(false);
            //     toast("Error while saving your response");
            // }
            

        }else{
            setLoading(false);
            startSpeechToText();
        }
    }

    const saveUserAnswer =async ()=>{
            console.log(userAnswer);
            setLoading(true);
            const question = mockInterviewQuestion[activeQuestionIndex]?.question;
            const correctAnswer = mockInterviewQuestion[activeQuestionIndex]?.answer;
            const id = interviewData?.mockId;

            const QAfeedback =  await generateQAFeedback(question,userAnswer);
            console.log(JSON.stringify(QAfeedback));

            const resp = await db.insert(userAnswerSchema)
            .values({
                mockIdRef:id,
                question:question,
                correctAns:correctAnswer,
                userAns:userAnswer,
                feedback:QAfeedback[0]?.feedback,
                rating:QAfeedback[0]?.rating,
                createdAt:moment().format("DD-MM-yyyy"),
                userEmail:user?.primaryEmailAddress?.emailAddress,
            });
            if(resp){
                toast("user answer recorder successfully");
                setUserAnswer("");
                setResults([]);
            }
            setResults([]);
            setLoading(false);
    }

    const [webCamEnabled, setWebCamEnabled] = useState(false);
    return (
        <div>
        <div className='flex items-center justify-center flex-col '>
            <div className='flex flex-col items-center justify-center bg-black rounded-lg my-10 p-10 '>
                <Image src={"/webcam-recorder.png"} width={200} height={200} className='absolute' />
                <Webcam mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10
                    }} />
            </div>
            
        </div>
        <div className='flex flex-col justify-center'>
                <Button disabled={loading} variant="outline" className="my-5" onClick={startStopRecording}> {isRecording? <h2 className='flex gap-2 text-red-600'><Mic/>Recording</h2>  : <h2>Start Recording</h2> }</Button>
            </div>
</div>
    )
}

export default RecordAnswerSection