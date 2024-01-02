import Flex from "@components/Flex";
import Text from "@components/Text"
import Spacing from "@components/Spacing"
import SvgTitle from "@assets/pointTitle.svg";
import {css} from "@emotion/react";

function Point(){
    const hasPoint = true
    if(hasPoint){
        return (
            <Flex justify="space-between" align="center" css={pointStyles}>
                <Flex direction="row" align="center">
                    <div>
                        <SvgTitle width="10" height="10"/>
                    </div>
                    <Spacing direction="horizontal" size={5}/>
                    <Text typography="t8" color="dankanGrayTextPoint">포인트</Text>
                </Flex>
                <Flex  direction="row">
                    <Text typography="t8">0</Text>
                    <Spacing direction="horizontal" size={2}/>
                    <Text typography="t8" color="dankanPrimary" bold={true}>P</Text>
                </Flex>

            </Flex>
        )
    }
}
const pointStyles= css`
  margin: 13px 24px 0px 24px;
`
export default Point