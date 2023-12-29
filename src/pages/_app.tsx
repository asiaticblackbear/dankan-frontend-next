import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Global} from "@emotion/react";
import globalStyles from "@styles/globalStyles";
import Layout from "@shared/Layout";
import {useNavigate} from "react-router-dom";
import Script from 'next/script';

declare global { // Kakao 함수를 전역에서 사용할 수 있도록 선언
    interface Window {
        Kakao: any;
    }
}
function MyApp({Component, pageProps}: AppProps) {

    function kakaoInit() { // 페이지가 로드되면 실행
        window.Kakao.init("e91163335d3e2512e1c5fd4f18bdbc25");
        console.log("카카오:"+window.Kakao.isInitialized());
    }

    let component =
        <Layout>
            <Global styles={globalStyles}/>
            <Component {...pageProps} />
            <Script
                src='https://developers.kakao.com/sdk/js/kakao.js'
                onLoad={kakaoInit}
            ></Script>
        </Layout>
    return component
}

export default MyApp
