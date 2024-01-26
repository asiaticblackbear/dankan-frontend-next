import React from 'react';
import ResponsiveContainer from '@components/ResponsiveContainer';

function IndexPage(){

    return (
        <ResponsiveContainer
            imageSrc={"https://dkwa-assets.s3.ap-northeast-2.amazonaws.com/app-assets/Title.svg"}
            webViewContent={<iframe src="http://localhost:3000" title="WebView" style={{height: "100vh", width: "100%", maxWidth: "600px"}}/>}
        />
    );
};

export default IndexPage;