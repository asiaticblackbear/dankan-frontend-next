import {useState} from "react";
import {useRouter} from "next/router";

import NavbarBack from "@components/NavbarBack";
import Step1 from "@components/user/FormUniv";
import Step2 from "@components/user/FormNick";
import {getExistsByUsername, joinUser} from "@remote/user";
import {joinDankan} from "@components/user/hooks/useUser";


const LAST_STEP = 1
function UserNew(){
    const router = useRouter();
    console.log(router.query.sso)
    const [sso, setSso] = useState(router.query.sso)
    const [step, setStep] = useState(0)
    const [univ, setUniv] = useState({
        univCode: '',
        univName: '',
    });
    const [nickname, setNickname] = useState("");


   /* const handleSubmit = useCallback(async ()=>{

    }, [])*/

    async function join() {
        const data = await joinUser({
            "nime": nickname,
            "univZipCd": univ.univCode,
            "pwd": nickname,
            "sso": sso,
            "termYn": "Y"
        })
        localStorage.setItem("uid", data.cifNo)
        console.log("back: " + data.nime+", "+localStorage.getItem("uid"));
        router.replace("/user/info")
    }

    return (
        <div>
            <NavbarBack onNext={()=>{
                if(step>=1) setStep(step-1)
                if(step==0) router.back()
            }}/>
            {step === 0 ? <Step1 onNext={(univ) => {
                console.log(JSON.stringify(univ))
                setUniv(univ)
                setStep(step+1)
            }}
            /> : null}
            {step === 1 ? <Step2 onNext={(nickname) => {
                console.log(nickname)

            }}
            /> : null}
            {/*{step === 2 ? <Step3 onNext={()=>{}}/> : null}*/}
        </div>
    )
}

export default UserNew