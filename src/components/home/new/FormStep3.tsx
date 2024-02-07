import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import {css} from "@emotion/react";
import Spacing from "@components/common/Spacing";
import {colors} from "@styles/colorPalette";
import FixedBottomButton from "@components/user/FixedBottomButtonSginin";
import {useRouter} from "next/router";
import styled from "@emotion/styled";
import { ButtonGroup, Button, ToggleButton, ToggleButtonGroup, Rating, TextField, SvgIcon } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import Rectangle from "@assets/rectangleTemp.svg"
import ImgClose from "@assets/imgClose.svg"
import {Home} from "@models/home";
import {useSnackbar} from "@components/common/Snackbar";
import BgImg from "@assets/pngegg.png";
import Image from "next/image";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay'
import { StyledToggleButtonGroup } from '@components/home/StyledToggleButtonGroup'
function FormStep3({setHome, onNext}: {setHome: Home, onNext: (keyword: any, point: number, imageFiles: File[]) => void}){
    const router = useRouter()
    const { showSnackbar } = useSnackbar();

    const [name, setName] = useState("")
    const [starValue, setStarValue] = useState<number | null>(2);
    const [hover, setHover] = useState(-1);

    const [alignment, setAlignment] = useState('3');
    const [alignment2, setAlignment2] = useState('3');
    const [alignment3, setAlignment3] = useState('3');
    const [alignment4, setAlignment4] = useState('3');
    let [inputCntn, setInputCntn] = useState("");
    let [inputCount, setInputCount] = useState(0);
    let [point, setPoint] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [images, setImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const isSuccess = inputCntn.length < 20

    console.log(setHome)

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {

        console.log(newAlignment)
        if(newAlignment===null){
            setAlignment('2')
            showSnackbar("만족도를 입력해주세요");
        }else setAlignment(newAlignment);
    };
    const handleChange2 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if(newAlignment===null){
            setAlignment2('2')
            showSnackbar("만족도를 입력해주세요");
        }else setAlignment2(newAlignment);
    };
    const handleChange3 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if(newAlignment===null){
            setAlignment3('2')
            showSnackbar("만족도를 입력해주세요");
        }else setAlignment3(newAlignment);
    };
    const handleChange4 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if(newAlignment===null){
            setAlignment4('2')
            showSnackbar("만족도를 입력해주세요");
        }else setAlignment4(newAlignment);
    };

    const points = useMemo(() => userPoint(inputCntn, images), [inputCntn, images])
    const [totalTitle, setTotalTitle] = useState("탭해서 총점을 평가해주세요")

    function userPoint(cntn: string, img: any):number{
        console.log("호출11")
        let point = 0
        if(img.length>0){
            point=500
        }else{
            point=0
            if(cntn.length>=50){
               point=300
           }
        }
        setPoint(point)
        return point
    }

    const buttons1 = [
        <ToggleButton value="1" sx={{ paddingLeft: '16px', paddingRight:"10px" }}>불만족해요</ToggleButton>,
        <ToggleButton value="2" sx={{ paddingLeft: '14px', paddingRight:"14px" }}>보통이에요</ToggleButton>,
        <ToggleButton value="3" sx={{ paddingLeft: '18px', paddingRight:"16px" }}>{'\u00A0'}만족해요{'\u00A0'}</ToggleButton>
    ];
    const buttons2 = [
        <ToggleButton value="1" sx={{ paddingLeft: '16px', paddingRight:"10px" }}>불만족해요</ToggleButton>,
        <ToggleButton value="2" sx={{ paddingLeft: '14px', paddingRight:"14px" }}>보통이에요</ToggleButton>,
        <ToggleButton value="3" sx={{ paddingLeft: '18px', paddingRight:"16px" }}>{'\u00A0'}만족해요{'\u00A0'}</ToggleButton>
    ];
    const buttons3 = [
        <ToggleButton value="1" sx={{ paddingLeft: '16px', paddingRight:"10px" }}>불만족해요</ToggleButton>,
        <ToggleButton value="2" sx={{ paddingLeft: '14px', paddingRight:"14px" }}>보통이에요</ToggleButton>,
        <ToggleButton value="3" sx={{ paddingLeft: '18px', paddingRight:"16px" }}>{'\u00A0'}만족해요{'\u00A0'}</ToggleButton>
    ];
    const buttons4 = [
        <ToggleButton value="1" sx={{ paddingLeft: '16px', paddingRight:"10px" }}>불만족해요</ToggleButton>,
        <ToggleButton value="2" sx={{ paddingLeft: '14px', paddingRight:"14px" }}>보통이에요</ToggleButton>,
        <ToggleButton value="3" sx={{ paddingLeft: '18px', paddingRight:"16px" }}>{'\u00A0'}만족해요{'\u00A0'}</ToggleButton>
    ];


    function fnTotalTitle(value: any){
        console.log(value);
        switch (value){
            case 0:
                setTotalTitle("탭해서 총점을 평가해주세요")
                break;
            case 1:
                setTotalTitle("아주 별로인 집이에요!")
                break;
            case 2:
                setTotalTitle("조금 부족한 집이에요!")
                break;
            case 3:
                setTotalTitle("대체로 평범한 집이에요!")
                break;
            case 4:
                setTotalTitle("적당히 좋은 집이에요!")
                break;
            case 5:
                setTotalTitle("정말 최고의 집이에요!")
                break;
        }
    }

    const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value
        if(newValue.length<20){
            //showSnackbar("최소 20자 이상 작성해주세요");
            setInputCntn(newValue);
        }

        if(newValue.length>=50) {
            setPoint(300);
        }else{
            setPoint(0);
        }

        if(newValue.length>=800){
            showSnackbar("최대 800자 까지만 작성가능합니다");
        }else if(newValue.length>799){

            setInputCntn(newValue.substring(0, 799));
        } else{
            setInputCntn(newValue)
        }
        setInputCount(newValue.length)
    };


    const videoExtensions = ['.mp4', '.webm', '.ogg'];

    const handleFileChange = (e: React.ChangeEvent) => {
        const targetFiles = (e.target as HTMLInputElement).files as FileList;
        let targetFilesArray = Array.from(targetFiles);
        console.log("길이:"+targetFilesArray.length+" / "+images.length)

        if(images.length>2||targetFilesArray.length>3){
            showSnackbar("최대 3장의 사진만 등록가능합니다.");
            return
        }
        if(images.length>1&&targetFilesArray.length>1){
            showSnackbar("최대 3장의 사진만 등록가능합니다.");
            return
        }
        /*다중 선택이면 체크*/
        /*if(targetFilesArray.length>=2){
            if(images.length===2){
                console.log("1: ", images.length)
                targetFilesArray = targetFilesArray.slice(0, 1)
            }else{
                console.log("2: ", images.length)
                targetFilesArray = targetFilesArray.slice(0, (3-images.length))
            }
            showSnackbar("최대 3장의 사진만 등록가능합니다.");
        }*/
        console.log(targetFilesArray.length+" : "+images.length)

        const selectedImageFiles: File[] = targetFilesArray.map((file) => {
            console.log("selectedImageFiles", JSON.stringify(file))

            return file;
        });

        const selectedFiles: string[] = targetFilesArray.map((file) => {
            console.log("selectedFiles", JSON.stringify(URL.createObjectURL(file)))

            console.log("selectedImageFiles1", file.name+"/"+file.type)
            const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2); // 파일 확장자 추출
            const isVideoFile = videoExtensions.includes(`.${fileExtension.toLowerCase()}`);
            let url = "temp"
            if(!isVideoFile) url = URL.createObjectURL(file);
            else url = URL.createObjectURL(file)+".mp4";
            /*else{
                console.log("selectedFiles", file.type.startsWith('video/'))
                /!*url = URL.createObjectURL(file)+".mp4";*!/
                if (file && file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.addEventListener('loadeddata', () => {
                        // 비디오의 첫 프레임 캡처
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext('2d');
                        ctx!!.drawImage(video, 0, 0, canvas.width, canvas.height);

                        // 캔버스의 데이터를 이미지 URL로 변환하여 이미지에 설정
                        const thumbnailUrl = canvas.toDataURL('image/jpeg');
                        url = thumbnailUrl;
                        console.log("selectedFiles", url)
                        // 비디오 요소 및 캔버스 삭제
                        video.remove();
                        canvas.remove();
                    });

                    // 비디오의 metadata 로딩
                    video.load();
                }
            }*/
            console.log("selectedImageFiles2", fileExtension+", "+isVideoFile+"= "+url)
            return url
        });
        setImages((prev) => prev.concat(selectedFiles));
        setImageFiles((prev)=> prev.concat(selectedImageFiles));
    }

    const generateVideoThumbnail = async (videoFileName: string): Promise<string> => {
        // 비디오 썸네일을 가져오는 로직 추가
        // 예를 들어, 서버 측에서 비디오를 처리하여 썸네일을 생성하거나,
        // 비디오 파일로부터 첫 프레임을 추출하여 이미지 URL을 반환하는 방법 등이 있을 수 있습니다.

        // 여기서는 단순히 동영상 파일의 경로를 이용하여 썸네일 이미지 파일 경로를 반환하는 것으로 가정합니다.
        return `/thumbnails/${videoFileName.replace(/\.[^/.]+$/, ".jpg")}`;
    };

    const handleDeletePreview = (index: number) => {
        const newImages = [...images];
        const newFiles = [...imageFiles];
        newImages.splice(index, 1);
        newFiles.splice(index, 1);
        setImages(newImages);
        setImageFiles(newFiles)
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
            <div css={divStyles}>
                <StyledRating name="half-rating-read" value={starValue} defaultValue={0}
                              precision={1} size="large"
                              onChange={(event, newValue) => {
                                  setStarValue(newValue)
                                  fnTotalTitle(newValue);

                              }}
                              onChangeActive={(event, newHover) => {
                                  setHover(newHover);
                              }}
                              emptyIcon={
                                  <StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                />
            </div>
            <Spacing size={14}/>
            <Text typography="t9" color="dankanGrayText">{totalTitle}</Text>
            <Flex direction="row" justify="space-between" align="center" style={{display: "none"}}>
                <Text typography="t6" color="black">임시</Text>
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  size="small"
                  onChange={handleChange}
                  aria-label="group1"
                  className="group1">
                    {buttons1}
                </ToggleButtonGroup>
            </Flex>
            <Spacing size={22}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black">교통</Text>
                <StyledButtonGroup
                    value={alignment}
                    exclusive
                    size="small"
                    onChange={handleChange}
                    aria-label="group1"
                    className="group1">
                    {buttons1}
                </StyledButtonGroup>
            </Flex>
            <Spacing size={15}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black">청결</Text>
                <StyledButtonGroup
                    value={alignment2}
                    exclusive
                    size="small"
                    onChange={handleChange2}
                    aria-label="group2"
                    className="group2"
                >
                    {buttons2}
                </StyledButtonGroup>
            </Flex>
            <Spacing size={15}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black">건물 시설</Text>
                <StyledButtonGroup
                    value={alignment3}
                    exclusive
                    size="small"
                    onChange={handleChange3}
                    aria-label="group3"
                    className="group3"
                >
                    {buttons3}
                </StyledButtonGroup>
            </Flex>
            <Spacing size={15}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" color="black">주변 환경</Text>
                <StyledButtonGroup
                    value={alignment4}
                    exclusive
                    size="small"
                    onChange={handleChange4}
                    aria-label="group4"
                    className="group4"
                >
                    {buttons4}
                </StyledButtonGroup>
            </Flex>

            <Spacing size={32}/>
            <Flex direction="row" justify="space-between" align="center">
                <Text typography="t6" fontWeight={600}>자세한 거주 후기를 작성해주세요</Text>
                <Flex direction="row" align="center">
                    <Text typography="t9" color="dankanPrimary">{point}</Text>
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
                    value={inputCntn}
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
                        multiple accept="image/*, video/*"
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
                        <div key={url} >
                            <ImgClose
                                onClick={() => handleDeletePreview(i)} css={imgBtnStyles}/>
                            {isVideoChecked(url, i)}
                            {/*<Image src={url} width={80} height={75} alt={`image${i}`} css={imgRadiusStyles}/>*/}
                        </div>
                    ))}
                </Flex>
            </Flex>
            <Spacing size={120}/>
            <FixedBottomButton label="후기 등록하기" disabled={isSuccess} onClick={() => {

                    const data = {
                        cntn: inputCntn,
                        homeTotal: starValue,
                        homeTrfc: alignment,
                        homeClean: alignment2,
                        homeFclty: alignment3,
                        homeEnvrn: alignment4,
                        filePath1: "",
                        filePath2: "",
                        filePath3: "",
                    }
                    onNext(data, point, imageFiles)
            }}/>

        </Flex>
    )
}

