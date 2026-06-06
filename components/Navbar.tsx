"use client";

import Image from "next/image";
import { assets } from "@/public/assets/assets";
import React, { useState } from "react";
import Link from "next/link";
import HamX from "@/components/HamX";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-black md:px-16 lg:px-32">
      <Link href={'/'} className="font-extrabold text-[15px] hover:text-gray-300">Eldics Store</Link>
      <div className="flex items-center gap-6 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/all-products" className="hover:text-gray-300">Shop</Link>
        <Link href="/about" className="hover:text-gray-300">About Us</Link>
        <Link href="/contact" className="hover:text-gray-300">Contact</Link>
      </div>
      <div className="hidden md:flex items-center justift-center gap-4 ">
        <button>
          <Image src={assets.search_icon} alt="Search icon" />
        </button>
        <button>
          <Image src={assets.heart_icon} alt="Heart icon" />
        </button>
        <button>
          <Image src={assets.cart_icon} alt="Cart icon" />
        </button>
        <button>
          <Image src={assets.user_icon} alt="User icon" />
        </button>
      </div>
      <div className="md:hidden flex items-center justify-center gap-3">
        <button className="w-6 h-6">
          <Image src={assets.search_icon} alt="Search icon" />
        </button>
        <button className="w-6 h-6">
          <Image src={assets.cart_icon} alt="Cart icon" />
        </button>
        <button className="w-6 h-6">
          <Image src={assets.user_icon} alt="User icon" />
        </button>
        <HamX isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col bg-black w-[70%] h-[100vh] items-center gap-4 pt-10 absolute top-14 right-0">
          <Link href="/">Home</Link>
          <Link href="/all-products">Shop</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
