"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle, Video, Loader2 } from 'lucide-react'
import { toast } from "sonner"
import { generateQAFeedback } from '@/utils/geminiai'
import { userAnswerSchema } from '@/utils/schema';
import { db } from '@/utils/db'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    
    const {
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        if (results.length > 0) {
            const transcript = results.map(result => result.transcript).join(' ');
            setUserAnswer(transcript);
        }
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            saveUserAnswer();
        }
    }, [isRecording]);

    const startStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            setUserAnswer("");
            setResults([]);
            startSpeechToText();
        }
    }

    const saveUserAnswer = async () => {
        setLoading(true);
        try {
            const question = mockInterviewQuestion[activeQuestionIndex]?.question;
            const correctAnswer = mockInterviewQuestion[activeQuestionIndex]?.answer;
            const mockId = interviewData?.mockId;

            const qaFeedback = await generateQAFeedback(question, userAnswer);

            const resp = await db.insert(userAnswerSchema)
                .values({
                    mockIdRef: mockId,
                    question: question,
                    correctAns: correctAnswer,
                    userAns: userAnswer,
                    feedback: qaFeedback?.feedback,
                    rating: String(qaFeedback?.rating),
                    createdAt: moment().format("DD-MM-YYYY"),
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                });

            if (resp) {
                toast.success("Response recorded successfully!");
                setUserAnswer("");
                setResults([]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to save response. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-right duration-500">
            <div className='relative w-full max-w-lg aspect-video bg-gray-900 rounded-[2rem] overflow-hidden border-8 border-gray-800 shadow-2xl shadow-blue-500/10 group'>
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 group-hover:opacity-15 transition-opacity duration-700">
                    <Video className="h-48 w-48 text-white scale-110" />
                </div>
                
                <Webcam 
                    mirrored={true}
                    className="absolute inset-0 h-full w-full object-cover z-10"
                />

                {isRecording && (
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-red-600 shadow-lg shadow-red-500/50 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                        <div className="h-2.5 w-2.5 bg-white rounded-full"></div>
                        <span>LIVE RECORDING</span>
                    </div>
                )}
                
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none"></div>
            </div>

            <div className='w-full max-w-lg space-y-6 text-center'>
                <Button 
                    disabled={loading} 
                    onClick={startStopRecording}
                    className={`w-full py-10 text-2xl font-black rounded-3xl transition-all active:scale-95 shadow-xl hover:shadow-2xl ${
                        isRecording 
                        ? "bg-red-50 text-red-600 hover:bg-red-100 border-red-200" 
                        : "bg-gradient-to-br from-blue-600 to-indigo-700 text-white hover:shadow-blue-500/30"
                    }`}
                >
                    {isRecording ? (
                        <div className='flex items-center justify-center gap-4'>
                            <div className="bg-red-600 p-2 rounded-lg shadow-inner">
                                <StopCircle className="h-8 w-8 text-white" />
                            </div>
                            <span>STOP RECORDING</span>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center gap-4'>
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                                <Mic className="h-8 w-8 text-white" />
                            </div>
                            <span>START ANSWERING</span>
                        </div>
                    )}
                </Button>

                {loading && (
                    <div className="flex items-center justify-center gap-3 py-2 text-blue-600 font-bold bg-blue-50/50 rounded-2xl animate-pulse">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="tracking-wide">AI IS ANALYSING YOUR RESPONSE...</span>
                    </div>
                )}

                <div className="p-6 bg-white/40 backdrop-blur-sm rounded-3xl border border-gray-100 text-sm md:text-md text-gray-500 italic shadow-inner min-h-[100px] flex items-center justify-center leading-relaxed">
                    {userAnswer ? (
                        <span className="text-gray-800 not-italic">"{userAnswer}"</span>
                    ) : (
                        "Your transcript will appear here as you speak. Try to be clear and concise!"
                    )}
                </div>
            </div>
        </div>
    )
}

export default RecordAnswerSection