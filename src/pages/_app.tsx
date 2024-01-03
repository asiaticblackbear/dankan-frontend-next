import '@styles/globals.css'
import type {AppProps} from 'next/app'
import {Global} from "@emotion/react";
import globalStyles from "@styles/globalStyles";
import Layout from "@shared/Layout";
import {useNavigate} from "react-router-dom";
import Script from "next/script";
import {QueryClientProvider, QueryClient} from "react-query";
import {SessionProvider} from "next-auth/react";


const client = new QueryClient({})
declare global { // Kakao 함수를 전역에서 사용할 수 있도록 선언
    interface Window {
        Kakao: any;
    }
}

function MyApp({Component, pageProps}: AppProps) {
    function kakaoInit() { // 페이지가 로드되면 실행
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
        console.log(window.Kakao.isInitialized());
    }

    let component =
        <Layout>
            <Script
                src='https://developers.kakao.com/sdk/js/kakao.js'
                onLoad={kakaoInit}
            ></Script>
            <Global styles={globalStyles}/>
            <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={client}>
                    <Component {...pageProps} />
            </QueryClientProvider>
            </SessionProvider>
        </Layout>
    return component
}

export default MyApp
