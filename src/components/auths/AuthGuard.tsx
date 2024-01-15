/*
import {useState} from "react";
import {useSetRecoilState} from "recoil"
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "@remote/firebase";
import {userState} from "@atoms/index";

function AuthGuard({children}: { children: React.ReactNode }) {
    const [initialize, setInitialize] = useState(false)
    const setUser = useSetRecoilState(userState)

    onAuthStateChanged(auth, (user)=>{
        console.log("user", user)
        if(user!=null){
            /!*setUser({
                cifNo: user.uid,
                email: user.email ?? "",
                name: user.displayName ?? "",
                univZipCd: "",
            })*!/
        }else{
            setUser(null)
        }

        setInitialize(true)
    })
    if(initialize===false){
        return <div>인증처리중</div>
    }
    return <>children</>
}

export default AuthGuard*/
