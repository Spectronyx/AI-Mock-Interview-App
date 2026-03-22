"use client";

import Image from "next/image";
import Link from "next/link";
import FeatureCard from "./dashboard/_components/FeatureCard";
import Header from "./dashboard/_components/Header";

export default function Home() {
    return (
        <div>
            <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
                {" "}
                {/* Navbar */} <Header> </Header> {/* Hero */}{" "}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border bg-white shadow-sm">
                                {" "}
                                🚀 New{" "}
                                <span className="text-gray-600">
                                    {" "}
                                    Ai Avatar Live rolling soon!{" "}
                                </span>{" "}
                            </span>{" "}
                            <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
                                Ace All your <i> Interviews </i>with{" "}
                                <span className="bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent">
                                    AI Mock Interview{" "}
                                </span>{" "}
                            </h1>{" "}
                            <p className="mt-4 text-gray-600 text-lg">
                                A modern approach to get the feel of real
                                interview.{" "}
                            </p>{" "}
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href="#features"
                                    className="px-5 py-3 rounded-md bg-black text-white hover:bg-black/90"
                                >
                                    Explore Features{" "}
                                </Link>{" "}
                                <Link
                                    href="/demo"
                                    className="px-5 py-3 rounded-md border hover:bg-gray-50"
                                >
                                    View Demo{" "}
                                </Link>{" "}
                            </div>{" "}
                            <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                                <div> ⚡Fast & responsive </div>{" "}
                                <div> 🔒Secure </div>{" "}
                                <div> 🎨Industry ready </div>{" "}
                            </div>{" "}
                        </div>{" "}
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-gray-200 to-white blur-2xl" />
                            <div className="relative rounded-2xl border bg-white p-3 shadow-sm">
                                {" "}
                                {/* Replace with your screenshot/illustration */}{" "}
                                <Image
                                    src="/job-interview-5577755.svg"
                                    alt="Preview"
                                    width={1200}
                                    height={800}
                                    className="rounded-xl object-cover"
                                    priority
                                />
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                </section>{" "}
                {/* Features */}{" "}
                <section
                    id="features"
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        {" "}
                        Why choose us{" "}
                    </h2>{" "}
                    <p className="mt-2 text-gray-600">
                        {" "}
                        Everything you need to make most of your Interviews.{" "}
                    </p>{" "}
                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            title="AI-Powered Practice"
                            desc="Get intelligent, instant feedback on your interview responses."
                        />
                        <FeatureCard
                            title="Real Interview Experience"
                            desc="Simulate real-world interviews with timed questions and scenarios."
                        />
                        <FeatureCard
                            title="Personalized Questions"
                            desc="Practice with questions tailored to your job role and skill level."
                        />
                        <FeatureCard
                            title="Track Your Progress"
                            desc="Monitor improvement with performance history and analytics."
                        />
                        <FeatureCard
                            title="Always Available"
                            desc="Practice anytime, anywhere—no scheduling required."
                        />
                        <FeatureCard
                            title="Safe & Secure"
                            desc="Your data stays private and secure with enterprise-grade security."
                        />
                    </div>{" "}
                </section>{" "}
                {/* How it works */}{" "}
                <section id="howitworks"
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-2xl sm:text-3xl font-bold">How it works</h2>
                  <ol className="mt-6 grid gap-4 sm:grid-cols-3 text-sm">
                    <li className="rounded-lg border bg-white p-4">
                      <span className="font-semibold">1. </span> Sign up and create your profile
                    </li>
                    <li className="rounded-lg border bg-white p-4">
                      <span className="font-semibold">2. </span> Practice mock interviews with AI
                    </li>
                    <li className="rounded-lg border bg-white p-4">
                      <span className="font-semibold">3. </span> Get instant feedback and improve
                    </li>
                  </ol>
                  </section>

                {/* CTA */}{" "}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="rounded-2xl border bg-black text-white p-8 sm:p-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold">
                                    {" "}
                                    Ready to get started ?{" "}
                                </h3>{" "}
                                <p className="text-white/80 mt-1">
                                    Get Ready for Job offers at your favorite companies.{" "}
                                </p>{" "}
                            </div>{" "}
                            <div className="flex gap-3">
                                <Link
                                    href="/signup"
                                    className="px-5 py-3 rounded-md bg-white text-black hover:bg-white/90"
                                >
                                    Create Account{" "}
                                </Link>{" "}
                                <Link
                                    href="/docs"
                                    className="px-5 py-3 rounded-md border border-white/30 hover:bg-white/10"
                                >
                                    Read Docs{" "}
                                </Link>{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                </section>{" "}
                {/* Footer */}{" "}
                <footer
                    id="contact"
                    className="border-t"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between text-sm text-gray-600">
                        <p>
                            {" "}
                            © {new Date().getFullYear()}
                            AI-Mock Interview.All rights reserved.{" "}
                        </p>{" "}
                        <div className="flex items-center gap-4">
                            <a
                                href="mailto:you@example.com"
                                className="hover:text-black/70"
                            >
                                {" "}
                                Email{" "}
                            </a>{" "}
                            <a
                                href="https://github.com"
                                className="hover:text-black/70"
                            >
                                {" "}
                                GitHub{" "}
                            </a>{" "}
                            <a
                                href="https://twitter.com/#"
                                className="hover:text-black/70"
                            >
                                {" "}
                                Twitter{" "}
                            </a>{" "}
                        </div>{" "}
                    </div>{" "}
                </footer>{" "}
            </main>{" "}
        </div>
    );
}
