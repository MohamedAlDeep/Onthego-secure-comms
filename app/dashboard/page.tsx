import { useLocalStorage } from "usehooks-ts"
// import {cookies} from 'next/headers'

export default async function Dashboard() {
    // const cookieStore = await cookies()
    // const username = cookieStore.get('username')
    // const uid = cookieStore.get('uid')


    return(
        <div>
            <h1>Dashboard</h1>
            {/* <p>Welcome, {username}!</p>
            <p>Your UID is: {uid}</p> */}
        </div>
    )

}