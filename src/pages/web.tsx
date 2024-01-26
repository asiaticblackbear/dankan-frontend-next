import React from 'react';
import ResponsiveContainer from '@components/ResponsiveContainer';
import { HOSTING_URL } from '@constants/collection'

function IndexPage(){

    return (
        <ResponsiveContainer
            imageSrc={"https://dkwa-assets.s3.ap-northeast-2.amazonaws.com/app-assets/Title.svg"}
            webViewContent={<iframe src={HOSTING_URL} title="WebView" style={{height: "100vh", width: "100%", maxWidth: "600px"}} sandbox="allow-same-origin allow-scripts allow-popups"/>}
        />
    );
};

export default IndexPage;