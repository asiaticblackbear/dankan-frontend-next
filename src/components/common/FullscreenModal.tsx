import * as React from 'react';
import Text from "@components/common/Text"
import CancelIcon from '@mui/icons-material/Cancel'
import SearchedIcon from '@mui/icons-material/Search'
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {Backdrop, Fade, Grow, TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Spacing from '@components/common/Spacing'
import Flex from '@components/common/Flex'
import {getZipAll, getZipSearch} from '@remote/zip'
import {Zip} from '@models/zip'
import {ChangeEvent, FocusEventHandler, useCallback, useEffect, useRef, useState} from 'react'
import {useQuery} from 'react-query'
import {css} from '@emotion/react'
import {colors} from '@styles/colorPalette'
import ErrorInfo from "@assets/errorInfo.svg"
import NavbarClose from '@components/common/NavbarClose'
import styled from 'styled-components';


/*const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Fade timeout={100} ref={ref} {...props} />;
});*/


const Transition = React.forwardRef(function Transition(props: TransitionProps & {
    children: React.ReactElement;
}, ref: React.Ref<unknown>) {
    return (
        <Fade
            timeout={400}
            ref={ref}
            {...props}
            style={{
                transitionTimingFunction: 'ease-in-out',
            }}/>
    );
});


const FullScreenDialog = ({open, close, submit}: { open: any, close: any, submit: (zip: Zip) => void }) => {

    const handleClickOpen = () => {
        //setOpened(true);
    };
    const handleClose = (item: Zip) => () => {
        console.log("closed")
        submit(item)
        setKeyword("")
    };

    const [keyword, setKeyword] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const {data} = useQuery(['homes', keyword], () => getZipSearch(keyword),
        {enabled: (keyword !== '' && keyword.length >= 2)})

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
        return () => {
            setKeyword("")
            console.log('Component will unmount');
        };

    }, []);
    const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }, [])

    const handleClear = () => {
        setKeyword('')
    }


    return (
        <React.Fragment>
            <CustomFullScreenDialog
                fullScreen
                open={open}
                onClose={close}
                /*BackdropComponent={CustomBackdrop}>*/
                BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.0)', boxShadow: 'transport' } }}>
                <NavbarClose title="후기 볼 지역 선택" onNext={close}/>
                <Flex direction="column">
                    <div style={{padding: '18px 0px 13px 0px'}} css={formContainerStyles}>
                        <TextField id="outlined-basic" placeholder="지역명으로 검색"
                                   inputRef={inputRef}
                                   value={keyword}
                                   onChange={handleKeyword}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <SearchedIcon/>
                                           </InputAdornment>
                                       ),
                                       endAdornment: keyword && (
                                           <IconButton onClick={handleClear} edge="end">
                                               <CancelIcon/>
                                           </IconButton>
                                       ),
                                   }}
                                   variant="outlined" style={{width: '100%'}}/>
                    </div>

                    {keyword.length >= 2 && data?.length === 0 ? (
                        <div>
                            <Spacing size={150}/>
                            <Flex direction="column" align="center">
                                <ErrorInfo height="46px" width="46px"/>
                                <Spacing size={17}/>
                                <Text typography="t6" color="black" bold={true}>검색 결과가 없어요</Text>
                                <Spacing size={8}/>
                                <Text typography="t9" color={'dankanGrayText'}>다시 한 번 검색해 보세요</Text>
                            </Flex>
                        </div>
                    ) : null}

                    {keyword !== '' && data?.length !== 0 ? (
                        <ul css={listContainerStyles}>
                            {data?.map((item: Zip, index: number) =>
                                <Flex as="li" css={listRowContainerStyles} onClick={handleClose(item)}>
                                    <Flex direction="column" justify="center" css={rowContainerStyles}>
                                        <Text typography="t7" color="black">{titleItem(item, 0)}</Text>
                                        <Spacing size={3}/>
                                        <Text typography="t10" color="dankanGrayText">{titleItem(item, 1)}</Text>
                                    </Flex>
                                </Flex>,
                            )}
                        </ul>
                    ) : null}
                    <Spacing size={25}/>
                </Flex>
            </CustomFullScreenDialog>
        </React.Fragment>
    );

    function titleItem(zip: Zip, index: number) {
        let title = ''
        if (index === 0) {
            title = zip.reg2 + ' ' + zip.reg3

            if (zip.reg2 === "") title = zip.reg1 + " 전체"
            else if (zip.reg3 === "") title = zip.reg2 + " 전체"

        } else if (index === 1) {
            title = zip.reg1 + ' ' + zip.reg2 + ' ' + zip.reg3
        }

        return title
    }
}

const CustomFullScreenDialog = styled(Dialog)`
    height: 100vh;
    max-width: 390px;
    width: 100%;
    margin: 0 auto;
`
const CustomBackdrop = styled(Backdrop)`
    && {
        background-color: rgba(0, 0, 0, 0.0); /* 배경색을 반투명한 검은색으로 설정 */
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        -o-box-shadow: none;
    }
`;

const formContainerStyles = css`
    margin-left: 24px;
    margin-right: 24px;
`

const listContainerStyles = css`
    overflow: auto;
    margin-left: 24px;
    margin-right: 24px;
`
const fontHeightStyle = css`
    line-height: 1.4;
`

const listRowContainerStyles = css`
    padding: 8px 0px;
    height: 70px;
    border-bottom: 1px solid;
    border-color: ${colors.dankanGrayPoint};
`

const rowContainerStyles = css`
    padding-left: 6px;
`
export default FullScreenDialog