import {useCallback, useState} from "react";
import {useRouter} from "next/router";

import NavbarBack from "@components/common/NavbarBack";
import Step1 from "@components/user/FormUniv";
import Step2 from "@components/user/FormNick";
import Step3 from "@components/user/FormInfo";
import {getExistsByUsername, joinUser} from "@remote/user";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "@atoms/index";
import {User} from "@models/user";


const LAST_STEP = 1
const updateStateWithSpread = (setState: any, updatedValues: any) => {
    setState((prevState: any) => ({
        ...prevState,
        ...updatedValues,
    }));
};
function UserNew(){
    const router = useRouter();
    console.log(router.query.sso)
    const [querySso, setQuerySso] = useState("N")
    const [step, setStep] = useState(0)
    const [univ, setUniv] = useState("");
    const [nickname, setNickname] = useState("");
    const [editUser, setEditUser] = useState({
        "nime": "",
        "univZipCd": "",
        "pwd": "",
        "sso": querySso,
        "termYn": "Y"
    })


    const handleStep1= (univCode: string) =>{
        console.log("return2:"+univCode)
        updateStateWithSpread(setEditUser,{
            univZipCd: univCode,
            sso: router.query.sso
        })
        console.log("return22:"+univCode)
        /*handleNameChange(form.name)
        handleAddrChange(form.homeAddr)*/
        setStep(step+1)
    }

    const handleStep2 = (nickname: string) =>{
        console.log("return1:"+JSON.stringify(nickname))
        updateStateWithSpread(setEditUser,{
            nime: nickname,
            pwd: nickname
        })
        /*handleNameChange(form.name)
        handleAddrChange(form.homeAddr)*/
        setStep(step+1)
    }

    const handleStep3 = (onUser: User) =>{
        console.log("return1:"+JSON.stringify(onUser))
        join(onUser)
    }

    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const updateUid = (newValue:string) => {
        // Use the setter function to update the atom
        setCurrentUser((prev) => ({
            ...prev,
            "cifNo": newValue,
        }));
    };
    const updateUniv = (newValue:string) => {
        // Use the setter function to update the atom
        setCurrentUser((prev) => ({
            ...prev,
            "univZipCd": newValue,
        }));
    };

    async function join(onUser: User) {
        console.log("last: "+JSON.stringify(onUser))
        const data = await joinUser({
            "nime": onUser.nime,
            "univZipCd": onUser.univZipCd,
            "pwd": onUser.nime,
            "sso": onUser.sso,
            "termYn": "Y"
        })
        let uid = data.cifNo
        localStorage.setItem("uid", data.cifNo)
        localStorage.setItem("sso", onUser.sso as string)

        router.replace({
            pathname:"/",
            query: {
                uid : uid
            },
        }, "/")
        /*updateUid(
            data.cifNo,
        )
        console.log("return::::"+JSON.stringify(currentUser))*/
    }

    const handleUniv = useCallback(async (univ: string)=>{
        console.log("return:"+univ)
        setUniv(univ)
        updateUniv(univ)
        setStep(step+1)
    }, [])

    const handleSubmit = useCallback(async (nickname: string)=>{
        setNickname(nickname)
        setStep(step+1)
    }, [])

    return (
        <div>
            {step !== 2 ? <NavbarBack title="회원가입" onNext={()=>{
                if(step>=1) setStep(step-1)
                if(step==0) router.back()
            }}/>: null}

            {step === 0 ? <Step1 onNext={handleStep1}/> : null}

            {step === 1 ? <Step2 onNext={handleStep2}/> : null}
            {step === 2 ? <Step3 onUser={editUser} onNext={handleStep3}/> : null}
        </div>
    )
}

export default UserNew