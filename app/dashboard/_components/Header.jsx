"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  const { user, isLoaded } = useUser();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Questions", href: "/questions" },
    { name: "Upgrade", href: "/upgrade" },
    { name: "How it works?", href: "/how-it-works" },
  ];

  return (
    <header className="flex p-4 items-center justify-between bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300">

      {/* Logo */}
      <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
        <Image
          src="/logo.svg"
          width={160}
          height={64}
          alt="AI Mock Interview Logo"
          priority
        />
      </Link>

      {/* Navigation */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive =
              path === item.href || path.startsWith(item.href + "/");

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative py-1 transition-colors duration-200 hover:text-blue-600 ${isActive
                      ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full"
                      : "text-gray-500"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Auth / User */}
      <div className="flex items-center gap-4">
        {!isLoaded ? (
          <div className="h-9 w-9" />
        ) : user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-xs mr-1">
              <span className="font-semibold text-gray-900 leading-none">
                {user.fullName || user.firstName || "User"}
              </span>
              <span className="text-gray-500 mt-0.5 leading-none">
                Free Plan
              </span>
            </div>

            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "h-9 w-9 border-2 border-white shadow-sm ring-1 ring-gray-100",
                },
              }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;