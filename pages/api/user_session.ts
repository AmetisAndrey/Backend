
import server from "@/libs/server";
import {NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== "GET") {
        return res.status(405).end()
    }
    try{
        const  {sessionUser} = await server(req)
        return res.status(200).json(sessionUser)
    }
    catch(error){
        return res.status(400).json("Не найден пользователь")
    }
}