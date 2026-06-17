"use client"

import { useAppContext } from "@/context/AppContext";
import { login, verifyToken } from "@/lib/actions/userAuth.action"
import { emailValidationSchema } from "@/lib/zodvalidations/form-validations"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation";
import { useState } from "react"
import toast, { ToastBar, Toaster } from "react-hot-toast"

function LoginUser() {
    const [email,setEmail] = useState("")
    const [loading,setLoading] = useState(false)
    const [tokenPart,setTokenPart] = useState(false)
    const [token,setToken] = useState("")
    const {session,setSession} = useAppContext()
    const router = useRouter()

    const handleLogin = async()=>{
        
        try {
            setLoading(true)
            const emailCheck=  emailValidationSchema.safeParse({email})
            if(!emailCheck.success){
                toast.error("Please enter a valid email address")
                return
            }
            const formData = new FormData()
            formData.append("email",email)
            const loginUser = await login(formData)
            if (loginUser?.error) {
                toast.error(`something went wrong with signing in. ${loginUser.error} `);
                return;
            }
            toast.success("Check your email for the login link!")
            setTokenPart(true)

        } catch (error) {
            toast.error(`Something went wrong.${error}`)
        } finally{
            setLoading(false)
        }
        
    }

    const handleSubmitToken = async()=>{

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("email",email)
            formData.append("token",token)
            const otpVerification = await verifyToken(formData)

            if (otpVerification?.error) {
                toast.error("Invalid token. Please try again.");
                return;
            }
            if (otpVerification?.session) {
                toast.success("You are now logged in!");
                setSession(otpVerification.session);
                router.push("/")
            }
        } catch (error) {
            console.error("Error submitting token : ",error)
        }finally{
            setLoading(false)
        }
    }
  return tokenPart?(
        <div className="bg-black">
            <Toaster/>
            <section className="flex flex-col h-screen items-center justify-center ">
                <h1 className="font-bold text-2xl pb-5 ">Token From Your Email</h1>
                <p className="pb-5">Check the junk/spam mailbox too.</p>
                <input type="text" placeholder="Enter Token" value={token} onChange={(e)=>setToken(e.target.value)} className="h-13 w-80 px-5 text-lg placeholder-gray-600 text-black bg-white rounded" />
                <button className="bg-[darkblue] text-white p-3 rounded-2xl my-10"
                        onClick={handleSubmitToken}>
                            {loading? "Signing in...":"Submit"}
                </button>
            </section>
        </div>
    ):(
        <div className="bg-black">
            <Toaster/>
            <section className="flex flex-col h-screen items-center justify-center ">
                <Link href={"/"}>
                    <h1 className="font-bold text-[30px] pb-5">Namma Store</h1>
                </Link>
                <h1 className="font-bold text-2xl pb-5 ">Please provide your email</h1>
                <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="h-13 w-140 px-5 text-lg placeholder-gray-600 text-black bg-white rounded" />
                <button className="bg-[darkgreen] text-white p-3 rounded-2xl my-10"
                        onClick={handleLogin}>
                    {loading? "Signing In...":"Sign in"}
                </button>
                <p>We sign you up if you don't have an account</p>
            </section>
        </div>
    )
}

export default LoginUser