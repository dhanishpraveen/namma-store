"use server"

import { emailValidationSchema } from "../zodvalidations/form-validations"
import { createClient } from "../supabase/server"
import { revalidatePath } from "next/cache"

export async function login(formData:FormData) {

    const supabase  = await createClient()

    const email = formData.get("email") as string
    const emailValidation = emailValidationSchema.safeParse({email})
    if(!emailValidation.success){
        console.log("Invalid email format")
        return
    }

    const {error} = await supabase.auth.signInWithOtp({
        email:email,
        options:{
            shouldCreateUser:true
        }
    })

    if(error){
        console.log("Got error signing in ---->",error)
        revalidatePath("/")
        return {error:error.message}
    }

}

export async function verifyToken(formData:FormData) {

    const supabase  = await createClient()

    const email = formData.get("email") as string
    const token = formData.get("token") as string
    const emailValidation = emailValidationSchema.safeParse({email})
    if(!emailValidation.success){
        console.log("Invalid email format")
        return
    }

    const {data:{session},error} = await supabase.auth.verifyOtp({
        email:email,
        token:token.trim(),
        type:"email"
    })

    if(error){
        console.log("Got error verifying OTP ---->",error)
        return {error:error.message , session:null}
    }
    return {error:null, session}
}

export async function signOut() {
    const supabase = await createClient()
    const {error} = await supabase.auth.signOut()
    if(error){
        console.log("Error signing out",error)
        return {error:error.message}
    }
    revalidatePath("/")
}