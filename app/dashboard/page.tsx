import { useLocalStorage } from "usehooks-ts"
// import { useCookies } from "next-client-cookies"
import {cookies} from 'next/headers'
import { redirect, RedirectType } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";

export default async function Dashboard() {
    const cookieStore = await cookies()
    const username = cookieStore.get('username')
    const uid = cookieStore.get('uid')
    if(!username || !uid) {
        redirect("/", RedirectType.replace)
    }

    return(
         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            
            {/* <p>Welcome, {username}!</p>
            <p>Your UID is: {uid}</p> */}
            <Navbar />
                <div className="grid grid-rows-2 gap-8 " >
                    <div className="flex justify-center mt-8 ">
                        <Card className="bg-slate-800/90 w-230 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                            <h1 className="text-4xl font-bold">OnTheGo Secure Communication</h1>
                            <p>This is one-stop End to End (PGP) encryption web app for easy, fast reliable encryption service without need for complicated setup steps and no server logging on the backend. It is all on your client, It is all OPEN SOURCE.  </p>
                        </Card>
                        <Card className="bg-slate-800/90 w-70 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                            <h1 className="text-2xl">Credentials</h1>
                            <p>Username: {username?.value}</p>
                            <p>UID: {uid?.value}</p>
                        </Card>
                    </div>
                    <div className="flex justify-center">
                        <Card className="bg-slate-800/90 w-310 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 mb-8" style={{ borderColor: '#9810FA' }}>
                            <h1 className="text-4xl font-bold">Why use this?</h1>
                            <p>If you are in need for privacy or someone who is targeted on the internet, maybe you are just interested in having great security, this web app helps you, instead of trusting closed source social media apps or famous chat apps who claim they are having E2E encryption while they do they you are actually connecting to their server who takes your data as privelage, you can trust this freedom of open source development, and make your own security. </p>
                        </Card>
                    </div>
                </div>
            <Footer />
        </div>
    )

}