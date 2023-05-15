import NextAuth, {AuthOptions} from "next-auth";
import Prisma from "@/libs/prisma";
import Credentials from "next-auth/providers/credentials";
import bcript from "bcrypt";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import VkProvider from "next-auth/providers/vk";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: AuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        

        VkProvider({
            clientId: process.env.VK_CLIENT as string,
            clientSecret: process.env.VK_SECRET as string,

        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    type: "Text",
                    label:"Email"
                },
                password: {
                    type: "Password",
                    label: "Password"
                }
                
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password){
                    throw new Error("Error")
                }
                const user = await Prisma.user.findUnique({
                    where: {email: credentials.email}
                })
                if (!user || !user.hashPassword){
                    throw new Error("Данного пользователя не существует, зарегистрируйтесь")
                }
                const password = await bcript.compare(credentials.password, user?.hashPassword)
                if (!password){
                    throw new Error("Ошибка, неверный пароль")
                }
                return user

            }

        })
    ],
    pages: {signIn: "/auth"},
    adapter: PrismaAdapter(Prisma),
    session: {strategy: "jwt"},
    jwt: {secret: process.env.JWT},
    secret: process.env.NEXT_AUTH
}


export default NextAuth(authOptions);


