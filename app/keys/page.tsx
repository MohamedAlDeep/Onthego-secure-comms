
import {cookies} from 'next/headers'
import { redirect, RedirectType } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Car } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import KeyGeneration from "./KeyGeneration";
import RecipientKeys from "./RecipientKeys";


export default async function Dashboard() {
    const cookieStore = await cookies()
    const username = cookieStore.get('username')
    const uid = cookieStore.get('uid')

    if(!username || !uid) {
        redirect("/", RedirectType.replace)
    }

    return(
         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">

            <Navbar />
                <div className="flex justify-center w-full my-8">
                    <Card className="w-full max-w-xl bg-slate-800/90 border-purple-500/20 backdrop-blur-sm border-2" style={{ borderColor: '#9810FA' }}>
                        <div className="flex justify-center items-center">
                            <h1 className="text-white text-3xl">PGP Key Pairs</h1>
                        </div>
                    </Card>
                </div>

               <div className="flex flex-row justify-center items-start w-full gap-4">
                    <RecipientKeys />
                    <KeyGeneration username={username.value} uid={uid.value} />
                </div>

                

            <Footer />
        </div>
    )

}