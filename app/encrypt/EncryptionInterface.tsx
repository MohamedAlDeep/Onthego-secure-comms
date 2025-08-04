"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { encryptMessageForRecipients, getSavedRecipientKeys } from "@/app/lib/openpgp";

interface RecipientKey {
    id: string;
    name: string;
    publicKey: string;
    dateAdded: string;
}

export default function EncryptionInterface() {
    const [message, setMessage] = useState<string>("");
    const [encryptedMessage, setEncryptedMessage] = useState<string>("");
    const [recipients, setRecipients] = useState<RecipientKey[]>([]);
    const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
    const [isEncrypting, setIsEncrypting] = useState(false);


    useEffect(() => {
        const savedRecipients = getSavedRecipientKeys();
        setRecipients(savedRecipients);
    }, []);

    const handleRecipientToggle = (recipientId: string) => {
        setSelectedRecipients(prev => 
            prev.includes(recipientId) 
                ? prev.filter(id => id !== recipientId)
                : [...prev, recipientId]
        );
    };

    const handleEncrypt = async () => {
        if (!message.trim()) {
            alert("Please enter a message to encrypt");
            return;
        }

        if (selectedRecipients.length === 0) {
            alert("Please select at least one recipient");
            return;
        }

        setIsEncrypting(true);
        try {
            const encrypted = await encryptMessageForRecipients(message, selectedRecipients);
            setEncryptedMessage(encrypted);
            console.log("Message encrypted successfully!");
        } catch (error) {
            console.error("Error encrypting message:", error);
            alert("Error encrypting message: " + (error as Error).message);
        } finally {
            setIsEncrypting(false);
        }
    };

    const handleCopy = () => {
        if (encryptedMessage) {
            navigator.clipboard.writeText(encryptedMessage);
            console.log("Encrypted message copied to clipboard!");
        }
    };

    const handleClear = () => {
        setMessage("");
        setEncryptedMessage("");
        setSelectedRecipients([]);
    };

    return (
        <div className="flex flex-row justify-center items-start w-full gap-4">
         
            <Card className="bg-slate-800/90 w-full max-w-3xl border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                <h1 className="flex justify-center items-center text-2xl font-bold mb-4">Message</h1>
                
            
                {recipients.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Select Recipients:</h2>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                            {recipients.map((recipient) => (
                                <label key={recipient.id} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedRecipients.includes(recipient.id)}
                                        onChange={() => handleRecipientToggle(recipient.id)}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm">{recipient.name}</span>
                                </label>
                            ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            {selectedRecipients.length} recipient(s) selected
                        </p>
                    </div>
                )}

                {recipients.length === 0 && (
                    <div className="mb-4 p-3 bg-yellow-600/20 border border-yellow-600/30 rounded">
                        <p className="text-yellow-200 text-sm">
                            No recipients found. Please add recipient public keys in the Keys section first.
                        </p>
                    </div>
                )}

                <Card className="h-45 bg-purple-500/20 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                    <div className="flex items-center justify-between">
                        <textarea 
                            className='h-40 w-full m-0 border-0 bg-transparent text-white resize-none outline-none' 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Enter message content'
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
                        onClick={handleEncrypt}
                        disabled={isEncrypting || recipients.length === 0}
                        className="w-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 m-5"
                    >
                        {isEncrypting ? "Encrypting..." : "Encrypt"}
                    </Button>
                </div>
            </Card>

     
            <Card className="bg-slate-800/90 w-full max-w-3xl border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                <h1 className="flex justify-center items-center text-2xl font-bold mb-4">
                    Cipher
                    {encryptedMessage && (
                        <span className="ml-2 text-green-400 text-sm">✓ Encrypted</span>
                    )}
                </h1>
                <div>
                    <Card className="h-45 bg-purple-500/20 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
                        <div className="flex items-center justify-between">
                            <textarea 
                                className='h-40 w-full m-0 border-0 bg-transparent text-white resize-none outline-none' 
                                value={encryptedMessage}
                                readOnly
                                placeholder='Encrypted message will appear here'
                            />
                        </div>
                    </Card>
                    <div className="flex justify-end">
                        <Button 
                            onClick={handleCopy}
                            disabled={!encryptedMessage}
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
