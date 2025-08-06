import Footer from '@/components/Footer/FooterAbt'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function about(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <div className="flex justify-center">
                        <Card className="bg-slate-800/90 w-310 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 mb-8" style={{ borderColor: '#9810FA' }}>
                            <h1 className="text-4xl font-bold">Security Information</h1>
                            <p>This project is made wiht NextJs which runs on NodeJS, compiled and hosted on Functionless Vercel Hosting.
                                I utilized the "OpenPGP" node library in making this web app alive, using RSA algorithm and implementing encrypting with signiture verification,
                                the web app doesn't manupilate any data or functions related to the Key pair Generation/Encryption/Decryption functions 
                                they are all implemented on the client side, which means you get the responsibility for security.    
                            </p>
                            <h1 className="text-3xl font-bold">Key Considerations</h1>
                            <p>As secure as you browser! this project utilizes browser cookies and local storage, you can check for the data yourself,
                                This means if a website executed malicous code on your browser it can access the data and your private key will be compromised.
                            </p>
                            <h1 className="text-3xl font-bold">Recommendation</h1>
                            <p>
                            It is highly recommended to open this website on a separate browser process, and not engage with any activities on that separate process,
                              
                            </p>
                        </Card>
                    </div>
            <Footer/>
        </div>
    )
}