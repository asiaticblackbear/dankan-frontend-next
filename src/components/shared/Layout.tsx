import SEO from "./SEO";
import Head from "next/head";
import {ReactNode} from "react";
import AppLayout from '@components/AppLayout'
import {css} from "@emotion/react";

function Layout({children}:{children: ReactNode}){
    //const vh = useVh();
    //console.log(`size: ${vh}`)
  /*height: `${100*vh}px`*/
    return(
        <div css={{width:"100wh"}}>
            <SEO title="단칸" description="단기양도 자취방? 단칸에서 구하자!" image="https://dkwa-assets.s3.ap-northeast-2.amazonaws.com/images/logo.png"/>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div css={masterLayout}>
                {children}
            </div>
        </div>
    )
}

const masterLayout = css`
        overflow: hidden;
        display: flex;
        width: 100%;
        max-height: 100vh;
        background-color: #f5f5f5;
        justify-content: center; /* 수평 가운데 정렬 */
`

export default Layout