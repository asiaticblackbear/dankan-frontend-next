import React, {useState} from 'react'
import {List, ListItem, Typography, Container, SvgIcon} from '@mui/material'
import Text from '@components/common/Text'
import Grid from '@mui/material/Grid'
import {css} from '@emotion/react'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import {getZipAll} from '@remote/zip'
import {Zip} from '@models/zip'
import Spacing from "@components/common/Spacing";
import Flex from "@components/common/Flex";
import styled from "@emotion/styled";
import Button from "@components/common/Button"
import {colors} from "@styles/colorPalette"; // Import your styles
import {useSnackbar} from "@components/common/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
function DualListSelection() {
    const router = useRouter()
    const showSnackbar = useSnackbar()
    const list1Items = [
        '서울', '부산', '대구', '인천', '광주', '대전', '부산', '울산', '세종', '경기',
        '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
    ]
    const [reg1, setReg1] = useState('서울')
    const [reg2, setReg2] = useState('종로구')
    const [reg3, setReg3] = useState('')

    const {data: Zip1} = useQuery(["reg1", reg1], () => getZipAll(reg1, "", ""))
    const {data: Zip2} = useQuery(["reg2", reg2], () => getZipAll(reg1, reg2, ""))

    const [scrollList, setScrollList] = useState<string[]>([])

    const handleList1Selection = (item: string) => {
        setReg1(item)
    }

    const handleList2Selection = (item: string) => {
        if(item==="전체"){
            addToScrollList(item, 0)
        }else setReg2(item)
    }

    const handleList3Selection = (item: string) => {
        console.log(item)
        addToScrollList(item, 1) // Add corresponding item from List 3
    }

    const addToScrollList = (item: string, index: number) => {
        console.log(reg1+" "+reg2+" "+item+""+scrollList.length)
        item = reg1+" "+reg2+" "+item
        if(index==0) item = reg1+" 전체"
        if(scrollList.length>9){
            console.log("10개 제한");
            return
        }
        if (!scrollList.includes(item)) {
            setScrollList((prevList) => [...prevList, item])
        }
    }

    const removeFromScrollList = (itemToRemove: string) => {
        setScrollList((prevList) => prevList.filter((item) => item !== itemToRemove))
    }

    const clearScrollList = () => {
        setScrollList([])
    }

    return (
        <div>
        <Grid container spacing={0} css={containerStyle}>
            <Grid xs={3}>
                <div css={headerStyle}>
                    <Text typography="t8" color="black">시 · 도</Text>
                </div>
            </Grid>
            <Grid xs={4.5}>
                <div css={headerStyle}>
                    <Text typography="t8" color="black">시 · 구 · 군</Text>
                </div>
            </Grid>
            <Grid xs={4.5}>
                <div css={headerStyle}>
                    <Text typography="t8" color="black">동 · 읍 · 면</Text>
                </div>
            </Grid>
            <Grid xs={3}>
                <List>
                    {list1Items.map((item) => (
                        <div css={itemStyle}>
                            <Text typography="t8" color="dankanGrayTextPoint"
                                  onClick={() => handleList1Selection(item)}>{item}</Text>
                        </div>
                    ))}
                    {/*<Typography>Selected Item in List 1: {selectedList1Item}</Typography>*/}
                </List>
            </Grid>
            <Grid xs={4.5} css={listStyle}>
                {Zip1?.length !== 0 ? (
                    <List>
                        {Zip1?.map((item: Zip, index: number) => (
                            <div css={itemStyle}>
                                <Text typography="t8" color="dankanGrayTextPoint"
                                      onClick={() => handleList2Selection(item.reg2||'전체')}>{item.reg2||'전체'}</Text>
                            </div>
                        ))}
                    </List>
                ) : null}
            </Grid>
            <Grid xs={4.5}>
                <List>
                    {Zip2?.map((item: Zip, index: number) => (
                        <div css={itemStyle}>
                            <Text typography="t8" color="dankanGrayTextPoint"
                                  onClick={() => handleList3Selection(item.reg3||'전체')}>{item.reg3||'전체'}</Text>
                        </div>
                    ))}
                </List>
            </Grid>
        </Grid>
    <MyContainer>
        <Spacing size={13}/>
        <Flex direction="row" justify="space-between" align="center">
            <Flex direction="row" justify="start" align="center">
                <Text typography="t9" color="dankanPrimary">{scrollList.length}</Text>
                <Spacing direction="horizontal" size={0}/>
                <Text typography="t9" color="dankanGray">/10</Text>
            </Flex>
            <Text typography="t9" color="dankanGray" onClick={clearScrollList}>초기화</Text>
        </Flex>
        <Spacing size={14}/>
        <Flex direction="row" css={horizonStyles}>
            {scrollList.map((item) => (
                <Flex direction="row" align="center"  onClick={() => removeFromScrollList(item)} css={selectedStyle}>
                    <Text typography="t7" color="dankanSecondPrimary">{item}</Text>
                    <Spacing direction="horizontal" size={6}></Spacing>
                    <SvgIcon style={{ color: colors.dankanSecondPrimary, fontSize: 16 }} component={CloseIcon} inheritViewBox/>
                </Flex>
            ))}
        </Flex>
        <Spacing size={14}/>
        <div css={lineSmall}></div>
        <Spacing size={15}/>
        <Flex justify="between-space" direction="row">
            <Button full={true} size="medium" color="normal" css={buttonStyle} style={{marginRight: 12}}>건물명으로
                검색</Button>
            <Button full={true} size="medium" css={buttonStyle} style={{marginLeft: 12}}>확인</Button>
        </Flex>
    </MyContainer>
        </div>
    )
}

const selectedStyle = css`
    border: 1px solid #16F1BD;
    border-radius: 4px;
    background-color: #ffffff;
    opacity: 0.9;
    padding: 12px 12px 12px 12px;
    margin-right: 4px;
`

const MyContainer = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  rigtht: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 24px 20px 24px
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
const buttonStyle = css`
  border-radius: 8px;
  font-weight: normal;
`
const lineSmall = css`
  border-top: 1px solid #F2F2F2;
  margin: 0px 0px;
`

const lineColumnSmall = css`
  border-right: 1px solid #F2F2F2;
  margin: 0px 0px;
`


const containerStyle = css`
  padding-left: 0;
  padding-right: 0;
`

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F6F6F6; /* 흰색 배경색*/
  padding-top: 12px;
  padding-bottom: 12px;
  border: 1px solid #E4E4E4; /* 회색 테두리 */
`

const listStyle = css`
  border-left: 1px solid #E4E4E4; /* 회색 테두리 */
  border-right: 1px solid #E4E4E4; /* 회색 테두리 */
`

const itemStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white; /* 흰색 배경색*/
  padding-top: 12px;
  padding-bottom: 12px;
`

export default DualListSelection
