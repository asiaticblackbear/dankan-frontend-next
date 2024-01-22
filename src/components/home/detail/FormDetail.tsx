import React, {useEffect, useMemo, useState} from "react";
import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import {css} from "@emotion/react";
import Spacing from "@components/common/Spacing";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {Box, Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import LocateIcon from "@assets/detailLocate.svg";
import AscIcon from "@assets/detailAsc.svg";
import {Home} from "@models/home";
import ListRow from "@components/home/detail/ListRow";

function FormDetail({obj, list, onNext}: { obj: Home, list: Home[], onNext: (keyword: string) => void}) {
    const router = useRouter()

    const [home, setHome] = useState<Home | null>(null);
    const [homeList, setHomeList] = useState<Home[]>([]);
    const [name, setName] = useState("")
    const [sort, setSort] = useState("최신후기순")
    const [value, setValue] = useState<number | null>(0);
    const errors = useMemo(() => validateUser(name), [name])
    const isSuccess = Object.keys(errors).length === 0



    const handleSort = () => {
        if(sort==="과거후기순"){
            const sortedList: Home[] = homeList
                .slice(0)
                .sort((a, b) => {
                    let x = a.id||0
                    let y = b.id||0
                    console.log("내림차",JSON.stringify(a)+" : "+JSON.stringify(b))
                    return y-x
                })
            setHomeList(sortedList)
            setSort("최신후기순")
        }else{
            const sortedList: Home[] = homeList
                .slice(0)
                .sort((a, b) => {
                    let x = a.id||0
                    let y = b.id||0
                    console.log("오름차",JSON.stringify(a)+" : "+JSON.stringify(b))
                    return x-y
                })
            setHomeList(sortedList)
            setSort("과거후기순")
        }
    };
    useEffect(() => {
        setHomeList(list)
    }, [list]);

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#E4E4E4"
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: "#16F1BD"
        },
    }));

    return (
        <div>
        {obj ? (<div>
            <Flex direction="column" css={formContainerStyles}>
                <Spacing size={18}/>
                <Text typography="t3" fontWeight={700}>{obj.name}</Text>
                <Spacing size={17}/>
                <Flex direction="row" align="center">
                    <div>
                        <LocateIcon/>
                    </div>
                    <Spacing direction="horizontal" size={6}/>
                    <div>
                        <Text typography="t9" color="dankanGrayText">{obj.homeAddr}</Text>
                    </div>
                </Flex>
                <Spacing size={17}/>
                <div css={lineSmall}></div>

                <Spacing size={26}/>
                <Flex direction="row" align="center">
                <StyledRating readOnly name="half-rating-read" value={obj.homeTotal} defaultValue={obj.homeTotal} precision={0.1} size="medium"
                              emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}/>
                    <Spacing direction="horizontal" size={13}/>
                    <Text typography="t3">{obj.homeTotal}</Text>
                    <Spacing direction="horizontal" size={4}/>
                    <Text typography="t3" color="dankanGray">/ 5</Text>
                    <Spacing direction="horizontal" size={6}/>
                    <Text typography="t10" color="dankanGray">({list?.length})</Text>
                </Flex>
                <Spacing size={26}/>
                <div css={lineSmall}></div>
                <Spacing size={16}/>
                <Flex direction="row" justify="space-between" align="center">
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Text typography="t9" color="dankanGray" css={listRowContentsStyles2}>교통</Text>
                        <Text typography="t9" css={listRowContentsStyles}>{numberToEvaluation(obj.homeTrfc as number)}</Text>
                    </Flex>

                    <Flex direction="row" css={listRowContentsStyles}>
                        <Box sx={{ width: '100%' }}>
                            <BorderLinearProgress variant="determinate" value={obj.homeTrfc} />
                        </Box>
                        <Spacing direction="horizontal" size={18}/>
                        <Text typography="t9" bold={true}>{obj.homeTrfc}%</Text>
                    </Flex>
                </Flex>
                <Spacing size={15}/>
                <Flex direction="row" justify="space-between" align="center">
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Text typography="t9" color="dankanGray" css={listRowContentsStyles2}>청결</Text>
                        <Text typography="t9" css={listRowContentsStyles}>{numberToEvaluation(obj.homeClean as number)}</Text>
                    </Flex>
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Box sx={{ width: '100%' }}>
                            <BorderLinearProgress variant="determinate" value={obj.homeClean} />
                        </Box>
                        <Spacing direction="horizontal" size={18}/>
                        <Text typography="t9" bold={true}>{obj.homeClean}%</Text>
                    </Flex>
                </Flex>
                <Spacing size={15}/>
                <Flex direction="row" justify="space-between" align="center">
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Text typography="t9" color="dankanGray" css={listRowContentsStyles2}>건물 시설</Text>
                        <Text typography="t9" css={listRowContentsStyles}>{numberToEvaluation(obj.homeFclty as number)}</Text>
                    </Flex>
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Box sx={{ width: '100%' }}>
                            <BorderLinearProgress variant="determinate" value={obj.homeFclty} />
                        </Box>
                        <Spacing direction="horizontal" size={18}/>
                        <Text typography="t9" bold={true}>{obj.homeFclty}%</Text>
                    </Flex>
                </Flex>
                <Spacing size={15}/>
                <Flex direction="row" justify="space-between" align="center" >
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Text typography="t9" color="dankanGray" css={listRowContentsStyles2}>주변 환경</Text>
                        <Text typography="t9" css={listRowContentsStyles}>{numberToEvaluation(obj.homeEnvrn as number)}</Text>
                    </Flex>
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Box sx={{ width: '100%' }}>
                            <BorderLinearProgress variant="determinate" value={obj.homeEnvrn} />
                        </Box>
                        <Spacing direction="horizontal" size={18}/>
                        <Text typography="t9" bold={true}>{obj.homeEnvrn}%</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Spacing size={21}/>
            <div css={lineMedium}></div>
            <Spacing size={21}/>
            <Flex direction="column" css={formContainerStyles}>
                <Flex direction="row" justify="space-between" align="center">
                    <Text typography="t6" fontWeight={600}>{list?.length} 개의 거주 후기</Text>
                    <Flex direction="row" align="center" onClick={handleSort}>
                        <Text typography="t9" color="dankanBlue">{sort}</Text>
                        <Spacing direction="horizontal" size={4}/>
                        <AscIcon/>
                    </Flex>
                </Flex>
                <Spacing size={21}/>
                <div css={lineSmall}></div>
                <Spacing size={16}/>
                <ul>
                    {homeList?.length > 0 ? (
                        homeList?.map((home: Home, index: number) =>
                            <ListRow
                                home={home}
                                onClick={() => {}}
                            />
                        )): null}

                </ul>
            </Flex>
            <Spacing size={40}/>

        </div>): null}
        </div>
    )

    function numberToEvaluation(value: number){
        let evalTitle = ""
        if(value >= 90) evalTitle = "최고에요"
        else if(value >= 80) evalTitle = "만족해요"
        else if(value >= 60) evalTitle = "보통이에요"
        else if(value <= 50) evalTitle = "별로에요"
        return evalTitle
    }
}

function validateUser(name: string) {
    let errors = {}
    if (name.length < 2 || name.length > 12) {
        errors = "최소 2자, 최대 12자를 입력해주세요"
    }
    return errors;
}
const listRowContentsStyles= css`
    flex: 1;
`
const listRowContentsStyles2= css`
    flex: 0.6;
`

const formContainerStyles = css`
    padding-left: 24px;
    padding-right: 24px;
`
const lineSmall = css`
  border-top: 1px solid #F2F2F2;
  margin: 0px 0px;
`

const lineMedium = css`
  border-top: 7px solid #F0F0F0;
`

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: `${colors.dankanPrimary}`,
    },
    '& .MuiRating-iconHover': {
        color: `${colors.dankanSecondPrimary}`,
    },
});
export default FormDetail
