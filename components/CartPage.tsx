"use client"

import { useAppContext } from '@/context/AppContext';
import { assets } from '@/public/assets/assets';
import { AddressParams } from '@/shared.dtypes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { productsParams } from './HomeProducts';
import { fetchAddresses } from '@/lib/actions/address.action';
import Navbar from './Navbar';
import { PayStackParams } from '@/app/api/payment/route';

function CartPage() {
    const router = useRouter()
    const {session} = useAppContext()
    const [isDropDown,setIsDropDown] = useState(false)
    const [address,setAddress] = useState<AddressParams>()
    const [selectedAddress,setSelectedAddress] = useState(false)
    const [products,setProducts] = useState<productsParams[]>([])
    const [addressList,setAddressList] = useState<AddressParams[]>([])
    const [shippingFee,setShippingFee] = useState(0)
    const [total,setTotal] = useState(0)
    useEffect(()=>{
        fetchProductsData()
        fetchAddressData()
    },[])
    function fetchProductsData(){
        const datas =JSON.parse(localStorage.getItem("cartInformation") || "[]")
        datas.map((data:productsParams)=>(
            data.quantity_selected = 1
        ))
        setProducts(datas)
        calculateShippingFee(datas)
    }

    async function fetchAddressData(){
        const addressData:AddressParams[] = await fetchAddresses()
        setAddressList(addressData)
    }

    function calculateShippingFee(datas:productsParams[]){
        let fee = 0
        for (const product of datas){
            fee += product.product_shipping_fee
        }
        setShippingFee(fee)
    }
    
    useEffect(()=>{
        function calculateTotal(){
            let cost= 0
            console.log(products)
            for (const product of products){
                cost+= (product.price*product.quantity_selected)
            }
            const total = cost+shippingFee
            setTotal(total)
        }
        calculateTotal()
    },[products])

    function decreaseQTY(index: number) {
        if (products[index].quantity_selected === 1) {
            toast.error("Quantity cannot be less than 1")
            return
        }
        setProducts(prev =>
            prev.map((item, i) => {
                if (i !== index) return item

                return {
                    ...item,
                    quantity_selected: item.quantity_selected - 1,
                }
            })
        )
        
    }

    function increaseQTY(index: number) {
        setProducts(prevProducts =>
            prevProducts.map((item, i) => {
                if (i !== index) return item

                return {
                    ...item,
                    quantity_selected: item.quantity_selected + 1,
                }
            })
        )
    }

    function  handleRemoveProduct(productId:string){
        const existingData = JSON.parse(localStorage.getItem("cartInformation")||"[]")
        const newData = []
        for(const data of existingData){
            if(!(data.id === productId)){
                data.quantity_selected=1
                newData.push(data)
            }
        }
        localStorage.setItem("cartInformation",JSON.stringify(newData))
        setProducts(newData)
        calculateShippingFee(newData)
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
                        amount:total*100,
                        source:"cart"
                    })
                })
                const paystackResult:PayStackParams = await response.json()
                if(paystackResult.status){
                    localStorage.setItem("paymentCartInformation",JSON.stringify({
                        user_id:session?.user.id ,
                        email:session?.user.email,
                        productDetails:products,
                        addressDetails:address,
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
        <Navbar/>
        <div className='m-10 flex max-md:flex-col lg:justify-center gap-10 '>
            <div className='w-fit'>
                <div className='flex justify-between border-b border-b-gray-500 mb-10'>
                    <h1 className='pb-5 mb-5 text-2xl'>Your Cart</h1>
                    <p>{products.length} Items</p>
                </div>
                {products.length>0 &&

                    <table>
                        <thead>
                            <tr className='*:pb-4'>
                                <th>Products Details</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product:productsParams,index:any)=>(
                                <tr key={index}>
                                    <td className='px-5 py-2'>
                                        <div className="flex items-center gap-2">
                                            <Image src={product.image_url_array[0]} width={70} height={70} className='w-20 h-auto bg-gray-500 rounded-lg' alt={`${product.name}`} loading='eager' unoptimized />
                                            <div className='flex flex-col gap-1'>
                                                <p className='pl-1 w-33'>{product.name}</p>
                                                <button onClick={()=>handleRemoveProduct(product.id)} className='border w-fit p-1 rounded-lg bg-gray-900'>Remove</button>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className='px-3'>&#8377;{product.price}</td>
                                    <td className='px-3'>
                                        <div className="flex">
                                            <button onClick={()=>decreaseQTY(index)}>
                                                <Image src={assets.decrease_arrow} alt='low' />
                                            </button>
                                            <input type="text" className='w-8 mx-1  text-center border rounded-lg' value={product.quantity_selected??1} readOnly />
                                            <button onClick={()=>increaseQTY(index)}>
                                                <Image src={assets.increase_arrow} alt='high'/>
                                            </button>
                                        </div>
                                    </td>
                                    <td>&#8377;{product.price*product.quantity_selected}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                <Link href={"/"}>
                    <div className='flex  border rounded-4xl gap-1 mt-10 bg-white text-black w-52 p-3'>
                        <Image src={assets.arrow_right_icon_colored} alt='go back' className='w-6 h-auto'/>
                        <p className='text-lg'>Continue Shopping</p>
                    </div>
                </Link>
            </div>
            {products.length>0 &&
                <div className='p-3 bg-mauve-900 w-fit'>   
                    <h1 className='text-[15px] pb-6'>Order Summary</h1>
                    <div className='border py-3 px-5'>
                        <h1 className='font-bold text-gray-400 pb-2'>SELECT ADDRESS</h1>
                        <div className='flex justify-between gap-10 relative w-full border p-2'>
                            <input className='flex-1' placeholder='Select Address' value={`${address? `${address?.address}, ${address?.city}`: ""}`} readOnly/>
                            <button className={`text-2xl ${isDropDown?"rotate-90":"rotate-0"}`} onClick={()=>setIsDropDown((prev)=>!prev)}>&gt;</button>
                            {isDropDown && 
                                <div className='absolute top-12 right-0  w-full border bg-gray-900  '>
                                    {addressList && addressList.map((address,index)=>(
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
                            <p>&#8377;{shippingFee}</p>
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
            }
        </div> 
    </div>
  )
}

export default CartPage