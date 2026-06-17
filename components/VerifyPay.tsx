"use client"
import {createOrder} from '@/lib/actions/orders.action'
import { CreateOrder } from '@/shared.dtypes'
import { parseUseCacheCacheStore } from 'next/dist/server/resume-data-cache/cache-store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function VerifyPay({reference,amount,email}:{reference:string,amount:number,email:string}) {
    const router = useRouter()
    useEffect(()=>{
        const paymentInfo = JSON.parse(localStorage.getItem("paymentInformation") || "{}")
        if(paymentInfo.amount!=amount/100 || paymentInfo.email!=email){
            toast.error("Payment Verification Error")
        } else {
            toast.success("Payment Verification Successful")
        }
        
        const makeOrder   = async()=> {
            const localStorageItems = JSON.parse(localStorage.getItem("paymentInformation")||"{}")
            const orderItems = {
                user_id:localStorageItems.user_id,
                user_email: localStorageItems.email,
                product_name: localStorageItems.productDetails.name,
                product_category: localStorageItems.productDetails.category.name,
                amount_paid: localStorageItems.amount,
                reference_paystack: reference,
                quantity_bought: localStorageItems.quantity,
                image_url: localStorageItems.productDetails.image_url_array[0],
                status:"processing",
                region:localStorageItems.addressDetails.region,
                state: localStorageItems.addressDetails.state,
                city: localStorageItems.addressDetails.city,
                address: localStorageItems.addressDetails.address,
                phone: localStorageItems.addressDetails.phone,
                country_code:localStorageItems.addressDetails.country_code
            }
            const orderId = await createOrder(orderItems)
            localStorage.removeItem("paymentInformation")
            setTimeout(()=>router.push(`/order/${orderId}`),3000)
        }
        makeOrder()
    
    })
    


  return (
    <div>
        <Toaster/>
        <h1>Verifying Payment</h1>
        <p>Payment Reference : {reference}</p>
        <p>Payment Amount : {amount}</p>
        <p>Customer Email : {email}</p>
    </div>
  )
}

export default VerifyPay