import Form from "@components/user/FormUniv";
import Navbar from "@components/user/Navbar";
import {useRouter} from "next/router";
import {updateUserUniv} from "@remote/user";
import {userState} from "@atoms/index"
import {useRecoilValue} from "recoil";
import {useEffect} from "react";
import {useSnackbar} from "@components/common/Snackbar";
function Univ(){
    const router = useRouter()
    const userInfo = useRecoilValue(userState);
    const {showSnackbar} = useSnackbar()
    let uid = router.query.uid;
    console.log(uid)

    useEffect(() => {
        if (typeof window !== "undefined") {
            uid = localStorage.getItem("uid") || uid
        }
    }, [])

    async function editUserUniv(univZipCd: string) {
        console.log("lastㅋㅋㅋ: "+univZipCd+JSON.stringify(userInfo))
        const data = await updateUserUniv(uid as string, univZipCd)
        console.log(data)
        showSnackbar("대학 변경이 완료되었어요!")
        router.replace({pathname:"/",}, "/")
    }

    return(
        <div>
        <Navbar onNext={()=>{
            router.replace(
                "/"
            )
        }}/>
        <Form onNext={(univZipCd) => {
            console.log("return:"+univZipCd)
            editUserUniv(univZipCd)
        }}/>
        </div>
    )
}

export default Univ

