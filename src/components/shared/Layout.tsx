import SEO from "./SEO";
import Head from "next/head";

function Layout({children}:{children: React.ReactNode}){
    return(
        <div>
            <SEO title="단칸" description="단기양도 자취방? 단칸에서 구하자!" image=""/>
            <Head>
                <meta name="viewport" content="width=device=width , initial-scale=1"/>
            </Head>
            {children}
        </div>
    )
}
export default Layout