import Form from "@components/user/Form";
import {useCallback, useEffect} from "react";
import {FormValues} from "@models/signin";
import {useRouter} from "next/router";
import { getUserById } from '@remote/user'
import styled from "@emotion/styled";

function SigninPage(){
    const router = useRouter()

    useEffect(() => {
        let uid, sso
        if (typeof window !== "undefined") {
            uid = localStorage.getItem("uid") || ""
            sso = localStorage.getItem("sso") || ""
            if(sso!==undefined&&sso==="Y"){
                router.replace({
                    pathname:"/",
                    query: {
                        uid : uid
                    },
                }, "/")
            }
        }

    }, [])

    const handleSubmit = useCallback(async (formValues:FormValues)=>{
        const {email, password} = formValues;
        console.log(formValues)
        //kakaoLogin()
    }, [])

    return(
        <Container>
            <Form onSubmit={handleSubmit}/>
        </Container>
    )
}
const Container = styled.div`
    background-color: white;
    min-width: 430px;
    height: 100vh;
    position: relative;
`
export default SigninPage