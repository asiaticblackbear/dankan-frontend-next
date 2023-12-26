import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Global} from "@emotion/react";
import globalStyles from "@styles/globalStyles";
import Layout from "@shared/Layout";
import {useNavigate} from "react-router-dom";

function MyApp({Component, pageProps}: AppProps) {
    let component =
        <Layout>
            <Global styles={globalStyles}/>
            <Component {...pageProps} />
        </Layout>
    return component
}

export default MyApp
