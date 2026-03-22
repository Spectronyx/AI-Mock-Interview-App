"use client"
import { db } from '@/utils/db'
import { userAnswerSchema } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState, use } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, CheckCircle2, Award, ArrowLeft, Star, MessageSquare, Target, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function Feedback({ params }) {
  const { interviewId } = use(params);
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (interviewId) GetFeedback();
  }, [interviewId])

  const GetFeedback = async () => {
    const result = await db.select()
      .from(userAnswerSchema)
      .where(eq(userAnswerSchema.mockIdRef, interviewId))
      .orderBy(userAnswerSchema.id)

    setFeedbackList(result);
    
    if (result.length > 0) {
        const totalRating = result.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0);
        setOverallRating(Math.round(totalRating / result.length));
    }
  }

  return (
    <div className='max-w-5xl mx-auto py-12 px-6 space-y-10 animate-in fade-in zoom-in duration-700'>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
            <h1 className='text-5xl font-black tracking-tight text-green-600 flex items-center gap-3 italic underline'>
                Congratulations!
                <CheckCircle2 className="h-10 w-10 text-green-500 animate-bounce" />
            </h1>
            <p className='text-2xl font-bold text-gray-800 tracking-tight'>
                Your Interview Performance Report is Ready
            </p>
        </div>
        
        <div className="bg-white p-6 rounded-[2.5rem] border-4 border-gray-50 shadow-2xl flex flex-col items-center justify-center min-w-[180px] hover:rotate-2 transition-transform duration-500">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Overall Rating</span>
            <div className="flex items-end gap-1">
                <span className="text-6xl font-black text-blue-600 leading-none">{overallRating}</span>
                <span className="text-2xl font-bold text-gray-300 leading-none pb-1">/10</span>
            </div>
            <div className="flex gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(overallRating/2) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                ))}
            </div>
        </div>
      </header>

      {feedbackList?.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] p-24 text-center">
            <Award className="h-20 w-20 text-gray-200 mx-auto mb-6" />
            <h2 className='font-bold text-2xl text-gray-400'>No feedback sessions found for this interview.</h2>
            <Link href="/dashboard" className="mt-8 block">
                <Button className="rounded-2xl px-8 py-6">Return to Dashboard</Button>
            </Link>
        </div>
      ) : (
        <div className="space-y-8">
            <div className="bg-blue-50/50 backdrop-blur-sm p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                <div className="bg-blue-600 p-2 rounded-xl text-white">
                    <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-bold text-blue-900">Analysis Summary</h3>
                    <p className='text-blue-800/70 text-sm leading-relaxed mt-1'>
                        We've analyzed your responses based on relevance, technical accuracy, and clarity. 
                        Expand the questions below to see detailed feedback and suggested improvements.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {feedbackList.map((item, index) => (
                    <Collapsible key={index} className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors">
                            <div className="flex items-start gap-4">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">
                                    Q{index + 1}
                                </span>
                                <h3 className="font-bold text-gray-900 md:text-lg leading-tight line-clamp-2 pr-4">{item.question}</h3>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                                <div className="hidden sm:flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
                                    Score: {item.rating}/10
                                </div>
                                <ChevronsUpDown className='h-5 w-5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform' />
                            </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent className="border-t border-gray-50 animate-in slide-in-from-top duration-300 overflow-hidden">
                            <div className='p-8 space-y-6 bg-gradient-to-b from-white to-gray-50/50'>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest leading-none mb-1">
                                             <Target className="h-3.5 w-3.5" />
                                             Your Response
                                        </div>
                                        <div className="p-5 bg-red-50/30 border border-red-100/50 rounded-2xl text-gray-700 text-sm italic leading-relaxed shadow-inner">
                                            "{item.userAns}"
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest leading-none mb-1">
                                             <CheckCircle2 className="h-3.5 w-3.5" />
                                             Ideal Approach
                                        </div>
                                        <div className="p-5 bg-green-50/30 border border-green-100/50 rounded-2xl text-gray-700 text-sm leading-relaxed shadow-inner">
                                            {item.correctAns}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                                        <Award className="h-16 w-16 text-blue-600" />
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-3">
                                        <Lightbulb className="h-4 w-4" />
                                        AI Feedback & Improvements
                                    </div>
                                    <p className="text-gray-800 text-base leading-relaxed relative z-10">
                                        {item.feedback}
                                    </p>
                                </div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>

            <footer className="pt-10 flex items-center justify-between gap-4 border-t border-gray-100">
                <Button 
                    onClick={() => router.replace("/dashboard")}
                    variant="ghost" 
                    className="rounded-2xl px-8 py-6 text-gray-500 hover:text-gray-900 hover:bg-gray-100 font-bold"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Dashboard
                </Button>
                
                <Link href="/dashboard">
                    <Button className="rounded-2xl px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-700 font-black text-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95 shadow-lg">
                        Go Home
                    </Button>
                </Link>
            </footer>
        </div>
      )}
    </div>
  )
}

export default Feedback