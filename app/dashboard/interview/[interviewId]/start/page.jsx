"use client";

import { db } from '@/utils/db';
import { mockInterviewSchema } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState, use } from 'react';
import QuestionComponent from './_component/QuestionComponent';
import RecordAnswerSection from './_component/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Flag, ArrowRight } from 'lucide-react';

function StartInterview({ params }) {
  const { interviewId } = use(params);

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (interviewId) {
      getInterviewDetails(interviewId);
    }
  }, [interviewId]);

  const getInterviewDetails = async (id) => {
    const result = await db
      .select()
      .from(mockInterviewSchema)
      .where(eq(mockInterviewSchema.mockId, id));

    const jsonMockResp = JSON.parse(result[0].jsonMockRes);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div className='max-w-7xl mx-auto py-12 px-4 space-y-10 animate-in fade-in duration-1000'>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 border-gray-100">
        <div>
          <h1 className='font-extrabold text-4xl tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent'>
            Active Interview
          </h1>
          <p className='text-gray-500 mt-2 flex items-center gap-2 text-lg'>
             Session: <span className="font-bold text-gray-900">{interviewData?.jsonJobPos}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-2xl font-bold text-sm border border-blue-100 shadow-sm animate-pulse">
          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
          Interview Progress: {Math.round((activeQuestionIndex + 1) / (mockInterviewQuestion?.length || 1) * 100)}%
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
        {/* Questions  */}
        <QuestionComponent 
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex} 
        />
        
        {/* Video/Audio Recording  */}
        <RecordAnswerSection 
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData} 
        />
      </div>

      <footer className='flex flex-col md:flex-row gap-6 justify-between items-center bg-white/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-gray-100 shadow-lg shadow-blue-500/5 mt-10'>
        <div className="flex items-center gap-3">
            <Button 
                variant="ghost" 
                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                disabled={activeQuestionIndex === 0}
                className="rounded-2xl px-6 font-bold text-gray-600 disabled:opacity-30"
            >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous Question
            </Button>
            
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100/50 border rounded-2xl">
                {mockInterviewQuestion?.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                            activeQuestionIndex === idx ? "bg-blue-600 scale-125" : "bg-gray-200"
                        }`}
                    />
                ))}
            </div>
        </div>

        <div className="flex items-center gap-4">
            {activeQuestionIndex !== mockInterviewQuestion?.length - 1 ? (
                <Button
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                    className="rounded-2xl px-10 py-6 font-bold bg-gray-900 hover:bg-black transition-all group shadow-sm hover:shadow-lg active:scale-95"
                >
                    Next Question
                    <ChevronRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
            ) : (
                <Link href={"/dashboard/interview/" + interviewId + "/feedback"}>
                    <Button 
                        className="rounded-2xl px-12 py-6 font-black bg-gradient-to-r from-red-600 to-red-700 hover:animate-pulse shadow-xl shadow-red-200 text-white transition-all transform active:scale-95 group"
                    >
                        <Flag className="h-5 w-5 mr-2" />
                        Finish Interview
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform opacity-70" />
                    </Button>
                </Link>
            )}
        </div>
      </footer>
    </div>
  );
}

export default StartInterview;
