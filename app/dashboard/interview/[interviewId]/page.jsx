"use client";
import { mockInterviewSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { use } from "react";
import { Lightbulb, Link, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

function Interview({ params }) {
    const { interviewId } = use(params);

    // ✅ hooks at top level
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [interviewData, setInterviewData] = useState(null);

    const getInterviewDetails = async (id) => {
        const result = await db
            .select()
            .from(mockInterviewSchema)
            .where(eq(mockInterviewSchema.mockId, id));
        console.log(result);
        setInterviewData(result[0]); // ✅ update state here
    };

    useEffect(() => {
        console.log("Interview ID:", interviewId);
        if (interviewId) {
            getInterviewDetails(interviewId);
        }
    }, [interviewId]);

    return (
        <div className="my-10 flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold">Let's Get Started!</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                <div className="flex flex-col my-5 gap-5 ">
                    <div className="flex flex-col rounded-lg p-5 border gap-5">
                        <h2 className="text-lg ">
                            <strong>Job Role/Job Position: </strong>
                            {interviewData?.jsonJobPos}{" "}
                        </h2>
                        <h2 className="text-lg ">
                            <strong>Job Description/Tech Stack: </strong>
                            {interviewData?.jsonJobDesc}{" "}
                        </h2>
                        <h2 className="text-lg ">
                            <strong>Years of Expirience: </strong>
                            {interviewData?.JobExp}{" "}
                        </h2>
                    </div>
                    <div className="flex flex-col rounded-lg p-5 border gap-5 bg-amber-100">
                        <h2 className="flex items-center text-yellow-500 ">
                            <Lightbulb></Lightbulb>
                            <strong>Information</strong>
                        </h2>
                        <h2>{process.env.NEXT_PUBLIC_INFO}</h2>
                        <br />
                        <h2>{process.env.NEXT_PUBLIC_INFO}</h2>
                    </div>
                </div>
                <div className="flex flex-col my-5">
                    <div className="flex flex-col p-5 rounded-lg border gap-5">
                        {webCamEnabled ? (
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)} // ✅ fixed
                                onUserMediaError={() => setWebCamEnabled(false)} // ✅ fixed
                                mirrored={true}
                                style={{ height: 300, width: 300 }}
                            />
                        ) : (
                            <>
                                <WebcamIcon className="h-72 my-10 w-full p-20 bg-secondary rounded-lg border" />
                                <Button
                                    className="bg-gray-200 text-black hover:text-white transition-all"
                                    onClick={() => setWebCamEnabled(true)}
                                >
                                    Enable WebCam and MicroPhone
                                </Button>
                            </>
                        )}
                        
                            <div className="flex justify-end mt-3 ">
                                <a href={"/dashboard/interview/"+interviewData?.mockId+"/start"}>
                                <Button>Start Interview</Button>
                                </a>
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Interview;
