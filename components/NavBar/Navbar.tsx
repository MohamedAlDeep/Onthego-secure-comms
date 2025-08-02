import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function Navbar(){

    return (
        
        <Card className="w-full w-150  bg-slate-800/90 border-purple-500/20 backdrop-blur-sm border-2 " style={{ borderColor: '#9810FA' }}>
        <div className="flex justify-between items-center px-4 m-1 text-white w-130">    
            <a href="/keys" className="rounded-[11px] px-3 mx-5 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" style={{ borderTop: '2px solid transparent', borderLeft: '2px solid transparent', borderRight: '2px solid transparent', borderBottom: '2px solid #BD2ABA' }}>Keys</a>
            <a href='encrypt' className="rounded-[11px] px-3 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" style={{ borderTop: '2px solid transparent', borderLeft: '2px solid transparent', borderRight: '2px solid transparent', borderBottom: '2px solid #BD2ABA' }}>Encryption</a>
            <a href='decrypt' className="rounded-[11px] px-3 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" style={{ borderTop: '2px solid transparent', borderLeft: '2px solid transparent', borderRight: '2px solid transparent', borderBottom: '2px solid #BD2ABA' }}>Decryption</a>
        </div>
        </Card>
    )
}