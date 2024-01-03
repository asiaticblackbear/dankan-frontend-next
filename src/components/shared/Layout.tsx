import SEO from "./SEO";
import Head from "next/head";
import {useVh} from "@/utils/useVh";
import {ReactNode} from "react";

function Layout({children}:{children: ReactNode}){
    const vh = useVh();
    console.log(`size: ${vh}`)
    return(
        <div css={{width: '100%', height: `${100 * vh}px`,}}>
            <SEO title="단칸" description="단기양도 자취방? 단칸에서 구하자!" image=""/>
            <Head>
                <meta name="viewport" content="width=device=width , initial-scale=1"/>
            </Head>
            {children}
        </div>
    )
}
export default Layout