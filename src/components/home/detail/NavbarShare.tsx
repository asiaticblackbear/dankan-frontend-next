import Flex from "@components/common/Flex";
import Spacing from "@components/common/Spacing";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";
import {SvgIcon} from '@mui/material';
import ArrowLeftIcon from "@mui/icons-material/ArrowBackIos";
import ShareIcon from "@assets/detailShare.svg"
import LikeButton from "@components/common/LikeButton"
import {useSnackbar} from "@components/common/Snackbar";
import { useEffect, useState } from 'react'

function NavbarShare({homeSer}:({homeSer:string})) {
    const router = useRouter()
    const {showSnackbar} = useSnackbar()
    const [like, setLike] = useState(false)
    console.log("NavbarShare", homeSer)
    const handleShare = () => {
        const shareUrl = `${window.location.origin}/share?data=${encodeURIComponent('shared-data')}`;
        // 예시: 클립보드에 복사하는 방법은 브라우저 API나 라이브러리를 사용할 수 있습니다.
        navigator.clipboard.writeText(shareUrl);
        showSnackbar("클립보드에 복사 되었습니다");
    };
    return (
        <Flex justify="space-between" align="center" css={navbarContainerStyles}>
            <div onClick={()=>{
                router.back();
            }}>
                <SvgIcon style={{color: colors.dankanGrayTextPoint, fontSize: 24}} component={ArrowLeftIcon}
                             inheritViewBox/>
            </div>
            <Flex direction="row" align="center">
                    <div onClick={handleShare}>
                        <ShareIcon style={{fontSize: 24}}/>
                    </div>
                    <Spacing direction="horizontal"  size={21}/>
                    <div>
                        <LikeButton homeSer={homeSer}/>
                    </div>
            </Flex>
        </Flex>
    )
}

const navbarContainerStyles = css`
  padding: 14px 24px 14px 24px;
  position: sticky;
    max-height: 55px;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  /*border-bottom: 1px solid;*/
`

export default NavbarShare