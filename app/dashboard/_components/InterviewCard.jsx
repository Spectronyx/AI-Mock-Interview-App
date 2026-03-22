import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Calendar, Briefcase, GraduationCap, ChevronRight } from 'lucide-react'

function InterviewCard({ interview }) {
    const router = useRouter();
    
    return (
        <div className='group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col gap-4 border-l-4 border-l-blue-500'>
            <div className="space-y-1">
                <h2 className='font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1'>
                    {interview?.jsonJobPos}
                </h2>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Briefcase className="h-4 w-4" />
                    <span>{interview?.JobExp} Years of Experience</span>
                </div>
            </div>

            <div className='flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg'>
                <Calendar className="h-3.5 w-3.5" />
                <span>Created: {interview?.createdAt}</span>
            </div>

            <div className='flex items-center gap-3 mt-2'>
                <Button 
                    onClick={() => router.push("/dashboard/interview/" + interview?.mockId + "/feedback")} 
                    variant="ghost" 
                    className="flex-1 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-100" 
                    size="sm"
                >
                    Feedback
                </Button>
                <Button 
                    onClick={() => router.push("/dashboard/interview/" + interview?.mockId)} 
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg transition-all text-white border-none group/btn" 
                    size="sm"
                >
                    Start
                    <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                </Button>
            </div>
        </div>
    )
}

export default InterviewCard