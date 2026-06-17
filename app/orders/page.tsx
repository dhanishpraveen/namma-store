import Navbar from '@/components/Navbar'
import UserOrders from '@/components/UserOrders'
import { fetchUserOrders } from '@/lib/actions/orders.action'
import React from 'react'

async function Orders() {
    const userOrders = await fetchUserOrders()
  return (
    <div>
        <Navbar/>
        <UserOrders userOrders={userOrders}/>
    </div>
  )
}

export default Orders