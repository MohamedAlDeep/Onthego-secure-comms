
import { encrypt, 
    decrypt, 
    generateKey, 
    createMessage, 
    readKey,
    readPrivateKey,
    readMessage,
    decryptKey } from 'openpgp'

export async function generateKeys(username: string, passphrase: string) {
    const { privateKey, publicKey, revocationCertificate  } = await generateKey({
        type: 'rsa',
        rsaBits: 2048,
        userIDs: [{ name: username }],
        passphrase: passphrase,
        format: 'armored'
    });
    console.log('Private Key:', privateKey);
    console.log('Public Key:', publicKey);
    console.log('Revocation Certificate:', revocationCertificate);
    return { privateKey, publicKey, revocationCertificate };
}

export async function encryptMessage(publicKey: string, message: string) {
    const encrypted = await encrypt({
        message: await createMessage({ text: message }),
        encryptionKeys: await readKey({ armoredKey: publicKey })
    });
    return encrypted;
}

export async function decryptMessage(privateKey: string, passphrase: string, encryptedMessage: string) {
    try {
        console.log("Decryption attempt started...");
        
        // Read the encrypted message
        const message = await readMessage({ armoredMessage: encryptedMessage });
        console.log("Message read successfully");
        
        // Read the private key
        const privateKeyObj = await readPrivateKey({ armoredKey: privateKey });
        console.log("Private key read successfully");
        
        // Try multiple decryption approaches
        let decrypted;
        let lastError;
        
        // Approach 1: Decrypt private key first, then use it
        try {
            console.log("Attempting decryption approach 1: Using decryptKey");
            const decryptedPrivateKey = await decryptKey({
                privateKey: privateKeyObj,
                passphrase: passphrase
            });
            
            const result = await decrypt({
                message,
                decryptionKeys: [decryptedPrivateKey],
                format: 'utf8'
            });
            
            decrypted = result.data;
            console.log("Approach 1 successful");
            return decrypted as string;
            
        } catch (error) {
            console.log("Approach 1 failed:", error);
            lastError = error;
        }
        
        // Approach 2: Use raw private key with passphrase
        try {
            console.log("Attempting decryption approach 2: Using passwords array");
            const result = await decrypt({
                message,
                decryptionKeys: [privateKeyObj],
                passwords: [passphrase],
                format: 'utf8'
            });
            
            decrypted = result.data;
            console.log("Approach 2 successful");
            return decrypted as string;
            
        } catch (error) {
            console.log("Approach 2 failed:", error);
            lastError = error;
        }
        
        // Approach 3: Try without format specification
        try {
            console.log("Attempting decryption approach 3: Without format");
            const result = await decrypt({
                message,
                decryptionKeys: [privateKeyObj],
                passwords: [passphrase]
            });
            
            decrypted = result.data;
            console.log("Approach 3 successful");
            return typeof decrypted === 'string' ? decrypted : String(decrypted);
            
        } catch (error) {
            console.log("Approach 3 failed:", error);
            lastError = error;
        }
        
        // If all approaches fail, throw the last error
        throw lastError;
        
    } catch (error) {
        console.error("All decryption approaches failed:", error);
        throw new Error(`Decryption failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// Utility function to get saved recipient keys from localStorage
export function getSavedRecipientKeys() {
    if (typeof window === 'undefined') return []; // Server-side check
    const storedKeys = localStorage.getItem('recipientKeys');
    return storedKeys ? JSON.parse(storedKeys) : [];
}

// Utility function to encrypt message for multiple recipients
export async function encryptMessageForRecipients(message: string, recipientIds: string[] = []) {
    const savedKeys = getSavedRecipientKeys();
    
    if (recipientIds.length === 0) {
        throw new Error("No recipients selected");
    }
    
    const selectedRecipients = savedKeys.filter((key: any) => recipientIds.includes(key.id));
    
    if (selectedRecipients.length === 0) {
        throw new Error("No valid recipients found");
    }
    
    const publicKeys = [];
    for (const recipient of selectedRecipients) {
        const key = await readKey({ armoredKey: recipient.publicKey });
        publicKeys.push(key);
    }
    
    const encrypted = await encrypt({
        message: await createMessage({ text: message }),
        encryptionKeys: publicKeys
    });
    
    return encrypted;
}