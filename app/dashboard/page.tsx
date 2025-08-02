import { useLocalStorage } from "usehooks-ts"
// import { useCookies } from "next-client-cookies"
import {cookies} from 'next/headers'
import { redirect, RedirectType } from "next/navigation";

export default async function Dashboard() {
    const cookieStore = await cookies()
    const username = cookieStore.get('username')
    const uid = cookieStore.get('uid')
    if(!username || !uid) {
        redirect("/", RedirectType.replace)
    }

    return(
        <div>
            <h1>Dashboard</h1>
            {/* <p>Welcome, {username}!</p>
            <p>Your UID is: {uid}</p> */}
        </div>
    )

}