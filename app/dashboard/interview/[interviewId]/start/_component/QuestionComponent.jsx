import { Lightbulb, Volume2 } from 'lucide-react'
import React, { act } from 'react'

function QuestionComponent({ mockInterviewQuestion, activeQuestionIndex }) {
    const textToSpeach = (text)=>{
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry ,Your browser don't support text to speech")
        }
    }
    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg mt-10'>
            <div className='grid  grid-cols-2 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                    <h2 className={`p-2 rounded-full 
                        text-xs md:text-sm text-center ${activeQuestionIndex == index ? "bg-blue-900 text-white" : "bg-secondary"}`}>#Question {index + 1}</h2>


                ))}
            </div>
            <h2 className='my-5 text-sm md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
            <Volume2 onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)} />

            <div className='border bg-blue-100 text-blue-700 rounded-lg p-5 mt-20'>
                <h2 className='flex items-center gap-2 m-2'>
                    
                    <Lightbulb /><strong>Note: </strong>
                </h2>
                <h2 className='m-2 text-sm'>{process.env.NEXT_PUBLIC_INFO}</h2>
            </div>

        </div>
    )
}

export default QuestionComponent