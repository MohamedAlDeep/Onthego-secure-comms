"use client"
import { useCookies } from "next-client-cookies"
import { useRouter } from 'next/navigation';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Eye, EyeOff, KeyRound } from "lucide-react"
import Link from "next/link"
import { useLocalStorage } from "usehooks-ts"
import { redirect } from "next/dist/server/api-utils"
// import { db } from "./lib"
import FooterAbt from '@/components/Footer/FooterAbt'

export default function Page() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [uid, setUid] = useState("")
  const cookieStore = useCookies()
  // const [valueUsr, setValueUsr, removeValueUsr] = useLocalStorage('username', "")
  // const [valueUid, setValueUid, removeValueUid] = useLocalStorage('uid', "")
  if(!cookieStore.get('username')){
    // setIsLogin(true)
  }else{
    useRouter().push('/dashboard')
  }

  function handleSignUp(){
    console.log("Signing up with:", username, uid)
    cookieStore.set('username', username)
    cookieStore.set('uid', uid)
    
  }


  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>
      
      
        <Card className="w-full max-w-md bg-slate-800/90 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">OnTheGo</CardTitle>
              <CardDescription className="text-purple-200">Secure PGP encryption on the go</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? "login" : "signup"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                <TabsTrigger value="login" onClick={() => setIsLogin(true)} className="data-[state=active]:bg-purple-600">
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  onClick={() => setIsLogin(false)}
                  className="data-[state=active]:bg-purple-600"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-purple-200">
                    Username
                  </Label>
                  <Input
                    id="email"
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="anonymous_user"
                    className="bg-slate-700/50 border-purple-500/30 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-purple-200">
                    UID
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Unique Identifier, don't share"
                      id="password"
                      onChange={(e) => setUid(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      className="bg-slate-700/50 border-purple-500/30 text-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Link href="/dashboard">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <KeyRound className="w-4 h-4 mr-2" />
                    Enter Secure Zone
                  </Button>
                </Link>
              </TabsContent>
              <TabsContent value="signup" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-purple-200">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="anonymous_user"
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-slate-700/50 border-purple-500/30 text-white placeholder:text-slate-400"
                  />
                </div>
      
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-purple-200">
                    UID
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Unique Identifier, save it, and don't share it"
                      className="bg-slate-700/50 border-purple-500/30 text-white pr-10"
                      onChange={(e) => setUid(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button onClick={() => handleSignUp()} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Shield className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
            <div className="mt-6 text-center text-sm text-purple-300">
              <p>🧅 Your privacy is our priority</p>
            </div>
          </CardContent>
        </Card>
      </div>
        <FooterAbt/>
      
    </div>
  );
}
