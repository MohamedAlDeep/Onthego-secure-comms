import { encrypt, 
    decrypt, 
    generateKey, 
    createMessage, 
    readKey } from 'openpgp'

export async function generateKeys(username, passphrase) {
    const { privateKey, publicKey, revocationCertificate  } = await generateKey({
        type: 'ecc',
        curve: "ed25519",
        userIDs: [{ name: username }],
        passphrase: passphrase,
        format: 'armored'
    });
    console.log('Private Key:', privateKey);
    console.log('Public Key:', publicKey);
    console.log('Revocation Certificate:', revocationCertificate);
    return { privateKey, publicKey, revocationCertificate };
}

export async function encryptMessage(publicKey:any, message: any) {
    const encrypted = await encrypt({
        message: await createMessage({ text: message }),
        encryptionKeys: await readKey({ armoredKey: publicKey })
    });
    return encrypted;
}

export async function decryptMessage(privateKey:any, passphrase: string, encryptedMessage: string) {
    const decrypted = await decrypt({
        message: await createMessage({ text: encryptedMessage }),
        decryptionKeys: await readKey({ armoredKey: privateKey, passphrase })
    });
    return decrypted.data;
}