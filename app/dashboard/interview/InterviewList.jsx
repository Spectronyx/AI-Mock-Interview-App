"use client"
import { db } from '@/utils/db';
import { mockInterviewSchema } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../_components/InterviewCard';

function InterviewList() {
    const {user}=useUser();
    const [interviewList,setInterviewList] = useState();

    useEffect(()=>{
        if(user) GetInterviewList();
    },[user])

    const GetInterviewList= async()=>{
        const result = await db.select()
        .from(mockInterviewSchema)
        .where(eq(mockInterviewSchema?.createdby,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(mockInterviewSchema.id));

        console.log(result);
        setInterviewList(result);
    }
    
    

  return (
    <div>
        <h2 className='font-medium text-lg'>Previous Mock Interviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {interviewList&&interviewList.map((interview,index)=>(
                <InterviewCard key={index} interview={interview}></InterviewCard>
            ))}
        </div>
    </div>
  )
}

export default InterviewList