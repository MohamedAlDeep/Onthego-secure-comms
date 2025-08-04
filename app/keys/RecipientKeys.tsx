"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RecipientKey {
    id: string;
    name: string;
    publicKey: string;
    dateAdded: string;
}

export default function RecipientKeys() {
    const [recipientKey, setRecipientKey] = useState<string>("");
    const [recipientName, setRecipientName] = useState<string>("");
    const [savedKeys, setSavedKeys] = useState<RecipientKey[]>([]);

  
    useEffect(() => {
        const storedKeys = localStorage.getItem('recipientKeys');
        if (storedKeys) {
            setSavedKeys(JSON.parse(storedKeys));
        }
    }, []);

    const handleAddRecipient = () => {
        if (!recipientKey.trim()) {
            alert("Please enter a public key");
            return;
        }

        if (!recipientName.trim()) {
            alert("Please enter a recipient name");
            return;
        }

      
        if (!recipientKey.includes('-----BEGIN PGP PUBLIC KEY BLOCK-----')) {
            alert("Please enter a valid PGP public key");
            return;
        }

        const newRecipient: RecipientKey = {
            id: Date.now().toString(),
            name: recipientName.trim(),
            publicKey: recipientKey.trim(),
            dateAdded: new Date().toLocaleDateString()
        };

        const updatedKeys = [...savedKeys, newRecipient];
        setSavedKeys(updatedKeys);
        localStorage.setItem('recipientKeys', JSON.stringify(updatedKeys));

   
        setRecipientKey("");
        setRecipientName("");
        
        console.log("Recipient added successfully!");
    };

    const handleRemoveRecipient = (id: string) => {
        const updatedKeys = savedKeys.filter(key => key.id !== id);
        setSavedKeys(updatedKeys);
        localStorage.setItem('recipientKeys', JSON.stringify(updatedKeys));
        console.log("Recipient removed successfully!");
    };

    const copyToClipboard = (text: string, name: string) => {
        navigator.clipboard.writeText(text);
        console.log(`${name}'s public key copied to clipboard!`);
    };

    return (
        <Card className="bg-slate-800/90 w-full max-w-3xl border-purple-500/20 backdrop-blur-sm border-2 text-white p-5 m-5" style={{ borderColor: '#9810FA' }}>
            <h1 className="flex justify-center items-center text-2xl font-bold mb-4">
                Add recipient public keys
                {savedKeys.length > 0 && (
                    <span className="ml-2 text-green-400 text-sm">({savedKeys.length} saved)</span>
                )}
            </h1>
            
           
            <div className="mb-4">
                <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Recipient name (e.g., John Doe)"
                    className="w-full mb-3 p-2 bg-gray-700 text-white rounded border border-purple-500/30"
                />
                <Card className="h-45 bg-purple-500/20 border-purple-500/20 backdrop-blur-sm border-2 text-white p-5" style={{ borderColor: '#9810FA' }}>
                    <div className="flex items-center justify-between">
                        <textarea 
                            className='h-40 w-full m-0 border-0 bg-transparent text-white resize-none outline-none' 
                            value={recipientKey}
                            onChange={(e) => setRecipientKey(e.target.value)}
                            placeholder='Enter recipient public key here'
                        />
                    </div>
                </Card>
                <div className="flex justify-end">
                    <Button 
                        onClick={handleAddRecipient}
                        className="w-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 m-5"
                    >
                        Add Recipient
                    </Button>
                </div>
            </div>

            {savedKeys.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Saved Recipients:</h2>
                    <div className="space-y-3">
                        {savedKeys.map((recipient) => (
                            <Card key={recipient.id} className="bg-purple-500/20 border-purple-500/20 border-2 p-4" style={{ borderColor: '#9810FA' }}>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{recipient.name}</h3>
                                        <p className="text-sm text-gray-400">Added: {recipient.dateAdded}</p>
                                        <textarea 
                                            value={recipient.publicKey} 
                                            readOnly 
                                            className="w-full h-20 mt-2 bg-gray-700 text-white text-xs p-2 resize-none rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 ml-4">
                                        <Button 
                                            onClick={() => copyToClipboard(recipient.publicKey, recipient.name)}
                                            className="w-20 bg-green-600 hover:bg-green-700 text-xs"
                                        >
                                            Copy
                                        </Button>
                                        <Button 
                                            onClick={() => handleRemoveRecipient(recipient.id)}
                                            className="w-20 bg-red-600 hover:bg-red-700 text-xs"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
