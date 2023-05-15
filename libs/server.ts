import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import  Prisma  from "@/libs/prisma";


const server = async (req:NextApiRequest) => {
    const session = await getSession({req})
    if (!session?.user?.email){
        throw new Error("неудалось войти")
    }
    const user = await Prisma.user.findUnique({
        where: {email: session.user.email},
    })
    if (!user){
        throw new Error("ошибка, не найден пользователь")
    }
    return {user}
}




export default server;