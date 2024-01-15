import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import Flex from "@components/common/Flex";
import TextField from "@components/common/TextField"
import Button from "@components/common/Button";
import Text from "@components/common/Text"
import {css} from "@emotion/react";
import Spacing from "@components/common/Spacing";
import {colors} from "@styles/colorPalette";
import {FormValues} from "@/models/signin";
import SvgTitle from "@assets/singinTitle.svg"
import KakaoImg from "@assets/Kakao.png";
import Image from "next/image";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";

function Form({onSubmit}: {onSubmit: (formValues: FormValues)=>void}) {

    const router = useRouter()
    const [formValues, setFormValues] = useState({
        email: "", password: ""
    })
    const [uid, setUid] = useState("")
    const [title, setTitle] = useState({
        kakako: "카카오톡으로 시작하기",
        dk: "부동산으로 가입하기"
    })

    useEffect(() => {
        let id
        if (typeof window !== "undefined") {
            id = localStorage.getItem("uid") || ""
            setUid(id)
            if(id!==undefined&&id!==""){
                setTitle({
                    kakako: "카카오톡으로 로그인",
                    dk: "부동산으로 로그인"
                })
            }
            console.log("storage"+id)
        }
    },[])

    const signup = () => {
        if(uid!==undefined&&uid!==""){
            router.replace({
                pathname:"/",
                query: {
                    uid : uid
                },
            }, "/")
        }else{
            router.push({
                pathname:"/user/new",
                query: {
                    sso : "N"
                },
            }, "/user/new")
        }
    }

    function kakaoLogin() {
        if(uid!==undefined&&uid!==""){
            router.replace({
                pathname:"/",
                query: {
                    uid : uid
                },
            }, "/")
        }else{
            window.Kakao.Auth.authorize({
                redirectUri: 'https://dankan-react.web.app/user/kakao'
                //redirectUri: 'http://localhost:3000/user/kakao',
            });
        }
    }

    return (
        <Flex direction="column" css={formContainerStyles}>
            <Spacing size={83}/>
            <Text typography="t3" fontWeight={700}>단기양도 자취방?<br/>단칸에서 구하자!</Text>
            <Spacing size={23}/>
            <Text typography="t7" color={"dankanGrayText"}>한 번의 회원가입으로<br/>우리 학교 앞 자취방을 찾아보세요</Text>
            <Spacing size={140}/>
            <div style={{ marginTop: '0px', marginLeft: '112px' }}>
                <SvgTitle width="224.96" height="247"/>
            </div>
            <Spacing size={25}/>
            {/*()=>signIn("kakao"_*/}
            <Button size="medium" color="kakao" onClick={kakaoLogin}>
                <Flex justify="center"  direction="row" align="center">
                <Image src={KakaoImg} css={imgStyles} alt=""/>{title.kakako}</Flex>
            </Button>
            <Spacing size={19}/>
            {/*<Link to="/signup" css={linkStyles}>*/}
            <div css={linkStyles}>
                <Text typography="t9" color={"dankanGrayText"} style={{paddingRight: 7 }}>또는</Text>
                <Text typography="t7" color={"dankanGrayTextPoint"} fontWeight={700}
                      onClick={signup}>{title.dk}</Text>
            </div>

        </Flex>
    )
}


const formContainerStyles = css`
    padding: 24px;
`

const linkStyles = css`
  text-align: center;
  
  &>span:hover{
    color: ${colors.blue};
  }
`
const imgStyles = css`
  width: 24px;
  height: 24px;
  margin-right: 13px;
`
export default Form
