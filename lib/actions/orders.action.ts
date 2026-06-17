"use server"

import { CreateOrder, OrderParams } from "@/shared.dtypes";
import { createClient } from "../supabase/server";


export  async function createOrder(orderDetails:CreateOrder) {
    const supabase = await  createClient()
    const {data} = await supabase.auth.getUser()
    const userId = data.user?.id
    if(!userId){
        throw new Error("User not authenticated-->>cartAction.ts")
    }
    const {data:orderData,error} = await supabase.from("orders").insert(orderDetails).eq("user_id",orderDetails.user_id).select()
    if(error){
        console.log("Error creating order ",error)
        return
    }
    return orderData && orderData[0].id
}

export async function checkOrder(reference:string){
    const supabase = await createClient()
    const {data} = await supabase.auth.getUser()
    const userId = data.user?.id
    if(!userId){
        throw new Error("User not authenticated-->>cartAction.ts")
    }
    const {data:referenceFromPaystack,error} = await supabase.from("orders").select("reference_paystack").eq("user_id",userId).eq("reference_paystack",reference)
    if(error){
        console.log("Error getting reference ",error)
        return
    }
    return referenceFromPaystack
}

export async function fetchOrderById(orderId:string){
    const supabase = await createClient()
    const {data} = await supabase.auth.getUser()
    const userId = data.user?.id
    if(!userId){
        throw new Error("User not authenticated-->>cartAction.ts")
    }
    const {data:orderData,error} = await supabase.from("orders").select("*").eq("user_id",userId).eq("id",orderId).single()
    if(error){
        console.log("Error fetching order",error)
        return
    }
    return orderData
}

export async function fetchUserOrders():Promise<OrderParams[]> {
    const supabase = await createClient()
    const {data} = await supabase.auth.getUser()
    const userId = data.user?.id
    if(!userId){
        throw new Error("User not authenticated-->>cartAction.ts")
    }
    const {data:allUserOrders,error} = await supabase.from("orders").select("*").eq("user_id",userId).order("created_at",{ascending:false})
    if(error){
        console.log("Error fetching user orders",error)
        return []
    }
    return allUserOrders
}