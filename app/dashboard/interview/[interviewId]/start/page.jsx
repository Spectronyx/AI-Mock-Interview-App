"use client";

import { db } from '@/utils/db';
import { mockInterviewSchema } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { act, useEffect, useState } from 'react';
import QuestionComponent from './_component/QuestionComponent';
import RecordAnswerSection from './_component/RecordAnswerSection';
import { Button } from '@/components/ui/button';

function StartInterview({ params }) {
  const { interviewId } = params; // ✅ fixed

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
    console.log(jsonMockResp);
  };

  return (
    <div>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions  */}
        <QuestionComponent mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex} />
        {/* Video/Audio Recording  */}
        <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData} />
      </div>
      <div className='flex  gap-6 justify-end'>
        {activeQuestionIndex > 0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && <Button
          onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}> Next Question</Button>}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 &&<a href={"/dashboard/interview/" + interviewId + "/feedback"}> <Button>End Interview</Button></a>}
      </div>

    </div>
  );
}

export default StartInterview;
