"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {
    const path = usePathname();
    useEffect(()=>{
        console.log(path)
    },[])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={"/logo.svg"} width={160} height={100} alt="logo"/>
        <ul className='gap-6 hidden md:flex'>
            <li className={`hover:text-primary hover:font-bold hover:transition-all cursor-pointer ${path=='/dashboard'&&'text-primary font-bold'}`}>Dashboard</li>
            <li className={`hover:text-primary hover:font-bold hover:transition-all cursor-pointer ${path=='/questions'&&'text-primary font-bold'}`}>Questions</li>
            <li className={`hover:text-primary hover:font-bold hover:transition-all cursor-pointer ${path=='/upgrade'&&'text-primary font-bold'}`}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold hover:transition-all cursor-pointer ${path=='/how-it-works'&&'text-primary font-bold'}`}>How it works?</li>
        </ul>
        <UserButton></UserButton>
    </div>
  )
}

export default Header