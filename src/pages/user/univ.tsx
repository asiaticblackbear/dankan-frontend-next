import Form from "@components/signin/FormUniv";
import {useCallback} from "react";
import {signInWithEmailAndPassword} from "firebase/auth"
import {FormValues} from "@models/signin";
import {auth} from "@remote/firebase";
import {useRouter} from "next/router";
import {useVh} from "@/utils/useVh";

function UinvPage(){
    const navigate = useRouter()

    const handleSubmit = useCallback(async (formValues:FormValues)=>{
        const {email, password} = formValues;
        console.log(formValues)
        try{
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            navigate.push("/")
            //navigate("/")
        }catch (e){
            navigate.push("/")
            console.log(`error ${e}`)
        }
    }, [])

    return(
        <div>
            <Form onSubmit={handleSubmit}/>
        </div>
    )
}

export default UinvPage