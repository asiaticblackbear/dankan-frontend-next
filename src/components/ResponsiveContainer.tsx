import React from 'react';
import useMediaQuery from '@components/useMediaQuery';
import BgImg from "@assets/homeSample.jpg";
import {css} from "@emotion/react";
import Image from "next/image";
interface ResponsiveContainerProps {
    imageSrc: string;
    webViewContent: React.ReactNode;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ imageSrc, webViewContent }) => {
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row',}}>
            {isMobile ? null : (
                /*<img src={imageSrc} alt="Image" style={{ maxWidth: '100%', height: 'auto' }} />*/
                    <Image src={BgImg} css={imgStyles} alt="" width={360} height={520}/>
            )}

            <div style={{ flex: 1, padding: 20, order: isMobile ? -1 : 0 }}>
                {webViewContent}
            </div>
        </div>
    );
};

const imgStyles = css`
  width: 360px;
  height: 520px;
  border-radius: 7%;
`

export default ResponsiveContainer;