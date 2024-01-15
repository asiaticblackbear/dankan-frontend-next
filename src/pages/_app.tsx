import '@styles/globals.css'
import '../../public/fonts/pretendard.css';
import type {AppProps} from 'next/app'
import {Global} from "@emotion/react";
import globalStyles from "@styles/globalStyles";
import Layout from "@shared/Layout";
import Script from "next/script";
import {QueryClientProvider, QueryClient} from "react-query";
import Head from "next/head";
import {ThemeProvider} from '@mui/material'
import {theme} from '../theme'
import {SnackbarProvider} from "@components/common/Snackbar";
import {SessionProvider} from "next-auth/react"
import {RecoilRoot} from "recoil";

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
    const {session} = pageProps
    let component =
        <RecoilRoot>
            <SessionProvider session={session}>
                <Layout>
                    <Script
                        src='https://developers.kakao.com/sdk/js/kakao.js'
                        onLoad={kakaoInit}></Script>
                    <Global styles={globalStyles}/>
                    {/*<SessionProvider session={pageProps.session}>*/}
                    <ThemeProvider theme={theme}>

                        <SnackbarProvider>
                            <QueryClientProvider client={client}>
                                <Head>
                                    <meta name="viewport"
                                          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
                                </Head>
                                <Component {...pageProps} />
                            </QueryClientProvider>
                        </SnackbarProvider>
                    </ThemeProvider>
                    {/*</SessionProvider>*/}
                </Layout>
            </SessionProvider>
        </RecoilRoot>
    return component
}

export default MyApp
