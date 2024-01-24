import React from 'react';
import ResponsiveContainer from '@components/ResponsiveContainer';

const IndexPage: React.FC = () => {
    const imageSrc = "/Users/kimsigyeong/Desktop/project/dankan-project/front_next/danakn-next/assets/homeSample.jpg";

    return (
        <ResponsiveContainer
            imageSrc={imageSrc}
            webViewContent={<iframe src="http://localhost:3000" title="WebView" style={{height: "100vh"}}/>}
        />
    );
};

export default IndexPage;