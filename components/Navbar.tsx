"use client";

import Image from "next/image";
import { assets } from "@/public/assets/assets";
import React, { useState } from "react";
import Link from "next/link";
import HamX from "@/components/HamX";
import { User } from "@supabase/supabase-js";
import { useAppContext } from "@/context/AppContext";
import { signOut } from "@/lib/actions/userAuth.action";
import { useRouter } from "next/navigation";

function Navbar(){
  const {session} = useAppContext()
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen,setUserOpen] = useState(false)
  const router = useRouter()
  const {setSession} = useAppContext()
  function checkIn(){
    setUserOpen((prev)=>!prev)
  }
  async function handleSignOut(){
    await signOut()
    setSession(null)
    router.push("/")
  }
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-black md:px-16 lg:px-32">
      <Link href={'/'} className="font-extrabold text-[15px] hover:text-gray-300">Namma Store</Link>
      <div className="flex items-center gap-6 lg:gap-8 max-md:hidden">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="/#products" className="hover:text-gray-300">Shop</a>
        <a href="/#about" className="hover:text-gray-300">About Us</a>
        <a href="/#contact" className="hover:text-gray-300">Contact</a>
      </div>
      <div>
        <div className="hidden md:flex items-center justift-center gap-4 *:cursor-pointer ">
          <button>
            <Image src={assets.search_icon} alt="Search icon" />
          </button>
          <button>
            <Image src={assets.heart_icon} alt="Heart icon" />
          </button>
          <Link href={"/cart"}>
            <Image src={assets.cart_icon} alt="Cart icon" />
          </Link>
          <button onClick={checkIn}>
            <Image src={assets.user_icon} alt="User icon" />
          </button>
        </div>
        <div className="md:hidden flex items-center justify-center gap-3 *:cursor-pointer">
          <button className="w-6 h-6">
            <Image src={assets.search_icon} alt="Search icon" />
          </button>
          <Link href={"/cart"} className="w-6 h-6">
            <Image src={assets.cart_icon} alt="Cart icon" />
          </Link>
          <button className="w-6 h-6" onClick={checkIn}>
            <Image src={assets.user_icon} alt="User icon" />
          </button>
          <HamX isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      {userOpen && (
        <div className="flex flex-col z-10 bg-black w-[300] h-[200] items-center gap-4 pt-10 absolute top-14 right-0">
          <div>
            {session?(
              <p>{session?.user.email}</p>
            ):(
              <Link href={"/login"}>
                Sign In
              </Link>
            )}
          </div>
          {session && (
            <div className="flex flex-col gap-2 items-center">
              <Link href={"/profile"}>
                My Profile
              </Link>
              <Link href={"/orders"}>
                My Orders
              </Link>
              <button className="cursor-pointer" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-black w-[70%] h-[100vh] items-center gap-4 pt-10 absolute top-14 right-0">
          <a href="/">Home</a>
          <a href="/#products">Shop</a>
          <a href="/#about">About Us</a>
          <a href="/#contact">Contact</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
