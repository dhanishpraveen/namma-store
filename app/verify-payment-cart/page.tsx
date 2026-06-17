import VerifyPayCart from "@/components/VerifyPayCart"
import { checkOrder } from "@/lib/actions/orders.action"
import { redirect } from "next/navigation"

export default async function verifyPayment({searchParams}:{searchParams:Promise<{[key:string]:string}>}){
    const {reference} =await searchParams

    const orderExist = await checkOrder(reference)
    if(orderExist && orderExist.length>0){
        redirect("/")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/verifyPayment/${reference}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json" 
        }
    })
    const result = await response.json()
    console.log(result)
    return <VerifyPayCart reference={reference} amount={result.data.amount} email={result.data.customer.email}/>
}