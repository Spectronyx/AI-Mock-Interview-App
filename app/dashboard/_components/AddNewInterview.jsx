"use client";
import React from "react";
import { useState } from "react";
import moment from "moment";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ghost, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  generateInterviewQA,
} from "@/utils/geminiai";
import { db } from "@/utils/db";
import { mockInterviewSchema } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExpirience, setJobExpirience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResp, setJsonResp] = useState();
  const {user} = useUser();
  const router=useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const inputPrompt = `Based on the following criteria, please provide 5 interview questions: Position: ${jobPosition} ,Experience Level: ${jobExpirience} ,Tech Stack: ${jobDescription}`;
    const count = 5;
    
    const result = await generateInterviewQA(
      jobPosition,
      jobDescription,
      jobExpirience,
      count
    );
    console.log(result);
    if(result){
    setJsonResp(JSON.stringify(result));
    const resp = await db.insert(mockInterviewSchema)
    .values({
      mockId: uuidv4(),
      jsonMockRes: JSON.stringify(result),
      jsonJobDesc:jobDescription,
      jsonJobPos: jobPosition,
      JobExp: jobExpirience,
      createdby: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy")
    }).returning({mockId:mockInterviewSchema.mockId});
    console.log("Inserted data successfully with mockId; ",resp);
    if(resp){
      setOpenDialog(false);
      router.push('/dashboard/interview'+resp[0]?.mockId)
    }
    }else{
      console.log("Some error occured");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg transition-all hover:scale-105 hover:cursor-pointer hover:shadow-md"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <div>
                <form onSubmit={onSubmit}>
                  <div>
                    <h2 className="font-bold text-2xl text-black">
                      Tell Us More About your Job Role
                    </h2>
                    <h2 className="text-sm text-gray-600 mb-4">
                      Add details about your job role, Your
                      expierience ,Your skills etc.
                    </h2>
                  </div>
                  <div className="my-3">
                    <label className=" text-gray-800">
                      Job Position/Job Role
                    </label>
                    <Input
                      placeholder="Ex. Senior Software Developer"
                      required
                      onChange={(event) =>
                        setJobPosition(event.target.value)
                      }
                    />
                  </div>
                  <div className="my-3">
                    <label className=" text-gray-800 ">
                      Job Description/Tech Stack in short
                    </label>
                    <Textarea
                      required
                      placeholder="Eg. React, Angular ,ReactNative ,Swift"
                      onChange={(event) =>
                        setJobDescription(
                          event.target.value
                        )
                      }
                    />
                  </div>
                  <div className="my-3">
                    <label className=" text-gray-800">
                      No of years of expierience
                    </label>
                    <Input
                      type="number"
                      max="40"
                      required
                      onChange={(event) =>
                        setJobExpirience(event.target.value)
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-5 my-2">
                    <Button
                      type="button"
                      variant={Ghost}
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin">
                            Generating from AI
                          </LoaderCircle>
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
