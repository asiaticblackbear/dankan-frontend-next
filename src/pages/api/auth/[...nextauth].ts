import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"
import { PrismaAdapter } from "@auth/prisma-adapter"
/*import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()*/
export const authOptions = {

    //dapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID || "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET ||"",
        }),
    ],
    pages:{
        signIn: "/",
    }
}

export default NextAuth(authOptions)