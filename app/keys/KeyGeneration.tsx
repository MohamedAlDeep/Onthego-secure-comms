"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateKeys } from "@/app/lib/openpgp";
import { useCookies } from "next-client-cookies";

interface KeyGenerationProps {
    username: string;
    uid: string;
}

export default function KeyGeneration({ username, uid }: KeyGenerationProps) {
    const [publicKey, setPublicKey] = useState<string>("");
    const [privateKey, setPrivateKey] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);
    const cookies = useCookies();

   
    useEffect(() => {
        const storedPublicKey = localStorage.getItem('publicKey');
        const storedPrivateKey = localStorage.getItem('privateKey');
        
        if (storedPublicKey) {
            setPublicKey(storedPublicKey);
        }
        if (storedPrivateKey) {
            setPrivateKey(storedPrivateKey);
        }
    }, []);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const passphrase = uid;
            const { privateKey: newPrivateKey, publicKey: newPublicKey, revocationCertificate } = await generateKeys(username, passphrase);
            
            setPrivateKey(newPrivateKey);
            setPublicKey(newPublicKey);
            
           
            localStorage.setItem('privateKey', newPrivateKey);
            localStorage.setItem('publicKey', newPublicKey);
            localStorage.setItem('revocationCertificate', revocationCertificate);
            cookies.set('privateKey', newPrivateKey);
            cookies.set('publicKey', newPublicKey);
            
            console.log("Keys Generated successfully!");
        } catch (error) {
            console.error("Error generating keys:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleClearKeys = () => {
        setPrivateKey("");
        setPublicKey("");
        localStorage.removeItem('privateKey');
        localStorage.removeItem('publicKey');
        localStorage.removeItem('revocationCertificate');
        cookies.remove('privateKey');
        cookies.remove('publicKey');
        console.log("Keys cleared successfully!");
    };

    const copyToClipboard = (text: string, keyType: string) => {
        navigator.clipboard.writeText(text);
        console.log(`${keyType} copied to clipboard!`);
    };

    return (
        <Card className="bg-slate-800/90 w-full max-w-3xl border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
            <h1 className="flex justify-center items-center text-2xl font-bold mb-4">
                Generate your key pairs
                {(publicKey && privateKey) && (
                    <span className="ml-2 text-green-400 text-sm">✓ Keys Generated</span>
                )}
            </h1>
            <div>
                <Card className="bg-purple-500/20 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                    <div className="flex items-center justify-between">
                        <p>Public Key</p>
                        <div className="flex gap-2">
                            {publicKey ? (
                                <>
                                    <Button 
                                        onClick={() => copyToClipboard(publicKey, "Public Key")}
                                        className="w-20 bg-green-600 hover:bg-green-700 text-xs"
                                    >
                                        Copy
                                    </Button>
                                    <textarea 
                                        value={publicKey} 
                                        readOnly 
                                        className="w-60 h-20 bg-gray-700 text-white text-xs p-2 resize-none rounded"
                                    />
                                </>
                            ) : (
                                <Button className="w-40 bg-purple-500 hover:bg-pink-700" disabled>
                                    Not Generated
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
                <Card className="bg-purple-500/20 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                    <div className="flex items-center justify-between">
                        <p>Private Key</p>
                        <div className="flex gap-2">
                            {privateKey ? (
                                <>
                                    <Button 
                                        onClick={() => copyToClipboard(privateKey, "Private Key")}
                                        className="w-20 bg-green-600 hover:bg-green-700 text-xs"
                                    >
                                        Copy
                                    </Button>
                                    <textarea 
                                        value={privateKey} 
                                        readOnly 
                                        className="w-60 h-20 bg-gray-700 text-white text-xs p-2 resize-none rounded"
                                    />
                                </>
                            ) : (
                                <Button className="w-40 bg-purple-500 hover:bg-pink-700" disabled>
                                    Not Generated
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
                <div className="flex justify-end gap-2">
                    {(publicKey && privateKey) && (
                        <Button 
                            onClick={handleClearKeys}
                            className="w-32 bg-red-600 hover:bg-red-700 m-5"
                        >
                            Clear Keys
                        </Button>
                    )}
                    <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 m-5"
                    >
                        {isGenerating ? "Generating..." : (publicKey && privateKey) ? "Regenerate" : "Generate"}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
