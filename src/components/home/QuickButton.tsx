import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import Spacing from "@components/common/Spacing"
import {SvgIcon} from '@mui/material';
import folder from "@mui/icons-material/Folder";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";

function QuickButton() {
        return (
            <div css={quickStyles}>
                <Flex justify="space-between" align="center">
                    <Flex direction="column" align="center">
                        <div>
                            <SvgIcon style={{ color: colors.dankanGrayPoint }} component={folder} inheritViewBox/>
                        </div>
                        <Spacing direction="horizontal" size={7}/>
                        <Text typography="t9" color="dankanGrayTextPoint">추천 단칸</Text>
                    </Flex>
                    <Flex direction="column" align="center">
                        <div>
                            <SvgIcon style={{ color: colors.dankanGrayPoint }} component={folder} inheritViewBox/>
                        </div>
                        <Spacing direction="horizontal" size={7}/>
                        <Text typography="t9" color="dankanGrayTextPoint">단칸 후기</Text>
                    </Flex>
                    <Flex direction="column" align="center">
                        <div>
                            <SvgIcon style={{ color: colors.dankanGrayPoint }} component={folder} inheritViewBox/>
                        </div>
                        <Spacing direction="horizontal" size={7}/>
                        <Text typography="t9" color="dankanGrayTextPoint">단칸 케어</Text>
                    </Flex>
                    <Flex direction="column" align="center">
                        <div>
                            <SvgIcon style={{ color: colors.dankanGrayPoint }} component={folder} inheritViewBox/>
                        </div>
                        <Spacing direction="horizontal" size={7}/>
                        <Text typography="t9" color="dankanGrayTextPoint">공지사항</Text>
                    </Flex>

                </Flex>
            </div>
        )
}

const quickStyles= css`
  margin: 26px 48px 0px 48px;
`
export default QuickButton