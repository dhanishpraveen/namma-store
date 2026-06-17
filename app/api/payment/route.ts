import { NextResponse } from "next/server"

export interface PayStackParams{
    status:boolean,
    message:string,
    data:{
        authorization_url:string,
        access_code:string,
        reference:string
    }
}

export async function POST(request:Request){
    try {
        console.log('Payment API Request Received')
        const {email,amount,source} = await request.json()
        const response = await fetch("https://api.paystack.co/transaction/initialize",{
            method:"POST",
            headers:{
                Authorization:"Bearer sk_test_f9e163d48f7928f9a4c24ec8d99c407991ce03d6 ",
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({
                email,amount,callback_url: source==="buy-now"?`${process.env.NEXT_PUBLIC_SITE_URL}/verify-payment`:`${process.env.NEXT_PUBLIC_SITE_URL}/verify-payment-cart`
            })
        })

        if(!response.ok){
            console.log("Failed response.statusText from Paystack :",response.statusText)
            console.log("Failed response from Paystack:",response)
            return NextResponse.json(
                {error:"Failed to initialize Paystack transaction",
                status:response.status}
            )
        }
        const result:PayStackParams = await response.json()
        console.log("Paystack Initialization Result : ",result)
        return NextResponse.json(result)
    } catch (error) {
        console.log('Payment API Error',error)
        return NextResponse.json({error:'Internal Server Error',status:500})
    } finally{
        console.log('Payment API Request Processed')
    }
}