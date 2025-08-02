// import type { NextApiRequest, NextApiResponse } from 'next'
// import { db } from "../lib/index"
// import { users } from '../lib/schema'

// type ResponseData = {
//   message: string
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { username, uid } = req.body;

//   // Check if user exists
//   const userCheck = await db.select().from(users).where({ username: username as string, login_id: uid as string });
//   if (userCheck && userCheck.length > 0) {
//     return res.status(200).json({ message: "User already exists" });
//   } else {
//     await db.insert(users).values({ username, uid });
//     return res.status(201).json({ message: "User created successfully" });
//   }
// }