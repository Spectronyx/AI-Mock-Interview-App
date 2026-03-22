import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { neobrutalism,dark } from '@clerk/themes';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI MOCK INTERVIEW",
  description: "AI-powered mock interview app with voice, webcam, and instant feedback",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider   options={{ disableDevBrowserWarning: true }} appearance={{theme:dark}}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <Toaster/> 
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
