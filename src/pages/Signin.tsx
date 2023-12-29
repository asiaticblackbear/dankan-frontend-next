import Form from "@components/signin/Form";
import {useCallback} from "react";
import {signInWithEmailAndPassword} from "firebase/auth"
import {FormValues} from "@/models/signin";
import {auth} from "@remote/firebase";
import PositionedSnackbar from "@components/Snackbar";
import Snackbar from "@components/Snackbar";
import {useNavigate} from "react-router-dom";
import {useRouter} from "next/router";

function SigninPage(){
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

    const handleKakao = () => {

    }

    return(
        <div>
            <Form onSubmit={handleSubmit}/>
        </div>
    )
}

export default SigninPage