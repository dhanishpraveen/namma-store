"use server"
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { CreateAddress } from "@/shared.dtypes";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export async function fetchAddresses() {
    const supabase = await createClient()
    const {data} = await supabase.auth.getUser()
    const userId = data.user?.id
    if(!userId){
        console.log("User not authenticated-->>cartAction.ts")
        redirect("/login")
    }
    const {data:addresses,error} = await supabase.from("address").select("*").eq("user_id",userId).order("created_at",{ascending:false})
    if(error){
        console.error("Error fetching addresses in address action :",error)
        throw new Error("Error fetching addresses from address action.")
    }
    return addresses
}

export async function saveAddressDB(addressInfo:CreateAddress) {
    const supabase = await createClient()
    const {data} = await supabase.auth.getUser()
    const userId = data.user?.id
    
    if(!userId){
        console.log("User not authenticated-->>cartAction.ts")
        redirect("/login")
    }
    
    const address = {
        user_id:userId,
        region:addressInfo.selectedRegion?.country,
        address:addressInfo.address,
        state:addressInfo.state,
        city:addressInfo.city,
        phone:addressInfo.phone,
        country_code:addressInfo.selectedRegion?.code
    }

    const result = await supabase.from("address").insert(address).eq("user_id",userId)
    
    if(result.error){
        console.log("Error saving address in address action", result.error.message)
        revalidatePath('/address')
        return {success:false}
    }

    console.log("Address saved to DB ---->",address)
    revalidatePath('/address')
    return {success:true}
}