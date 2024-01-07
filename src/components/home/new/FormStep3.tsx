import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/Flex";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {colors} from "@styles/colorPalette";
import {User} from "@models/user";
import MuiTextField from '@mui/material/TextField';
import NavbarBack from "@components/NavbarBack";
import FixedBottomButton from "@components/signin/FixedBottomButtonSginin";
import {useRouter} from "next/router";
import styled from "@emotion/styled";
import {ButtonGroup, Button, Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

function FormStep3({onNext}: {
    onNext: (keyword: string) => void
}) {
    const navigate = useRouter()
    const [name, setName] = useState("")
    const [value, setValue] = useState<number | null>(2);
    const [hover, setHover] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null)

    const errors = useMemo(() => validateUser(name), [name])
    const isSuccess = Object.keys(errors).length === 0

    const buttons1 = [
        <Button key="one">불만족해요</Button>,
        <Button key="two">보통이에요</Button>,
        <Button key="three">만족해요</Button>,
    ];
    const buttons2 = [
        <Button key="one">불만족해요</Button>,
        <Button key="two">보통이에요</Button>,
        <Button key="three">만족해요</Button>,
    ];
    const buttons3 = [
        <Button key="one">불만족해요</Button>,
        <Button key="two">보통이에요</Button>,
        <Button key="three">만족해요</Button>,
    ];
    const buttons4 = [
        <Button key="one">불만족해요</Button>,
        <Button key="two">보통이에요</Button>,
        <Button key="three">만족해요</Button>,
    ];

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, []);

    const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    return (
        <Flex direction="column" css={formContainerStyles}>
            <Spacing size={48}/>
            <Text typography="t3" fontWeight={700}>거주한 집은 어떠셨나요?</Text>
            <Spacing size={22}/>
            <StyledRating name="half-rating-read" value={value} defaultValue={3} precision={0.5} size="large"
                          onChange={(event, newValue) => {
                              setValue(newValue);
                          }}
                          onChangeActive={(event, newHover) => {
                              setHover(newHover);
                          }}
                          emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
            />
            <Spacing size={14}/>
            <Text typography="t9" color="dankanGrayText">탭해서 총점을 평가해주세요</Text>
            <Spacing size={22}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black" >교통</Text>
                <ButtonGroup color="primary" aria-label="small secondary button group">
                    {buttons1}
                </ButtonGroup>
            </Flex>
            <Spacing size={15}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black" >청결</Text>
                <ButtonGroup color="primary" aria-label="small secondary button group">
                    {buttons2}
                </ButtonGroup>
            </Flex>
            <Spacing size={15}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black" >건물 시설</Text>
                <ButtonGroup color="primary" aria-label="small secondary button group">₩₩
                    {buttons3}
                </ButtonGroup>
            </Flex>
            <Spacing size={15}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black" >주변 환경</Text>
                <ButtonGroup color="primary" aria-label="small secondary button group">
                    {buttons4}
                </ButtonGroup>
            </Flex>

            <Spacing size={32}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" fontWeight={600}>자세한 거주 후기를 작성해주세요</Text>
                <Flex direction="row" align="center">
                    <Text typography="t9" color="dankanPrimary" >0</Text>
                    <Spacing direction="horizontal" size={0}/>
                    <Text typography="t9" color="dankanGray">/500P</Text>
                </Flex>

            </Flex>

            <Spacing size={68}/>

            <FixedBottomButton label="후기 등록하기" disabled={isSuccess === false} onClick={() => {
                navigate.push(`/user/info`)
            }}/>

        </Flex>
    )
}

function validateUser(name: string) {
    let errors = {}
    if (name.length < 2 || name.length > 12) {
        errors = "최소 2자, 최대 12자를 입력해주세요"
    }
    return errors;
}

const formContainerStyles = css`
  padding-left: 24px;
  padding-right: 24px;
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

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: `${colors.dankanPrimary}`,
    },
    '& .MuiRating-iconHover': {
        color: `${colors.dankanSecondPrimary}`,
    },
});
export default FormStep3
