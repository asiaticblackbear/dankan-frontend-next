import Form from "@components/signin/FormNick";
import {useCallback} from "react";
import {signInWithEmailAndPassword} from "firebase/auth"
import {FormValues} from "@models/signin";
import {auth} from "@remote/firebase";
import {useRouter} from "next/router";

function NicknamePage(){
    const navigate = useRouter()

    const handleSubmit = useCallback(async (formValues:FormValues)=>{
        const {email, password} = formValues;
        console.log(formValues)
        try{
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            navigate.push("/")
            //navigate("/")n
        }catch (e){
            navigate.push("/")
            console.log(`error ${e}`)
        }
    }, [])

    return(
        <div>
            <Form onSubmit={()=>{}}/>
        </div>
    )
}

export default NicknamePage