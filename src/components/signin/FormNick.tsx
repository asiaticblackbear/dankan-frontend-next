import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/Flex";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import MuiTextField from '@mui/material/TextField';
import NavbarBack from "@components/NavbarBack";
import FixedBottomButton from "@components/signin/FixedBottomButtonSginin";
import {useRouter} from "next/router";
import {useSnackbar} from "@components/Snackbar";
import useHomes from "@components/home/hooks/useHomes";
import {existsByUsername} from "@components/signin/hooks/useUser";
import {store} from "@remote/firebase";
import {home_list} from "@/mock/home";
import {COLLECTIONS} from "@constants/collection";
import {getExistsByUsername} from "@remote/user";

function FormUniv({onSubmit}: {onSubmit: ()=>void}) {
    const navigate = useRouter()
    const { showSnackbar } = useSnackbar();
    const [name, setName] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const errors = useMemo(()=> validateUser(name, showSnackbar), [name])
    const isSuccess = Object.keys(errors).length === 0

    const checkNime = async () => {
        const data = await getExistsByUsername(name)
        console.log("dasd"+data.exists)
        if(data.exists){
            showSnackbar("이미 등록된 닉네임입니다. 다시 설정해주세요.");
        }else{
            navigate.push(`/user/info`)
        }
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
            <NavbarBack/>
            <Spacing size={70}/>
            <Text typography="t3" fontWeight={700}>마지막 단계예요!<br/>닉네임을 설정해주세요</Text>
            <Spacing size={68}/>
            <div>
                <MuiTextField id="standard-basic" placeholder="최소 2자, 최대 12자" value={name} ref={inputRef}
                           variant="standard" style={{width: "100%"}} onChange={handleFormValues}/>
            </div>
            <FixedBottomButton label="닉네임 입력하기" disabled={isSuccess===false} onClick={checkNime
                /*if(data.exists) {
                    showSnackbar("이미 등록된 닉네임입니다. 다시 설정해주세요.");
                }else {
                    navigate.push(`/user/info`)
                }*/
            }/>
        </Flex>

    )
}

function validateUser(name: string, snackbar){
    let errors = {}
    let checkCompName = /^[가-힣a-zA-Z0-9]+$/
    //let regExp = "^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]*$";
    if(name.length < 2 || name.length > 12 ){
       errors = "최소 2자, 최대 12자를 입력해주세요"
    }
    if(name.length >=2 && !name.match(checkCompName)){
        errors = "올바르지 않은 닉네임입니다. 다시 설정해주세요."
        snackbar(`${errors}`);
    }/*else if(name.length >=2 && !name.match(regExp)){
        errors = "특수문자는 사용할 수 없어요."
        snackbar(`${errors}`);
    }*/
    console.log(errors)
    return errors;
}

const formContainerStyles = css`
    padding-left: 24px;
    padding-right: 24px;
`

export default FormUniv
