import {Html, Head, Main, NextScript} from "next/document";

export default function Document(){
    return(
        <Html lang="kr">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body style={{ overflow: 'hidden',}}>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}