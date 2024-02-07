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
import {joinArea} from "@remote/area";
import styled from "@emotion/styled";


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
    console.log(router.query.email)
    console.log(router.query.nime)
    const [querySso, setQuerySso] = useState("N")
    const [email, setEmail] = useState("")
    const [step, setStep] = useState(0)
    const [joinComplete, setJoinComplete] = useState(false)
    const [univ, setUniv] = useState("");
    const [nickname, setNickname] = useState("");
    const [editUser, setEditUser] = useState({
        "nime": nickname,
        "univZipCd": "",
        "pwd": "",
        "email": email,
        "sso": querySso,
        "termYn": "Y"
    })


    const handleStep1= (univCode: string, univAddr: string) =>{
        console.log("handleStep1:"+univCode+", "+router.query.email)
        updateStateWithSpread(setEditUser,{
            univZipCd: univCode,
            sso: router.query.sso,
            email: router.query.email,
            nime: router.query.nime
        })
        let shortAddr = univAddr.split(" ")
        setUniv(shortAddr[0]+" "+shortAddr[1])
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
        if(!joinComplete) join(onUser)
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
        setJoinComplete(true)
        console.log("last: "+JSON.stringify(onUser))
        const data = await joinUser({
            "nime": onUser.nime,
            "univZipCd": onUser.univZipCd,
            "pwd": onUser.nime,
            "email": onUser.email,
            "sso": onUser.sso,
            "termYn": "Y"
        })
        let uid = data.cifNo
        console.log(uid+": "+univ)
        const data2 = await joinArea({
            "cifNo": uid,
            "univZipCd": univ
        })
        localStorage.setItem("uid", data.cifNo)
        localStorage.setItem("sso", onUser.sso as string)
        setJoinComplete(false)

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
        <Container>
            {step !== 2 ? <NavbarBack title="회원가입" onNext={()=>{
                if(step>=1) setStep(step-1)
                if(step==0) router.back()
            }}/>: null}

            {step === 0 ? <Step1 onNext={handleStep1}/> : null}

            {step === 1 ? <Step2 onUser={editUser} onNext={handleStep2}/> : null}
            {step === 2 ? <Step3 onUser={editUser} onNext={handleStep3}/> : null}
        </Container>
    )
}

const Container = styled.div`
    background-color: white;
    max-width: 390px;
    width: 100%;;
    height: 100vh;
    position: relative;
`

export default UserNew