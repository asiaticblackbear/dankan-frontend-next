import {Html, Head, Main, NextScript} from "next/document";

export default function Document(){
    <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
            integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
            crossOrigin="anonymous"></script>
    return(
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}