
import {cookies} from 'next/headers'
import { redirect, RedirectType } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Car } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";

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
                    <Card className="bg-slate-800/90 w-full max-w-3xl border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                        <h1 className="flex justify-center items-center text-2xl font-bold mb-4">Add recipient public keys</h1>
                        <Card className="h-45 bg-purple-500/20  border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                                <div className="flex items-center justify-between ">
                                   <textarea className='h-40 w-140 m-0 border-0' name="" id="" placeholder='Enter recipient public key here'></textarea>
                                </div>
                        </Card>
                        <div className="flex justify-end">
                            <Button className="w-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 m-5">
                                Add Recipient
                            </Button>
                        </div>
                    </Card>
                    <Card className="bg-slate-800/90 w-full max-w-3xl border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                        <h1 className="flex justify-center items-center text-2xl font-bold mb-4">Generate your key pairs</h1>
                        <div>
                            <Card className="bg-purple-500/20  border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                                <div className="flex items-center justify-between">
                                    <p>Public Key</p>
                                    <Button className="w-40 bg-purple-500 hover:to-pink-700">Content</Button>
                                </div>
                            </Card>
                            <Card className="bg-purple-500/20  border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                                <div className="flex items-center justify-between ">
                                    <p>Private Key</p>
                                    <Button className="w-40 bg-purple-500  hover:to-pink-700 ">Content</Button>
                                </div>
                            </Card>
                                <div className="flex justify-end">
                                    <Button className="w-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 m-5">
                                        Generate
                                    </Button>
                                </div>
                        </div>
                    </Card>
                </div>

                

            <Footer />
        </div>
    )

}