"use client"

import React, { useState } from 'react'
import { productsParams } from './HomeProducts'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { useAppContext } from '@/context/AppContext'
import { PayStackParams } from '@/app/api/payment/route'
import { useRouter } from 'next/navigation'
import { AddressParams } from '@/shared.dtypes'

function BuyNowPage({product,addresses}:{product:productsParams,addresses:AddressParams[]}) {
    const router = useRouter()
    const {session} = useAppContext()
    const [quantity,setQuantity] = useState(1)
    const [isDropDown,setIsDropDown] = useState(false)
    const [address,setAddress] = useState<AddressParams>()
    const [selectedAddress,setSelectedAddress] = useState(false)
    const addressList=addresses
    const total = (product.price*quantity) + product.product_shipping_fee
    function decreaseQTY(){
        if(quantity===1){
            toast.error("Quantity cannot be less than 1")
            return
        }
        setQuantity((prev)=>prev-1)
    }

    function increaseQTY(){
        setQuantity((prev)=>prev+1)
    }

    async function payNow(){
        try {
                const response =await fetch('/api/payment',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email:session?.user.email,
                        amount:total*100 ,
                        source:"buy-now"
                    })
                })
                const paystackResult:PayStackParams = await response.json()
                if(paystackResult.status){
                    localStorage.setItem("paymentInformation",JSON.stringify({
                        user_id:session?.user.id ,
                        email:session?.user.email,
                        productDetails:product,
                        addressDetails:address,
                        quantity,
                        amount:total
                    }))
                    console.log(paystackResult)
                    router.push(paystackResult.data.authorization_url)
                }
        } catch (error) {
            console.log("Payment Error:",error)
            toast.error("Payment failed.Please try again.")
        } finally {
            console.log("Payment Processed")
        }
    }
  return (
    <div>
        <Toaster/>
        <div className='m-10 flex max-md:flex-col lg:justify-center gap-10 '>
            <div className='w-fit'>
                <h1 className='border-b border-b-gray-500 pb-5 mb-5 text-2xl'>The Product To Buy</h1>
                <table>
                    <thead>
                        <tr className='*:pb-4'>
                            <th>Product Details</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='px-5'>
                                <div className="flex items-center">
                                    <Image src={product.image_url_array[0]} width={70} height={70} className='w-20 h-auto bg-gray-500 rounded-lg' alt={`${product.name}`} loading='eager' unoptimized />
                                    <p className='pl-1 w-10'>{product.name}</p>
                                </div>
                            </td>
                            
                            <td className='px-3'>&#8377;{product.price}</td>
                            <td className='px-3'>
                                <div className="flex">
                                    <button onClick={decreaseQTY}>
                                        <Image src={assets.decrease_arrow} alt='low' />
                                    </button>
                                    <input type="text" className='w-8 mx-1  text-center border rounded-lg' value={quantity} readOnly />
                                    <button onClick={increaseQTY}>
                                        <Image src={assets.increase_arrow} alt='high'/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Link href={`/product/${product.id}`}>
                    <div className='flex  border rounded-4xl gap-1 mt-10 bg-white text-black w-52 p-3'>
                        <Image src={assets.arrow_right_icon_colored} alt='go back'/>
                        <p className='text-lg'>Continue Shopping</p>
                    </div>
                </Link>
            </div>
            <div className='p-3 bg-mauve-900 w-fit'>   
                <h1 className='text-[15px] pb-6'>Order Summary</h1>
                <div className='border py-3 px-5'>
                    <h1 className='font-bold text-gray-400 pb-2'>SELECT ADDRESS</h1>
                    <div className='flex justify-between gap-10 relative w-full border p-2'>
                        <input className='flex-1' placeholder='Select Address' value={`${address? `${address?.address}, ${address?.city}`: ""}`} readOnly/>
                        <button className={`text-2xl ${isDropDown?"rotate-90":"rotate-0"}`} onClick={()=>setIsDropDown((prev)=>!prev)}>&gt;</button>
                        {isDropDown && 
                            <div className='absolute top-12 right-0  w-full border bg-gray-900  '>
                                {addressList.map((address,index)=>(
                                    <div className='p-2 hover:bg-gray-700 border-b border-b-gray-600 cursor-pointer' key={index} onClick={()=>{setAddress(address);setIsDropDown(false);setSelectedAddress(true)}}>{address.address}, {address.city}</div>
                                ))}
                                <Link href={'/address'} className='flex justify-center py-3 hover:bg-gray-700'>
                                    + Add New Address
                                </Link>
                            </div>
                        }
                    </div>

                    <h1 className='font-bold text-gray-400 py-2'>PROMO CODE</h1>
                    <input type="text" className='w-full border p-3' placeholder='Enter promo code'/>
                    <button className='my-3 py-2 px-10 bg-black '>Apply</button>
                    <div className='flex justify-between py-1 mt-1 border-t border-t-gray-500'>
                        <p>Shipping Fee</p>
                        <p>&#8377;{product.product_shipping_fee}</p>
                    </div>
                    <div className='flex justify-between py-1 border-t border-t-gray-500'>
                        <p>Product price</p>
                        <p>&#8377;{product.price * quantity}</p>
                    </div>
                    <div className='flex justify-between font-extrabold py-1 border-t border-b border-b-gray-500 border-t-gray-500'>
                        <p>Total</p>
                        <p>&#8377;{total}</p>
                    </div>
                    {selectedAddress? 
                        <button onClick={payNow} className='bg-black w-full py-2 my-5 hover:bg-gray-700'>
                            Pay Now    
                        </button>:
                        <p className='text-center my-5'>**Please Select An Address To Continue</p>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default BuyNowPage