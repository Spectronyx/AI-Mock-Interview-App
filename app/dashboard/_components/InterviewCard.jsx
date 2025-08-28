import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewCard({ interview }) {
    const router = useRouter();
  return (
    <div className='border shadow-sm  p-5  rounded-lg transition-all hover:scale-105 hover:cursor-pointer hover:shadow-md'>
        <h2 className='font-bold text-primary'>{interview?.jsonJobPos}</h2>
        <h2 className='font-medium text-sm text-gray-600'>{interview?.JobExp} Years of Expirience</h2>
        <h2 className=' text-xs text-gray-400'>Created At:{interview?.createdAt}</h2>
        <div className='flex justify-between mt-4'>
            <Button onClick={()=>router.push("/dashboard/interview/"+interview?.mockId+"/feedback")} variant="outline" className="bg-gray-50" size="sm">Feedback</Button>
            <Button onClick={()=>router.replace("/dashboard/interview/"+interview?.mockId+"/start")} variant="outline" className="bg-primary text-white"  size="sm">Start</Button>
        </div>
    </div>
  )
}

export default InterviewCard