"use client"

import {  saveAddressDB } from '@/lib/actions/address.action'
import { assets } from '@/public/assets/assets'
import { Region } from '@/shared.dtypes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function NewAddress() {

    const router = useRouter()
    const [isDropDown,setIsDropDown] = useState(false)
    const [address,setAddress] = useState("") 
    const [city,setCity] = useState("")
    const [state,setState] = useState("")
    const [phone,setPhone] = useState("")
    const [selectedRegion,setSelectedRegion] = useState<Region>()
    const isAllFilled =
        address.trim() !== "" &&
        city.trim() !== "" &&
        state.trim() !== "" &&
        phone.trim() !== "" &&
        !!selectedRegion
    const regionList:Region[] = [{
        country:"India",
        code:"+91"
    },{
        country:"Canada",
        code:"+1"
    }]

    async function handleSaveAddress(){
        if(!isAllFilled){
            toast.error("All Fields Must Be Filled To Continue")
            return
        }
        try {
                const newAddress ={
                    selectedRegion,
                    address,
                    city,
                    state,
                    phone
                }
        
                const result = await saveAddressDB(newAddress)
                if(!result.success){
                    toast.error("Error occured saving address to DB.Please try again.")
                    return
                }
                toast.success("Address Added Successfully")
                router.back()  
        } catch (error) {
            console.log("Error saving address",error)
        }
    }

  return (
    <div className='m-10 flex items-center gap-20 lg:justify-center'>
        <Toaster/>
        <div className='flex flex-col gap-5 w-[50%] lg:w-[30%]'>
            <h1 className='text-4xl mb-10'>Add Shipping Address</h1>
            <div className='flex relative'>
                <button className='border p-3 w-35'>{selectedRegion? selectedRegion.country : "Country/Region"}</button>
                <p className="border flex justify-center p-3" onClick={()=>setIsDropDown((prev)=>!prev)}>
                    <Image src={assets.arrow_icon_white} alt='Arrow' className={`${isDropDown? "rotate-90 transition-transform": "rotate-0 transition-transform" }`} />
                </p>
                {isDropDown && (
                    <div className='absolute bg-gray-800 text-center py-1 top-full w-46'>
                        {regionList.map((region,index)=>(
                            <p key={index} className='p-1 cursor-pointer' onClick={()=>{setSelectedRegion(region);setIsDropDown(false)}}>{region.country}</p>
                        ))}
                    </div>
                )}
            </div>
            <textarea
                placeholder="Full Address e.g No 49, Perumal Kovil St, Anna Nagar"
                className="border p-3 rounded  resize-none h-30"
                onChange={(e)=>setAddress(e.target.value)}
            />
            <input type="text" placeholder='City e.g Chennai' 
                   className='border p-3 rounded'
                   onChange={(e)=>setCity(e.target.value)}
            />
            <input type="text" placeholder='State e.g Tamil Nadu' 
                   className='border p-3 rounded'
                   onChange={(e)=>setState(e.target.value)}
            />
            <div className='flex items-center'>
                <p className='border p-3 w-32 text-center rounded-l'>{selectedRegion? selectedRegion.code : "Select Region"}</p>
                <input type="phone" placeholder='Phone  Number' 
                       className='border p-3 rounded-r'
                       onChange={(e)=>setPhone(e.target.value)}
                />
            </div>
            <p><span className='text-red-600'>***</span>All Fields Must Be Filled To Continue <span className='text-red-600'>***</span></p>
            <button className={`border py-4 rounded bg-gray-700 ${isAllFilled? "bg-white text-black" : "bg-gray-700" }`} onClick={handleSaveAddress}>SAVE ADDRESS</button>
        </div>
        <div>
            <Image className='max-md:hidden md:w-80 lg:w-100' src={assets.my_location_image} alt='Location Image'/>
        </div>
    </div>
  )
}

export default NewAddress