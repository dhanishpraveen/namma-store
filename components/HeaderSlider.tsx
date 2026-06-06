"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/public/assets/assets";
import Image, { StaticImageData } from "next/image";

type Slide = {
  id: number;
  title: string;
  imgSrc: StaticImageData;
};

function HeaderSlider() {
  const sliderData: Slide[] = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next Level Gaming Starts Here - Discover PlayStation 5 Today!",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);
  const currentSlide = sliderData[count];
  return (
    <div className="h-90 bg-black">
      <div className="md:hidden">
        <div className="flex items-center justify-center h-60">
          <Image
            src={currentSlide.imgSrc}
            alt="Product image"
            className="w-35"
            loading="eager"
          />
        </div>
        <div>
          <h1 className="w-80 mx-15 font-bold">{currentSlide.title}</h1>
          <button className="w-40 h-10 mx-15 mt-2 text-black bg-[#F4AE52] rounded-[30px]">
            Coming Soon
          </button>
        </div>
      </div>
      <div className="hidden md:flex  justify-between">
        <div className="mt-20 lg:ml-30">
          <h1 className="w-80 ml-15  text-2xl font-bold">
            {currentSlide.title}
          </h1>
          <button className="w-40 h-10 mx-15 mt-2 text-black bg-[#F4AE52] rounded-[30px]">
            Coming Soon
          </button>
        </div>
        <div className="flex items-center justify-center m-10 mr-20 lg:mr-30 ">
          <Image
            src={currentSlide.imgSrc}
            alt="Product image"
            className="w-60"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderSlider;
