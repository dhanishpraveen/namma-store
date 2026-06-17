import Navbar from '@/components/Navbar'
import OrderPage from '@/components/OrderPage'
import { fetchOrderById } from '@/lib/actions/orders.action'
import React from 'react'

async function Order({params}:{params:Promise<{orderId:string}>}) {
    const {orderId} = await params
    const orderData = await fetchOrderById(orderId)
  return (
    <div>
        <Navbar/>
        <OrderPage orderData={orderData} />
    </div>
  )
}

export default Order