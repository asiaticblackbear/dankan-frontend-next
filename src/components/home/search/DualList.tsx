import React, { useState } from 'react'
import { Button, List, ListItem, Typography, Container } from '@mui/material'
import Text from '@components/common/Text'
import Grid from '@mui/material/Grid'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getZipAll } from '@remote/zip'
import { Zip } from '@models/zip' // Import your styles

function DualListSelection() {
  const router = useRouter()

  const [reg1, setReg1] = useState('서울')
  const [reg2, setReg2] = useState('종로구')
  const [reg3, setReg3] = useState('')

  const {data} = useQuery(["reg1", reg1], ()=>getZipAll(reg1, "", ""))

  //const {data} = useQuery(["reg1", reg1], ()=>getZipAll(reg1, reg1, ""))

  const list1Items = [
    '서울', '부산', '대구', '인천', '광주', '대전', '부산', '울산', '세종', '경기',
    '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
  ]

  const list2Items = ['']
  const list3Items = ['']

  const [selectedList1Item, setSelectedList1Item] = useState('서울')
  const [selectedList2Item, setSelectedList2Item] = useState('종로구')
  const [scrollList, setScrollList] = useState([])

  const handleList1Selection = (item: string) => {
    setSelectedList1Item(item)
    setSelectedList2Item(null)
    addToScrollList(list1Items.indexOf(item)) // Add corresponding item from List 3
  }

  const handleList2Selection = (item: string) => {
    setSelectedList2Item(item)
    addToScrollList(list2Items.indexOf(item)) // Add corresponding item from List 3
  }

  const addToScrollList = (index) => {
    const newItem = list3Items[index]
    if (!scrollList.includes(newItem)) {
      setScrollList((prevList) => [...prevList, newItem])
    }
  }

  const removeFromScrollList = (itemToRemove) => {
    setScrollList((prevList) => prevList.filter((item) => item !== itemToRemove))
  }

  const clearScrollList = () => {
    setScrollList([])
  }

  return (
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
              <Text typography="t8" color="dankanGrayTextPoint" onClick={()=>handleList1Selection(item)}>{item}</Text>
            </div>
          ))}
          {/*<Typography>Selected Item in List 1: {selectedList1Item}</Typography>*/}
        </List>
      </Grid>
      <Grid xs={4.5}>
        {data?.length !==0 ? (
          <List>
            {data?.map((item: Zip, index: number) => (
              <div css={itemStyle}>
                <Text typography="t8" color="dankanGrayTextPoint"
                      onClick={() => handleList2Selection(item.reg2)}>{item.reg2}</Text>
              </div>
            ))}
            {/*<Typography>Selected Item in List 2: {selectedList2Item}</Typography>*/}
            {/*<Button variant="contained" onClick={addToScrollList}>
            Add to Scroll List
          </Button>*/}
          </List>
        ): null}
      </Grid>
      <Grid xs={4.5}>
        <List>
          {list3Items.map((item) => (
            <ListItem key={item} onClick={() => addToScrollList(list3Items.indexOf(item))} button>
              {item}
            </ListItem>
          ))}
        </List>
      </Grid>
      <List>
        <Typography variant="h6">Scroll List</Typography>
        {scrollList.map((item) => (
          <ListItem key={item} onClick={() => removeFromScrollList(item)} button>
            {item}
          </ListItem>
        ))}
        <Button variant="contained" onClick={clearScrollList}>
          Clear Scroll List
        </Button>
      </List>
    </Grid>
  )
}

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

const itemStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white; /* 흰색 배경색*/
    padding-top: 12px;
    padding-bottom: 12px;
`

export default DualListSelection
