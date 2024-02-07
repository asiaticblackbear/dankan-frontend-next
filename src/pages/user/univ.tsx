import Form from "@components/user/FormUniv";
import Navbar from "@components/user/Navbar";
import {useRouter} from "next/router";
import {updateUserUniv} from "@remote/user";
import {userState} from "@atoms/index"
import {useRecoilValue} from "recoil";
import {useEffect} from "react";
import {useSnackbar} from "@components/common/Snackbar";
import {joinArea, updateUserAreaUniv} from "@remote/area";
import styled from "@emotion/styled"
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

    async function editUserUniv(univZipCd: string, univAddr: string) {
        console.log("editUserUniv", JSON.stringify(userInfo))
        let shortAddr = univAddr.split(" ")
        const data = await updateUserUniv(uid as string, univZipCd)
        const data2 = await updateUserAreaUniv(uid as string, shortAddr[0]+" "+shortAddr[1])
        console.log("editUserUniv", uid+", "+univZipCd+", "+shortAddr[0]+" "+shortAddr[1])
        showSnackbar("대학 변경이 완료되었어요!")
        router.replace({pathname:"/",}, "/")
    }

    return(
        <Container>
        <Navbar onNext={()=>{
            router.replace(
                "/"
            )
        }}/>
        <Form onNext={(univZipCd: string, univAddr: string) => {
            console.log("return:"+univZipCd)
            editUserUniv(univZipCd, univAddr)
        }}/>
        </Container>
    )
}

const Container = styled.div`
    background-color: white;
    max-width: 390px;
    width: 100%;
    height: 100vh;
    position: relative;
`

export default Univ

