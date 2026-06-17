import Footer from "@/components/Footer";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";
import { fetchProducts } from "@/lib/actions/products.action";
import React from "react";

async function page() {
  const allProducts = await fetchProducts();
  return (
    <div>
      <Navbar/>
      <div>
        <HeaderSlider />
        <HomeProducts products={allProducts} />
      </div>
      <Footer/>
    </div>
  );
}

export default page;
