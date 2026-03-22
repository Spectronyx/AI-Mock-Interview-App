"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";



export default function Page() {
  const [isClerkReady, setIsClerkReady] = useState(false);

  useEffect(() => {
    // simulate mount delay for Clerk
    const timer = setTimeout(() => setIsClerkReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-black animate-gradient opacity-80 "></div>

      {/* Subtle dotted pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px]"></div>

      {/* Clerk SignIn Box */}
      <div className="relative z-10 w-full max-w-md px-6 py-10 bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="App Logo" className="mx-auto h-16 w-auto" />
          <h3 className="text-white text-2xl font-bold mt-4">Sign In</h3>
          <p className="text-gray-500 text-sm">Access your mock interview dashboard</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none",
            },
          }}
        />
      </div>
    </main>


  );
}
