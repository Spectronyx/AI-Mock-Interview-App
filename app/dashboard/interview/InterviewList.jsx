"use client"
import { db } from '@/utils/db';
import { mockInterviewSchema } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../_components/InterviewCard';
import { Loader2, Inbox } from 'lucide-react';

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(mockInterviewSchema)
                .where(eq(mockInterviewSchema?.createdby, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(mockInterviewSchema.id));

            setInterviewList(result);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center py-20 animate-pulse'>
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-400 font-medium">Loading your sessions...</p>
            </div>
        )
    }

    if (interviewList?.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200'>
                <Inbox className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">No interviews found</h3>
                <p className="text-gray-400 text-sm mt-1">Start your first AI mock interview today!</p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {interviewList && interviewList.map((interview, index) => (
                <InterviewCard key={index} interview={interview} />
            ))}
        </div>
    )
}

export default InterviewList