function isVideoChecked(file: string, index: number) {
    const videoExtensions = ['.mp4', '.webm', '.ogg']
    let fileExtension = file.slice(((file.lastIndexOf('.') - 1) >>> 0) + 2) // 파일 확장자 추출
    let isVideoFile = videoExtensions.includes(`.${fileExtension.toLowerCase()}`)
    if (isVideoFile) {
        return (
          /*<Flex css={videoStyles} justify="center">
              <SvgIcon style={{ color: colors.dankanPrimary, fontSize: 12 }} component={SmartDisplayIcon} inheritViewBox />
          </Flex>*/
          <Image src={BgImg} width={80} height={75} alt={`image${index}`} css={videoStyles}/>
        )
    } else {
        return (
          <Image src={file} width={80} height={75} alt={`image${index}`} css={imgRadiusStyles}/>
        )
    }
}

const videoStyles = css`
    border-radius: 7px;
    width: 80px;
    height: 75px;
    margin: 4px 12px 2px 4px;
    background-color: #f5f5f5;   
`

const imgStyles = css`
    width: 84px;
    height: 74px;
    border-radius: 7%;
`

function validateUser(cntn: string) {
    let errors = {}
    if (cntn.length < 20) {
        errors = "최소 20자 이상 작성해주세요"
    }
    if(cntn.length > 800) {
        errors = "최대 800자 까지만 작성가능합니다"
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
    height: 100vh;
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`

const linkStyles = css`
    text-align: center;

    & > span:hover {
        color: ${colors.blue};
    }
`
const divStyles = css`
  width: 100%
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
    width: 80px;
    height: 75px;
    margin: 4px 12px 2px 4px;
`
/*margin-left: 77px;
margin-bottom: 5px;*/
const imgBtnStyles = css`
    position: relative;
    bottom: 60px; /* 조절 가능한 top 값 */
    left: 98px; /* 조절 가능한 right 값 */
`
const horizonStyles = css`
    display: flex;
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
        color: '#16F1BD',
    },
    '& .MuiRating-iconHover': {
        color: '#41CFAD',
    },
});

const StyledButtonGroup = styled(ToggleButtonGroup)({
    color: "#656565",
    backgroundColor: "#ffffff",
    '.MuiToggleButton-root.Mui-selected':{
        backgroundColor: "#16F1BD",
        color: "#ffffff",
    }
})

const StyledButtonGroup2 = styled(ToggleButtonGroup)({
    color: "#656565",
    backgroundColor: "#ffffff",
    '.MuiToggleButton-root.Mui-selected':{
        backgroundColor: "#16F1BD",
        color: "#ffffff",
    }
})


export default FormStep3
