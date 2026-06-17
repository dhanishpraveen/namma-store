"use server";

import { createClient } from "../supabase/server";

export async function fetchProducts() {
  const supabase = await createClient();
  const { data: products, error } = await supabase.from("products").select("*");
  if (error) {
    console.log(error);
    return [];
  }
  return products;
}

export async function fetchProductsById(id:string){
  const supabase = await createClient()
  const { data: product, error } = await supabase.from("products").select("*,category:categories!fk_category(name)").eq("id",id).single();
  if (error) {
    console.log(error);
    return [];
  }
  return product;
}
