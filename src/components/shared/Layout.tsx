import SEO from "./SEO";
import Head from "next/head";
import {useVh} from "@/utils/useVh";
import {ReactNode} from "react";
import AppLayout from '@components/AppLayout'

function Layout({children}:{children: ReactNode}){
    //const vh = useVh();
    //console.log(`size: ${vh}`)
    const vh = useVh();
    return(
        <div css={{width:"100%", height: `${100*vh}px`}}>
            <SEO title="단칸" description="단기양도 자취방? 단칸에서 구하자!" image="https://dkwa-assets.s3.ap-northeast-2.amazonaws.com/images/logo.png"/>
            <Head>
                <meta name="viewport" content="width=device-width , initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
            </Head>
            {children}
        </div>
    )
}
export default Layout