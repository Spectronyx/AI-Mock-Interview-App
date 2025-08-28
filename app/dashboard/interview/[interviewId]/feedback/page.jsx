"use client"
import { db } from '@/utils/db'
import { userAnswerSchema } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import { Router, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();


  useEffect(() => {
    GetFeedback()
  }, [])
  const GetFeedback = async () => {
    const result = await db.select()
      .from(userAnswerSchema)
      .where(eq(userAnswerSchema.mockIdRef, params.interviewId))
      .orderBy(userAnswerSchema.id)

    console.log(result);
    setFeedbackList(result);

    
  }
  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='text-2xl font-bold '>Here is your Interview feedback</h2>
      {feedbackList?.length==0 ? <h2 className='font-bold text-2xl'>"No interview feedback found</h2>:
      <>
      <h2 className='text-primary text-lg my-3'>Your Overall Rating: <strong>7/10</strong></h2>

      <h2 className='text-sm text-gray-600'>Find below your interview questions with your answer ,correct answer and feedback for improvement</h2>
      {feedbackList && feedbackList.map((item, index) => (
      <Collapsible key={index}>
        <CollapsibleTrigger className="p-2 bg-secondary rounded-lg gap-7 w-full my-2 flex justify-between text-left transition-all"  >{item.question}< ChevronsUpDown className='h-4'/></CollapsibleTrigger>
        <CollapsibleContent>
          <div className='gap-5'>
            <h2 className='text-red-500 p-2 border rounded-lg mt-3'><strong>Rating: </strong>{item.rating}</h2>
            <h2 className='p-2 border rounded-lg bg-red-50 text-sm mt-3 text-red-900 '><strong>Your Answer: </strong>{item.userAns}</h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm mt-3 text-green-900 '><strong>Expected Answer: </strong>{item.correctAns}</h2>
            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm mt-3 text-blue-900 '><strong>Feedback: </strong>{item.feedback}</h2>
          </div>
        </CollapsibleContent>
      </Collapsible>
    ))}
    <Button onClick={()=>router.replace("/dashboard")}>Go Home</Button>
    </>}
    </div>
  )
}

export default Feedback