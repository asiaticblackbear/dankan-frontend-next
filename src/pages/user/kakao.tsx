import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useCallback, useEffect} from 'react';
import axios from "axios";
import {getExistsByUserKakao, getExistsByUsername} from "@remote/user";
import {User} from "@models/user"
import CircularProgress from '@mui/material/CircularProgress';
import styled from "@emotion/styled";
import {css} from "@emotion/react";

interface ResponseType {
    ok: boolean;
    error?: any;
}

interface TokenResponse {
    token_type: string;
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: number;
    refresh_token_expires_in: string;
    scope: string;
}

interface UserInfo {
    id: number;
    connected_at: string;
    properties: {
        nickname: string;
        profile_image?: string; // 640x640
        thumbnail_image?: string; // 110x110
    };
}

async function getTokenFromKakao(authCode: string | string[]) {
    console.log("getTokenFromKakao", authCode)
    const redirectUri = 'https://dankan-react.web.app/user/kakao'
    //const redirectUri = 'http://localhost:3000/user/kakao'
    const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=3146eccdc2aeec4b00eb16139b35fd70&redirect_uri=${redirectUri}&code=${authCode}`;
    const response: TokenResponse = await fetch(tokenUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    }).then((res) => res.json());
    console.log("getTokenFromKakao", JSON.stringify(response))
    return response;
}

async function getUserFromKakao({access_token}: TokenResponse) {
    console.log("getUserFromKakao", access_token)
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    const response: UserInfo = await fetch(userInfoUrl, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
    }).then((res) => res.json());
    console.log("getUserFromKakao", JSON.stringify(response))
    return response;
}



const Kakao: NextPage = () => {
    const router = useRouter();
    const {code: authCode, error: kakaoServerError} = router.query;
    const loginHandler = useCallback(
        async (code: string | string[]) => {
            const token = await getTokenFromKakao(code)
            console.log(token)
            const data = await getUserFromKakao(token)
            console.log("code: " + code)
            checkedKakao(data)
            /* router.replace({
                 pathname:"/user/new",
                 query: {
                    sso : "Y"
                 },
             }, "/user/new")*/
            // 백엔드에 전송
            /*const response: ResponseType = await fetch('/api/users/kakao-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    authCode: code,
                }),
            }).then((res) => res.json());

            if (response.ok) { // 성공하면 홈으로 리다이렉트
                router.push('/');
            } else { // 실패하면 에러 페이지로 리다이렉트
                router.push('/notifications/authentication-failed');
            }*/
        },
        [router]
    );

    useEffect(() => {
        if (authCode) {
            loginHandler(authCode);

            // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
        } else if (kakaoServerError) {
            console.log("error:" + kakaoServerError)
            router.push('/user/signin');
        }
    }, [loginHandler, authCode, kakaoServerError, router]);

    async function checkedKakao(user: UserInfo) {
        const data = await getExistsByUserKakao(String(user.id))
        console.log("checkedName", data)
        if (!data.exists) {
            console.log("checkedKakao", 1)
            router.replace({
                pathname:"/user/new",
                query: {
                    email: user.id,
                    nime: user.properties.nickname,
                    sso : "Y"
                },
            }, "/user/new")
        } else {
            const user: User = data.extra
            localStorage.setItem("sso", "Y")
            localStorage.setItem("uid", user.cifNo||"")
            router.replace({
                pathname:"/",
            }, "/")
            console.log("checkedKakao", 2)
        }

    }

    return (
        <Container>
            <div css={style}>
                <CircularProgress color="primary" />
            </div>
        </Container>
    );
};
const Container = styled.div`
    background-color: white;
    min-width: 430px;
    max-width: 430px;
    height: 100vh;
    position: relative;
`
const style = css`
    padding-top:400px;
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
`
export default Kakao