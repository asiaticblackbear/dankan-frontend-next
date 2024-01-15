import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import {css} from "@emotion/react";
import Spacing from "@components/common/Spacing";
import MuiTextField from '@mui/material/TextField';
import FixedBottomButton from "@components/user/FixedBottomButtonSginin";
import {useRouter} from "next/router";
import {useSnackbar} from "@components/common/Snackbar";
import {getExistsByUsername} from "@remote/user";

function FormNick({onNext}: {onNext: (nickname: any) => void}){
    const router = useRouter()
    const { showSnackbar } = useSnackbar();
    const [name, setName] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const errors = useMemo(()=> validateUser(name), [name])
    const isSuccess = Object.keys(errors).length === 0

    const checkedName = async (name: string) => {
        const data = await getExistsByUsername(name)
        console.log("checkedName", data.exists)
        if(!data.exists){
            onNext(name)
        }else{
            showSnackbar("이미 등록된 닉네임입니다. 다시 설정해주세요.");
        }
    }


    const handleConfirm = (name: string) => {
        console.log("handleConfirm", name)
        const checkCompName = /^[가-힣a-zA-Z0-9]+$/
        const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi

        if(name.length < 2 || name.length > 12 ){
            showSnackbar("최소 2자, 최대 12자를 입력해주세요")
            return
        }

        if(name.length >=2 && !name.match(checkCompName)){
            if(name.match(regExp)){
                showSnackbar("특수문자는 사용할 수 없어요.")
                return
            }else{
                showSnackbar("올바르지 않은 닉네임입니다. 다시 설정해주세요.")
                return
            }
        }
        checkedName(name)
    }



    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, []);

    const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        console.log(e.target.value)
    }, [])



    return (
        <Flex direction="column" css={formContainerStyles}>
            <Spacing size={60}/>
            <Text typography="t3" fontWeight={700}>마지막 단계예요!<br/>닉네임을 설정해주세요</Text>
            <Spacing size={68}/>
            <div>
                <MuiTextField id="standard-basic" placeholder="최소 2자, 최대 12자" value={name} ref={inputRef}
                           variant="standard" style={{width: "100%"}} onChange={handleFormValues}/>
            </div>
            <FixedBottomButton label="닉네임 입력하기" disabled={isSuccess===false} onClick={()=>handleConfirm(name)}/>
        </Flex>

    )
}

function validateUser(name: string){
    let errors = ""
    if(name.length < 2 || name.length > 12 ){
        errors = "최소 2자, 최대 12자를 입력해주세요"
    }
    console.log(errors)
    return errors;
}

const formContainerStyles = css`
    padding-left: 24px;
    padding-right: 24px;
`

export default FormNick
