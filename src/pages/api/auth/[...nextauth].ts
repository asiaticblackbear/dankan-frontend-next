import KakaoProvider from "next-auth/providers/kakao";
import NextAuth from "next-auth";
import {User} from "@models/user"

export default NextAuth({
    providers: [
        KakaoProvider({
            clientId: "3146eccdc2aeec4b00eb16139b35fd70",
            clientSecret: "bju53BppIUfIHyeq49XVsKFahZ1jXa9I"
        }),
    ],
    callbacks:{
        session({session, token}){
            if(session.user){
                (session.user as User).uid = token.sub as string
            }
            return session
        }
    },
    /*session:{
        strategy: 'jwt'
    },*/
    /*pages:{
        signIn: "/user/signin"
    }*/
})