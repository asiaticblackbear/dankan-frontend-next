import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/Flex";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {colors} from "@styles/colorPalette";
import FixedBottomButton from "@components/signin/FixedBottomButtonSginin";
import {useRouter} from "next/router";
import styled from "@emotion/styled";
import {ButtonGroup, Button, ToggleButton, ToggleButtonGroup, Rating, TextField} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Rectangle from "@assets/rectangleTemp.svg"
import ImgClose from "@assets/imgClose.svg"

function FormStep3({onNext}: {
    onNext: (keyword: string) => void
}) {
    const navigate = useRouter()
    const [name, setName] = useState("")
    const [value, setValue] = useState<number | null>(4);
    const [alignment, setAlignment] = React.useState('three');
    const [alignment2, setAlignment2] = React.useState('three2');
    const [alignment3, setAlignment3] = React.useState('three3');
    const [alignment4, setAlignment4] = React.useState('three4');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    const handleChange2 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment2(newAlignment);
    };
    const handleChange3 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment3(newAlignment);
    };
    const handleChange4 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment4(newAlignment);
    };

    const [hover, setHover] = useState(-1);

    let [inputCount, setInputCount] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null)

    const errors = useMemo(() => validateUser(name), [name])
    const isSuccess = Object.keys(errors).length === 0

    const buttons1 = [
        <ToggleButton value="one">불만족해요</ToggleButton>,
        <ToggleButton value="two">보통이에요</ToggleButton>,
        <ToggleButton value="three">{'\u00A0'}만족해요{'\u00A0'}</ToggleButton>
    ];
    const buttons2 = [
        <ToggleButton value="one2">불만족해요</ToggleButton>,
        <ToggleButton value="two2">보통이에요</ToggleButton>,
        <ToggleButton value="three2">{'\u00A0'}만족해요{'\u00A0'}</ToggleButton>
    ];
    const buttons3 = [
        <ToggleButton value="one3">불만족해요</ToggleButton>,
        <ToggleButton value="two3">보통이에요</ToggleButton>,
        <ToggleButton value="three3">{'\u00A0'}만족해요{'\u00A0'}</ToggleButton>
    ];
    const buttons4 = [
        <ToggleButton value="one4">불만족해요</ToggleButton>,
        <ToggleButton value="two4">보통이에요</ToggleButton>,
        <ToggleButton value="three4">{'\u00A0'}만족해요{'\u00A0'}</ToggleButton>
    ];

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
                <Text typography="t6" color="black">교통</Text>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    size="small"
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    {buttons1}
                </ToggleButtonGroup>
            </Flex>
            <Spacing size={15}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black">청결</Text>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment2}
                    exclusive
                    size="small"
                    onChange={handleChange2}
                    aria-label="Platform"
                >
                    {buttons2}
                </ToggleButtonGroup>
            </Flex>
            <Spacing size={15}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black">건물 시설</Text>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment3}
                    exclusive
                    size="small"
                    onChange={handleChange3}
                    aria-label="Platform"
                >
                    {buttons3}
                </ToggleButtonGroup>
            </Flex>
            <Spacing size={15}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black">주변 환경</Text>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment4}
                    exclusive
                    size="small"
                    onChange={handleChange4}
                    aria-label="Platform"
                >
                    {buttons4}
                </ToggleButtonGroup>
            </Flex>

            <Spacing size={32}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" fontWeight={600}>자세한 거주 후기를 작성해주세요</Text>
                <Flex direction="row" align="center">
                    <Text typography="t9" color="dankanPrimary">0</Text>
                    <Spacing direction="horizontal" size={0}/>
                    <Text typography="t9" color="dankanGray">/500P</Text>
                </Flex>

            </Flex>
            <Spacing size={19}/>
            <Flex direction="column">
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    placeholder="최소 20자 이상 작성해주세요 (50자 이상 텍스트 후기는 300P, 포토 후기는 500P)"
                    onChange={onInputHandler}
                    inputProps={{style: {fontSize: 15}}}
                    css={textStyles}
                />
                <Flex direction="row" justify="end" align="center">
                    <Text typography="t9" color="dankanPrimary">{inputCount}</Text>
                    <Spacing direction="horizontal" size={0}/>
                    <Text typography="t9" color="dankanGray">/800자</Text>
                </Flex>
            </Flex>
            <Spacing size={18}/>
            <Flex direction="row" >
            <label htmlFor="upload-image">
                <Flex direction="column" justify="center" align="center" css={borderStyles} onClick={handleClick}>
                    <Rectangle/>
                    <input
                        id="upload-image"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <Spacing size={8}/>
                    <Flex direction="row" justify="end" align="center">
                        <Text typography="t9" color="dankanPrimary">{images.length}</Text>
                        <Spacing direction="horizontal" size={0}/>
                        <Text typography="t9" color="dankanGray">/3</Text>
                    </Flex>
                </Flex>
            </label>
            {/*{imageUrl && <img src={imageUrl} alt="Uploaded Image" css={imgRadiusStyles}/>}*/}
                <Flex direction="row" css={horizonStyles}>
                    {images.map((url, i) => (
                        <div key={url}>
                            <ImgClose
                                onClick={() => handleDeletePreview(i)} css={imgBtnStyles}/>
                            <img src={url} alt={`image${i}`} css={imgRadiusStyles}/>
                        </div>
                    ))}
                </Flex>
            </Flex>
            <Spacing size={120}/>
            <FixedBottomButton label="후기 등록하기" disabled={isSuccess === true} onClick={() => {
                    onNext("")
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

const imgContainerStyle = css`
    padding-top: 8px;
    padding-bottom: 8px;
`

const formContainerStyles = css`
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 24px;
`

const imgBtnStyles = css`
    position: absolute;
    margin-left: 77px;
    margin-bottom: 5px;
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
export default FormStep3
