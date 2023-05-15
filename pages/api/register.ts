import bcrypt from "bcrypt";
import Prisma from "@/libs/prisma";
import {NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req: NextApiRequest, res: NextApiResponse){
    console.log(req.body)
    try{
        if (req.method !== "POST"){
            return res.status(405).end()
        }
        const {name, email , password} = req.body
        const IfUser = await Prisma.user.findUnique({where: {email}})
        if (IfUser){
            return res.status(420).json({error: "Ошибка, данный e-mail уже используется"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await Prisma.user.create({
            data: {
                name,
                email,
                hashPassword,
                emailVerified: new Date(),
                image: "",
            }})
        return res.status(200).json(user)
    }                           

    catch(error){
        return res.status(400).json({error: "Не удалось зарегистрироваться, повторите попытку позже"})
    }
}