import { assets } from '@/public/assets/assets'
import { OrderParams } from '@/shared.dtypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function OrderPage({orderData}:{orderData:OrderParams}) {
  return (
    <div>
        <div className='flex max-md:flex-col justify-center mt-10 gap-15'>
            <div >
                <Image className='bg-gray-500' src={orderData.image_url} alt='product image' width={200} height={200} unoptimized/>
            </div>
            <div className='w-90'>
                <h1 className='text-2xl mb-10'>{orderData.product_name}</h1>
                <p className='text-2xl pb-5 border-b border-b-gray-500'>&#8377;{orderData.amount_paid}</p>
                <table className='my-10'>
                    <tbody>
                        <tr>
                            <td className='pb-2'>Region</td>
                            <td className='pl-10 pb-2 text-gray-400'>{orderData.region}</td>
                        </tr>
                        <tr>
                            <td className='pb-2'>State</td>
                            <td className='pl-10 pb-2 text-gray-400'>{orderData.state}</td>
                        </tr>
                        <tr>
                            <td className='pb-2'>City</td>
                            <td className='pl-10 pb-2 text-gray-400'>{orderData.city}</td>
                        </tr>
                        <tr>
                            <td className='pb-2'>Phone</td>
                            <td className='pl-10 pb-2 text-gray-400'>{orderData.country_code} {orderData.phone}</td>
                        </tr>
                    </tbody>
                </table>
                <p className='mt-6'>Order Status : {orderData.status}</p>
            </div>
        </div>
        <Link href={'/'} className='flex justify-center'>
            <div className='flex border rounded-4xl gap-1 mt-10 bg-white text-black w-52 p-3'>
                <Image src={assets.arrow_right_icon_colored} alt='go back'/>
                <p className='text-lg'>Continue Shopping</p>
            </div>
        </Link>
    </div>
  )
}

export default OrderPage