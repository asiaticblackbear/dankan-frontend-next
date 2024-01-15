import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import Spacing from "@components/common/Spacing"
import SvgTitle from "@assets/pointTitle.svg";
import {css} from "@emotion/react";
import useHomes from "@components/home/hooks/useHomes";
import userById from "@components/user/hooks/useUser";
import {useEffect, useState} from "react";
import {getExistsByUsername, getUserById} from "@remote/user";
import {User} from "@models/user";
import {userState} from "@/atoms";
import {useRecoilState} from "recoil";

function Point(){
    const hasPoint = true
    const [item, setItem] = useState(0)

    useEffect(() => {
        let uid
        if (typeof window !== "undefined") {
            uid = localStorage.getItem("uid")
            const userPoint = async () => {
                const data = await getUserById(uid!!)
                console.log("dasd"+JSON.stringify(data));
                if(data!==undefined){
                    setItem(data.point as number)
                }else{
                    setItem(0)
                }
            }
            userPoint();
        }

    },[])


    if(hasPoint){
        console.log("dasdasd"+item)
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
                    <Text typography="t8">{item}</Text>
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