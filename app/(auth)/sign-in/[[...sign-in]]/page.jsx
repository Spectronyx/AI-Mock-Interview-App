import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <img src="https://static.naukimg.com/s/0/0/i/naukri-identity/naukri_gnb_logo.svg"  alt="Interview Ai Logo" className="rounded-full" />
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">Start a clearing you mock interviews</h3>
            <p className="text-gray-300">
              Create an account and get access to all features for 30-days, No credit card required.
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <img src="https://floatui.com/logo.svg" width={150} className="lg:hidden" alt="Float UI Logo" />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
              <SignIn />
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}