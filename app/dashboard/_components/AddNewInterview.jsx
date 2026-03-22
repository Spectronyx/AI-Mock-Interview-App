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
import { LoaderCircle, Plus } from "lucide-react";
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
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResp, setJsonResp] = useState();
  const { user } = useUser();
  const router=useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const inputPrompt = `Based on the following criteria, please provide 5 interview questions: Position: ${jobPosition} ,Experience Level: ${jobExpirience} ,Tech Stack: ${jobDescription}`;
    const count = 5;
    
    const result = await generateInterviewQA(
      jobPosition,
      jobDescription,
      jobExperience,
      count
    );
    if (result) {
      setJsonResp(JSON.stringify(result));
      const resp = await db.insert(mockInterviewSchema)
        .values({
          mockId: uuidv4(),
          jsonMockRes: JSON.stringify(result),
          jsonJobDesc: jobDescription,
          jsonJobPos: jobPosition,
          JobExp: jobExperience,
          createdby: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY")
        }).returning({ mockId: mockInterviewSchema.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + resp[0]?.mockId)
      }
    } else {
      console.error("Some error occurred");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border-2 border-dashed border-gray-300 rounded-2xl transition-all hover:border-blue-500 hover:bg-blue-50/50 hover:scale-[1.02] hover:cursor-pointer flex flex-col items-center justify-center gap-3 group"
        onClick={() => setOpenDialog(true)}
      >
        <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-600 transition-colors">
          <Plus className="h-8 w-8 text-blue-600 group-hover:text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-700 group-hover:text-blue-700 transition-colors">
          Add New Interview
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Practice with AI and get instant feedback
        </p>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl rounded-3xl overflow-hidden p-0 border-none">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <h2 className="font-bold text-3xl">Tell Us About the Job</h2>
            <p className="text-blue-100 mt-2">
              The more details you provide, the better the AI can tailor your interview.
            </p>
          </div>
          
          <div className="p-8">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Job Position / Role
                </label>
                <Input
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ex. Senior Full Stack Developer"
                  required
                  onChange={(event) => setJobPosition(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Job Description / Tech Stack
                </label>
                <Textarea
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                  required
                  placeholder="Ex. React, Node.js, Next.js, PostgreSQL, AWS"
                  onChange={(event) => setJobDescription(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Years of Experience
                </label>
                <Input
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  max="40"
                  required
                  placeholder="Ex. 3"
                  onChange={(event) => setJobExperience(event.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-xl px-6"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl px-8 bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg transition-all"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      <span>Generating Q&A...</span>
                    </div>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
