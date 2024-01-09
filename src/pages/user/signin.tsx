import Form from "@components/signin/Form";
import {useCallback} from "react";
import {FormValues} from "@models/signin";
import {useRouter} from "next/router";

function SigninPage(){
    const navigate = useRouter()
    function kakaoLogin() {
        window.Kakao.Auth.authorize({
            redirectUri: 'https://dankan-react.web.app/user/kakao'
            //redirectUri: 'http://localhost:3000/user/kakao',
        });
    }

    const handleSubmit = useCallback(async (formValues:FormValues)=>{
        const {email, password} = formValues;
        console.log(formValues)
        kakaoLogin()
        /*try{
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            navigate.push("/")
            //navigate("/")
        }catch (e){
            navigate.push("/")
            console.log(`error ${e}`)
        }*/
    }, [])

    return(
        <div>
            <Form onSubmit={handleSubmit}/>
        </div>
    )
}
export default SigninPage