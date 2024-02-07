import NavbarClose from '@components/common/NavbarClose'
import { useRouter } from 'next/router'
import Flex from '@components/common/Flex'
import { IconButton, InputBaseComponentProps, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import CancelIcon from '@mui/icons-material/Cancel'
import SearchedIcon from '@mui/icons-material/Search'
import { css } from '@emotion/react'
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import FixedBottomContents from '@components/home/search/FixedBottomContents'
import DualListSelection from '@components/home/search/DualList'
import Spacing from '@components/common/Spacing'
import FullScreenDialog from '@components/common/FullscreenModal'
import styled from "@emotion/styled";

function SearchIcon() {
  return null
}

function HomeSearch() {
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<InputBaseComponentProps>({} as InputBaseComponentProps);

  const handleFocus = () => {
      setIsFocused(true);
      if(!open){
        console.log("focus modal")
        setOpen(true)
      }
      inputRef.current.blur();
  };

  const [keyword, setKeyword] = useState('')

  const handleClear = () => {
    setKeyword('')
  }
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    console.log("closedddd")
    setOpen(false);
  }

  const handleSubmit = (address: string) =>{
    setOpen(false);
    console.log("??"+address)
  }


  const handFocus = useCallback(()=>{

  }, [])

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)

  }, [])

  return (
    <Container>
      <NavbarClose title="후기 볼 지역 선택" onNext={() => {
        router.back()
      }} />
      <Flex direction="column">
        <DualListSelection />


        <Spacing size={25} />
      </Flex>
    </Container>
  )

}

const Container = styled.div`
    background-color: white;
    max-width: 390px;
    width: 100%;
    height: 100vh;
    position: relative;
`

const formContainerStyles = css`
    margin-left: 24px;
    margin-right: 24px;
`



export default HomeSearch