import Form from "@components/user/Form";
import {useCallback, useEffect} from "react";
import {FormValues} from "@models/signin";
import {useRouter} from "next/router";

function SigninPage(){
    const router = useRouter()

    useEffect(() => {
        let uid
        if (typeof window !== "undefined") {
            uid = localStorage.getItem("uid") || ""
            if(uid!==undefined&&uid!==""){
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
        <div>
            <Form onSubmit={handleSubmit}/>
        </div>
    )
}
export default SigninPage