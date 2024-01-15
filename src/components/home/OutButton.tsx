import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import Spacing from "@components/common/Spacing"
import {css} from "@emotion/react";
import {useRouter} from "next/router";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from "@mui/material";
import {useEffect, useState} from "react";
import {deleteUser} from "@remote/user";

interface dataProps{
    id?: string
}
function OutButton({id}: dataProps) {
    const router = useRouter();
    const [uid, setUid] = useState("");
    const [open, setOpen] = useState(false);
    const [popup, setPopup] = useState({
        title: '',
        desc: '',
        evt: 0
    });
    useEffect(() => {
        let ids
        if (typeof window !== "undefined") {
            ids = localStorage.getItem("uid")
            setUid(ids as string)
            console.log("storage" + ids)
        }
    },[])

    async function delUser(){
        const data = await deleteUser(uid)
        console.log("탈퇴", data)
    }

    const handleClickLogout = () => {
        setPopup({
            title: "로그아웃 안내",
            desc: "로그아웃 하시겠습니까?",
            evt: 0
        })
        setOpen(true);
    };

    const handleClickDelete = () => {
        setPopup({
            title: "탈퇴 안내",
            desc: "더 이상 서비스를 이용 할 수 없습니다. 정말 탈퇴 하시겠습니까?",
            evt: 1
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEvent = () => {
        if(popup.evt===0){
            console.log("로그아웃");
        }else if(popup.evt===1){
            console.log("탈퇴");
            delUser()
        }else{
            return;
        }
        setOpen(false);
        localStorage.setItem("uid", "")
        router.replace({
            pathname:"/user/signin",
        },)
    };

    return (
        <div css={outStyles}>
            <Flex direction="column">
                <Text typography="t10" color="dankanGray" onClick={handleClickLogout}>로그아웃</Text>
                <Spacing size={10}/>
                <Text typography="t10" color="dankanGray" onClick={handleClickDelete}>탈퇴</Text>
            </Flex>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {popup.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {popup.desc}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleEvent} autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const outStyles = css`
  margin: 20px 32px 0px 32px;
`
export default OutButton