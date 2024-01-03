import Form from "@components/signin/Form";
import {useCallback} from "react";
import {signInWithEmailAndPassword} from "firebase/auth"
import {FormValues} from "@models/signin";
import {auth} from "@remote/firebase";
import Snackbar from "@components/Snackbar";
import {useRouter} from "next/router";
import {getProviders, signIn} from "next-auth/react";

function SigninPage(){
    const navigate = useRouter()
    getServerSideProps()
    function kakaoLogin() {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/api/auth/callback/kakao',
        });
    }

    const handleSubmit = useCallback(async (formValues:FormValues)=>{
        const {email, password} = formValues;
        console.log(formValues)
        /*kakaoLogin()*/
        signIn("kakao")
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
            <Snackbar/>
        </div>
    )
}
async function getServerSideProps(){
    const providers = await getProviders()
    /*console.log(""+providers)*/
    return {
        props: {},
    }
}
export default SigninPage