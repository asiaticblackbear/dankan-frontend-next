import Flex from "@components/Flex";
import Text from "@components/Text"
import Spacing from "@components/Spacing"
import {SvgIcon} from '@mui/material';
import folder from "@mui/icons-material/Folder";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";

function OutButton() {
    return (
        <div css={outStyles}>
            <Flex direction="column">
                <Text typography="t10" color="dankanGray">로그아웃</Text>
                <Spacing size={10}/>
                <Text typography="t10" color="dankanGray">탈퇴</Text>
            </Flex>
        </div>
    )
}

const outStyles = css`
  margin: 20px 32px 0px 32px;
`
export default OutButton