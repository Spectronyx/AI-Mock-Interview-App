"use client"
import { Lightbulb, Volume2, Info, GraduationCap } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

function QuestionComponent({ mockInterviewQuestion, activeQuestionIndex }) {
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.rate = 1.1; // Slightly faster for natural flow
            speech.pitch = 1.0;
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser doesn't support text to speech")
        }
    }

    return mockInterviewQuestion && (
        <div className='p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-blue-500/5 animate-in slide-in-from-left duration-500 overflow-hidden relative'>
            <div className="absolute top-0 right-0 p-8 opacity-5 -z-10 bg-gradient-to-br from-blue-600 to-indigo-700 h-64 w-64 rounded-full -mr-20 -mt-20"></div>
            
            <div className='flex flex-wrap gap-3 mb-8'>
                {mockInterviewQuestion.map((question, index) => (
                    <div 
                        key={index}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            activeQuestionIndex >= index ? "bg-blue-600" : "bg-gray-100"
                        }`}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest leading-none">
                        Question #{activeQuestionIndex + 1}
                    </span>
                 </div>
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
                    className="rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                 >
                    <Volume2 className="h-5 w-5" />
                 </Button>
            </div>

            <h2 className='text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-10 min-h-[100px]'>
                {mockInterviewQuestion[activeQuestionIndex]?.question}
            </h2>

            <div className='bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-100 rounded-3xl p-6 relative overflow-hidden mt-10 shadow-inner'>
                 <div className="flex items-center gap-3 text-amber-600 font-bold mb-3">
                    <Lightbulb className="h-5 w-5" />
                    <span>Expert Advice</span>
                 </div>
                 <p className="text-amber-800/80 text-sm leading-relaxed mb-4">
                    Take a deep breath. Speak clearly and use specific examples from your past projects. 
                    It's okay to take a moment to think before answering.
                 </p>
                 <div className="p-3 bg-white/50 backdrop-blur-md rounded-2xl text-xs text-amber-900 font-medium flex items-start gap-2">
                    <Info className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Your answer will be compared with an ideal response to provide constructive feedback.</span>
                 </div>
            </div>
        </div>
    )
}

export default QuestionComponent