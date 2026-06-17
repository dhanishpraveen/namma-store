"use client"
import {createOrder} from '@/lib/actions/orders.action'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function VerifyPayCart({reference,amount,email}:{reference:string,amount:number,email:string}) {
    const router = useRouter()
    useEffect(()=>{
        const paymentInfo = JSON.parse(localStorage.getItem("paymentCartInformation") || "{}")
        if(paymentInfo.amount!=amount/100 || paymentInfo.email!=email){
            toast.error("Payment Verification Error",)
        } else {
            toast.success("Payment Verification Successful")
        }
        
        const makeOrder   = async()=> {
            for(let i=0 ; i<paymentInfo.productDetails.length;i++){
                const orderItems = {
                    user_id: paymentInfo.user_id,
                    user_email:  paymentInfo.email,
                    product_name:  paymentInfo.productDetails[i].name,
                    product_category:  paymentInfo.productDetails[i].category.name,
                    amount_paid:  paymentInfo.productDetails[i].price*paymentInfo.productDetails[i].quantity_selected+paymentInfo.productDetails[i].product_shipping_fee,
                    reference_paystack: reference,
                    quantity_bought:  paymentInfo.productDetails[i].quantity_selected,
                    image_url:  paymentInfo.productDetails[i].image_url_array[0],
                    status:"processing",
                    region: paymentInfo.addressDetails.region,
                    state:  paymentInfo.addressDetails.state,
                    city:  paymentInfo.addressDetails.city,
                    address:  paymentInfo.addressDetails.address,
                    phone:  paymentInfo.addressDetails.phone,
                    country_code: paymentInfo.addressDetails.country_code
                }
                const orderId = await createOrder(orderItems)
            }
            localStorage.removeItem("paymentCartInformation")
            localStorage.removeItem("cartInformation")
            setTimeout(()=>router.push('/orders/'),3000)
        }
        makeOrder()
    })
    


  return (
    <div>
        <Toaster/>
        <h1>Verifying Cart Payment</h1>
        <p>Payment Reference : {reference}</p>
        <p>Payment Amount : {amount}</p>
        <p>Customer Email : {email}</p>
    </div>
  )
}

export default VerifyPayCart