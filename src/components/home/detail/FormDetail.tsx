import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/Flex";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {colors} from "@styles/colorPalette";
import FixedBottomButton from "@components/user/FixedBottomButtonSginin";
import {useRouter} from "next/router";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {Box, Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Rectangle from "@assets/rectangleTemp.svg"
import ImgClose from "@assets/imgClose.svg"
import LocateIcon from "@assets/detailLocate.svg";
import AscIcon from "@assets/detailAsc.svg";

function FormDetail({onNext}: {
    onNext: (keyword: string) => void
}) {
    const navigate = useRouter()
    const [name, setName] = useState("")
    const [value, setValue] = useState<number | null>(4);
    const [alignment, setAlignment] = React.useState('three');
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const [hover, setHover] = useState(-1);

    let [inputCount, setInputCount] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null)

    const errors = useMemo(() => validateUser(name), [name])
    const isSuccess = Object.keys(errors).length === 0



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

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, []);

    const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputCount(e.target.value.length)
    };

    const [imageUrl, setImageUrl] = useState(null);
    const [images, setImages] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent) => {
        const targetFiles = (e.target as HTMLInputElement).files as FileList;
        const targetFilesArray = Array.from(targetFiles);
        console.log("길이:"+images.length)
        if(images.length>2){
            console.log("추가 불가능")
            return
        }
        const selectedFiles: string[] = targetFilesArray.map((file) => {
            console.log(JSON.stringify(file))
            return URL.createObjectURL(file);
        });
        setImages((prev) => prev.concat(selectedFiles));
    }

    const handleDeletePreview = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const fileRef = useRef<HTMLInputElement>(null);
    // input click method
    const handleClick = () => {
        fileRef?.current?.click();
    };

    return (
        <div>
            <Flex direction="column" css={formContainerStyles}>
                <Spacing size={18}/>
                <Text typography="t3" fontWeight={700}>한양빌라</Text>
                <Spacing size={17}/>
                <Flex direction="row" align="center">
                    <div>
                        <LocateIcon/>
                    </div>
                    <Spacing direction="horizontal" size={6}/>
                    <div>
                        <Text typography="t9" color="dankanGrayText">안산 상록구 사동 103-17</Text>
                    </div>
                </Flex>
                <Spacing size={17}/>
                <div css={lineSmall}></div>

                <Spacing size={26}/>
                <Flex direction="row" align="center">
                <StyledRating readOnly name="half-rating-read" value={value} defaultValue={3} precision={0.5} size="medium"
                              emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}/>
                    <Spacing direction="horizontal" size={13}/>
                    <Text typography="t3">4.5</Text>
                    <Spacing direction="horizontal" size={4}/>
                    <Text typography="t3" color="dankanGray">/ 5</Text>
                    <Spacing direction="horizontal" size={6}/>
                    <Text typography="t10" color="dankanGray">(2)</Text>
                </Flex>
                <Spacing size={26}/>
                <div css={lineSmall}></div>
                <Spacing size={16}/>
                <Flex direction="row" justify="space-between" align="center">
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Text typography="t9" color="dankanGray" css={listRowContentsStyles2}>교통</Text>
                        <Text typography="t9" css={listRowContentsStyles}>편리해요</Text>
                    </Flex>

                    <Flex direction="row" css={listRowContentsStyles}>
                        <Box sx={{ width: '100%' }}>
                            <BorderLinearProgress variant="determinate" value={50} />
                        </Box>
                        <Spacing direction="horizontal" size={18}/>
                        <Text typography="t9" bold={true}>85%</Text>
                    </Flex>
                </Flex>
                <Spacing size={15}/>
                <Flex direction="row" justify="space-between" align="center">
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Text typography="t9" color="dankanGray" css={listRowContentsStyles2}>청결</Text>
                        <Text typography="t9" css={listRowContentsStyles}>편리해요</Text>
                    </Flex>
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Box sx={{ width: '100%' }}>
                            <BorderLinearProgress variant="determinate" value={50} />
                        </Box>
                        <Spacing direction="horizontal" size={18}/>
                        <Text typography="t9" bold={true}>85%</Text>
                    </Flex>
                </Flex>
                <Spacing size={15}/>
                <Flex direction="row" justify="space-between" align="center">
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Text typography="t9" color="dankanGray" css={listRowContentsStyles2}>건물 시설</Text>
                        <Text typography="t9" css={listRowContentsStyles}>편리해요</Text>
                    </Flex>
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Box sx={{ width: '100%' }}>
                            <BorderLinearProgress variant="determinate" value={50} />
                        </Box>
                        <Spacing direction="horizontal" size={18}/>
                        <Text typography="t9" bold={true}>85%</Text>
                    </Flex>
                </Flex>
                <Spacing size={15}/>
                <Flex direction="row" justify="space-between" align="center" >
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Text typography="t9" color="dankanGray" css={listRowContentsStyles2}>주변 환경</Text>
                        <Text typography="t9" css={listRowContentsStyles}>편리해요</Text>
                    </Flex>
                    <Flex direction="row" css={listRowContentsStyles}>
                        <Box sx={{ width: '100%' }}>
                            <BorderLinearProgress variant="determinate" value={50} />
                        </Box>
                        <Spacing direction="horizontal" size={18}/>
                        <Text typography="t9" bold={true}>85%</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Spacing size={21}/>
            <div css={lineMedium}></div>
            <Spacing size={21}/>
            <Flex direction="column" css={formContainerStyles}>
                <Flex direction="row" justify="space-between" align="center">
                    <Text typography="t6" fontWeight={600}>2개의 거주 후기</Text>
                    <Flex direction="row" align="center">
                        <Text typography="t9" color="dankanBlue">최신후기순</Text>
                        <Spacing direction="horizontal" size={4}/>
                        <AscIcon/>
                    </Flex>
                </Flex>
                <Spacing size={21}/>
                <div css={lineSmall}></div>
                <Spacing size={16}/>
                <ul>


                </ul>
            </Flex>
            <Spacing size={40}/>
        </div>
    )
}

function validateUser(name: string) {
    let errors = {}
    if (name.length < 2 || name.length > 12) {
        errors = "최소 2자, 최대 12자를 입력해주세요"
    }
    return errors;
}

const imgContainerStyle = css`
    padding-top: 8px;
    padding-bottom: 8px;
`

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

const imgBtnStyles = css`
    position: absolute;
    margin-left: 77px;
    margin-bottom: 5px;
`

const lineSmall = css`
  border-top: 1px solid #F2F2F2;
  margin: 0px 0px;
`

const lineMedium = css`
  border-top: 7px solid #F0F0F0;
`

const linkStyles = css`
    text-align: center;

    & > span:hover {
        color: ${colors.blue};
    }
`
const imgStyles = css`
    width: 24px;
    height: 24px;
    margin-right: 13px;
`

const textStyles = css`
    font-size: 15px;
    line-height: 1.5;
`

const borderStyles = css`
    border-radius: 7px;
    border: 1px solid #A5A5A5;
    width: 79px;
    height: 79px;
    margin-bottom: 24px;
`
const imgRadiusStyles = css`
    border-radius: 7px;
    width: 79px;
    height: 79px;
    margin-left: 13px;
`

const horizonStyles = css`
    -ms-overflow-style: none;
    scrollbar-width: none;
    white-space:nowrap;
    overflow-x:scroll;
    ::-webkit-scrollbar {
        display: none;
    }
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
