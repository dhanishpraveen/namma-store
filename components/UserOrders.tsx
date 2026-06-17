import { OrderParams } from '@/shared.dtypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function UserOrders({userOrders}:{userOrders:OrderParams[]}) {
  return (
    <div className='m-10'>
        <h1 className='text-2xl pb-10 w-full border-b border-b-gray-600'>My Orders</h1>
        {userOrders.map((order,index)=>(
            <div key={index} className='flex max-md:flex-col gap-6 border-b border-b-gray-600 py-10'>
                <div>
                    <Image src={order.image_url} alt='product image' width={50} height={50} unoptimized />
                </div>
                <div className='w-30'>
                    <p>{order.product_name}</p>
                    <p>Items : {order.quantity_bought}</p>
                </div>
                <div>
                    <p>{order.region}</p>
                    <p>{order.address}</p>
                    <p>{order.city}, {order.state}</p>
                    <p>{order.country_code} {order.phone}</p>
                </div>
                <div>
                    <p>Amount paid</p>
                    <p>&#8377;{order.amount_paid}</p>
                </div>
                <div>
                    <p>Date: {order.created_at}</p>
                    <p>Status: {order.status}</p>
                    <Link href={`/order/${order.id}`}>
                        <button className='border rounded-lg p-1 cursor-pointer'>View</button>
                    </Link>
                </div>
            </div>
        ))}
    </div>
  )
}

export default UserOrders