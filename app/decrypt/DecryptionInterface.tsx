"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { decryptMessage } from "@/app/lib/openpgp";

export default function DecryptionInterface() {
    const [encryptedMessage, setEncryptedMessage] = useState<string>("");
    const [decryptedMessage, setDecryptedMessage] = useState<string>("");
    const [passphrase, setPassphrase] = useState<string>("");
    const [privateKey, setPrivateKey] = useState<string>("");
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [hasPrivateKey, setHasPrivateKey] = useState(false);

   
    useEffect(() => {
        const storedPrivateKey = localStorage.getItem('privateKey');
        const storedUID = localStorage.getItem('uid') || document.cookie
            .split('; ')
            .find(row => row.startsWith('uid='))
            ?.split('=')[1];
            
        if (storedPrivateKey) {
            setPrivateKey(storedPrivateKey);
            setHasPrivateKey(true);
        }
        
        if (storedUID) {
            setPassphrase(storedUID);
        }
    }, []);

    const handleDecrypt = async () => {
        if (!encryptedMessage.trim()) {
            alert("Please enter an encrypted message");
            return;
        }

        if (!privateKey) {
            alert("No private key found. Please generate keys first in the Keys section.");
            return;
        }

        if (!passphrase.trim()) {
            alert("No UID found. Please log out and log back in.");
            return;
        }

        
        if (!encryptedMessage.includes('-----BEGIN PGP MESSAGE-----')) {
            alert("Please enter a valid PGP encrypted message");
            return;
        }

        setIsDecrypting(true);
        try {
            console.log("Starting decryption...");
            console.log("Passphrase (UID):", passphrase);
            console.log("Has private key:", !!privateKey);
            
            const decrypted = await decryptMessage(privateKey, passphrase, encryptedMessage);
            setDecryptedMessage(decrypted);
            console.log("Message decrypted successfully!");
        } catch (error) {
            console.error("Error decrypting message:", error);
            
           
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            if (errorMessage.includes('incorrect key passphrase') || errorMessage.includes('incorrect passphrase')) {
                alert("Incorrect passphrase. Please check your UID.");
            } else if (errorMessage.includes('key not found') || errorMessage.includes('no key')) {
                alert("The message was not encrypted for your key.");
            } else {
                alert(`Error decrypting message: ${errorMessage}`);
            }
        } finally {
            setIsDecrypting(false);
        }
    };

    const handleCopy = () => {
        if (decryptedMessage) {
            navigator.clipboard.writeText(decryptedMessage);
            console.log("Decrypted message copied to clipboard!");
        }
    };

    const handleClear = () => {
        setEncryptedMessage("");
        setDecryptedMessage("");
    };

    return (
        <div className="flex flex-row justify-center items-start w-full gap-4">
         
            <Card className="bg-slate-800/90 w-full max-w-3xl border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                <h1 className="flex justify-center items-center text-2xl font-bold mb-4">Cipher</h1>
                
                {!hasPrivateKey && (
                    <div className="mb-4 p-3 bg-red-600/20 border border-red-600/30 rounded">
                        <p className="text-red-200 text-sm">
                            No private key found. Please generate your key pair in the Keys section first.
                        </p>
                    </div>
                )}

                {hasPrivateKey && (
                    <div className="mb-4 p-3 bg-green-600/20 border border-green-600/30 rounded">
                        <p className="text-green-200 text-sm">
                            ✓ Private key and passphrase loaded from storage
                        </p>
                    </div>
                )}

                <Card className="h-45 bg-purple-500/20 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                    <div className="flex items-center justify-between">
                        <textarea 
                            className='h-40 w-full m-0 border-0 bg-transparent text-white resize-none outline-none' 
                            value={encryptedMessage}
                            onChange={(e) => setEncryptedMessage(e.target.value)}
                            placeholder='Paste encrypted PGP message here'
                        />
                    </div>
                </Card>
                <div className="flex justify-end gap-2">
                    <Button 
                        onClick={handleClear}
                        className="w-32 bg-gray-600 hover:bg-gray-700 m-5"
                    >
                        Clear
                    </Button>
                    <Button 
                        onClick={handleDecrypt}
                        disabled={isDecrypting || !hasPrivateKey}
                        className="w-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 m-5"
                    >
                        {isDecrypting ? "Decrypting..." : "Decrypt"}
                    </Button>
                </div>
            </Card>

           
            <Card className="bg-slate-800/90 w-full max-w-3xl border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                <h1 className="flex justify-center items-center text-2xl font-bold mb-4">
                    Message
                    {decryptedMessage && (
                        <span className="ml-2 text-green-400 text-sm">✓ Decrypted</span>
                    )}
                </h1>
                <div>
                    <Card className="h-45 bg-purple-500/20 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                        <div className="flex items-center justify-between">
                            <textarea 
                                className='h-40 w-full m-0 border-0 bg-transparent text-white resize-none outline-none' 
                                value={decryptedMessage}
                                readOnly
                                placeholder='Decrypted message will appear here'
                            />
                        </div>
                    </Card>
                    <div className="flex justify-end">
                        <Button 
                            onClick={handleCopy}
                            disabled={!decryptedMessage}
                            className="w-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 m-5"
                        >
                            Copy
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
