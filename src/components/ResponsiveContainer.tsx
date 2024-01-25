import React from 'react';
import useMediaQuery from '@components/useMediaQuery';
import BgImg from "@assets/homeSample.jpg";
import {css} from "@emotion/react";
import Image from "next/image";
import Flex from '@components/common/Flex'
interface ResponsiveContainerProps {
    imageSrc: string;
    webViewContent: React.ReactNode;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ imageSrc, webViewContent }) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent:"center",
        backgroundColor: "#f5f5f5"
      }}
    >
      {isMobile ? null : (
        <aside
          style={{ flex: '0 0 auto', // 고정된 크기로 설정하여 다른 요소들과 충돌하지 않도록 함
            order: 0, // 모바일 화면에서는 이미지가 먼저 나오도록 조정
            display: 'flex',
            justifyContent: 'flex-end', // 이미지를 오른쪽 정렬로 변경
          }}
        >
          {/*<Flex direction="column" justify="center" align="center" style={{height: "100%"}}>*/}
          <img
            src={imageSrc} alt="Image" style={{ maxWidth: '100%', height: 'auto', }}/>
          {/*</Flex>*/}
        </aside>
      )}

      <main style={{ flex: 1, padding: 20, margin: 0, textAlign: 'center', maxWidth: "600px", backgroundColor: "#ffffff"}}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent:"center"}}>
          {webViewContent}
        </div>
      </main>
    </div>
  );
  /*return (
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center',}}>
          {isMobile ? null : (
                  <Image src={BgImg} css={imgStyles} alt="" width={360} height={520}/>
          )}

          <div style={{ flex: 1, padding: 20, order: isMobile ? -1 : 0, minWidth: "390px"}}>
              {webViewContent}
          </div>
      </div>
  );*/
};

const imgStyles = css`
  width: 360px;
  height: 520px;
  border-radius: 7%;
`

export default ResponsiveContainer;