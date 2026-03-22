import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './interview/InterviewList'
import { Sparkles } from 'lucide-react'

function Dashboard() {
  return (
    <div className='p-6 md:p-10 space-y-8 max-w-7xl mx-auto'>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-8 border-gray-100">
        <div>
          <h1 className='font-extrabold text-4xl tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent'>
            Dashboard
          </h1>
          <p className='text-gray-500 mt-2 flex items-center gap-2 text-lg'>
             <Sparkles className="h-5 w-5 text-blue-500 shrink-0" />
            Create and manage your AI-powered mock interviews
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10'>
        <AddNewInterview />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Recent Sessions</h2>
        </div>
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-2 border border-blue-50/50">
          <InterviewList />
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard