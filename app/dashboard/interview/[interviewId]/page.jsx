"use client";
import { mockInterviewSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, use } from "react";
import { db } from "@/utils/db";
import { Lightbulb, WebcamIcon, Briefcase, Info, ArrowRight } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

function Interview({ params }) {
    const { interviewId } = use(params);

    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [interviewData, setInterviewData] = useState(null);

    const getInterviewDetails = async (id) => {
        const result = await db
            .select()
            .from(mockInterviewSchema)
            .where(eq(mockInterviewSchema.mockId, id));
        setInterviewData(result[0]);
    };

    useEffect(() => {
        if (interviewId) {
            getInterviewDetails(interviewId);
        }
    }, [interviewId]);

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in duration-700">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                    Let's Get Started!
                </h1>
                <p className="text-gray-500 text-lg">
                    Prepare your environment for the best interview experience.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className="space-y-6">
                    {/* Job Details Card */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 text-blue-600 mb-2">
                            <Briefcase className="h-6 w-6" />
                            <h2 className="text-xl font-bold">Interview Info</h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Job Role</h3>
                                <p className="text-lg font-medium text-gray-900">{interviewData?.jsonJobPos}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Tech Stack</h3>
                                <p className="text-lg font-medium text-gray-900">{interviewData?.jsonJobDesc}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Experience Required</h3>
                                <p className="text-lg font-medium text-gray-900">{interviewData?.JobExp} Years</p>
                            </div>
                        </div>
                    </div>

                    {/* Information Box */}
                    <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Lightbulb className="h-16 w-16 text-amber-500" />
                        </div>
                        <div className="flex items-center gap-3 text-amber-600 font-bold text-lg mb-4">
                            <Info className="h-5 w-5" />
                            <span>Important Instructions</span>
                        </div>
                        <div className="text-amber-800 leading-relaxed text-sm space-y-2">
                             <p>{process.env.NEXT_PUBLIC_INFO}</p>
                        </div>
                    </div>
                </div>

                {/* Webcam Card */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center gap-6">
                    <div className="w-full aspect-video rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative shadow-inner">
                        {webCamEnabled ? (
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                mirrored={true}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <>
                                <WebcamIcon className="h-24 w-24 text-gray-300 mb-4 animate-pulse" />
                                <p className="text-gray-400 text-sm font-medium">Camera Preview</p>
                            </>
                        )}
                    </div>
                    
                    <div className="w-full space-y-4">
                        {!webCamEnabled ? (
                            <Button
                                className="w-full rounded-2xl py-6 text-lg font-semibold bg-gray-900 hover:bg-black transition-all shadow-md active:scale-95"
                                onClick={() => setWebCamEnabled(true)}
                            >
                                Enable Camera & Audio
                            </Button>
                        ) : (
                            <div className="bg-green-50 border border-green-100 p-3 rounded-xl flex items-center justify-center gap-2 text-green-700 text-sm font-medium">
                                <div className="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
                                System Ready
                            </div>
                        )}
                        
                        <div className="flex justify-center">
                            <Button 
                                className="w-full rounded-2xl py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all group active:scale-95"
                                disabled={!webCamEnabled}
                                asChild
                            >
                                <Link href={"/dashboard/interview/" + interviewData?.mockId + "/start"}>
                                    Start Final Interview
                                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Interview;
