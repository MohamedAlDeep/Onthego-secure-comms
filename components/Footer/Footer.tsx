'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation';

import { useCookies } from "next-client-cookies"

export default function Footer(){
    const cookieStore = useCookies()
    const router = useRouter()

    function handleDelete() {
        cookieStore.remove('username')
        cookieStore.remove('uid')        
        console.log("Cookies deleted")
        router.push('/')
    }
    return (
        

        <div className="flex w-full h-20 justify-between bg-slate-800/90  backdrop-blur-sm  items-center px-4 m-1 text-white w-130">    
            <div className="">    
                <a href="/about" className="rounded-[11px] px-5 py-1.5 mx-5 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" >About</a>
                <a href='encrypt' className="rounded-[11px] px-5 py-1.5 mx-5 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" >Feedback</a>
                <a href='decrypt' className="rounded-[11px] px-5 py-1.5 mx-5 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" >Contribute</a>
            </div>
            <Button onClick={handleDelete} className="w-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 ">Dispose</Button>
        </div>
     
    )
}