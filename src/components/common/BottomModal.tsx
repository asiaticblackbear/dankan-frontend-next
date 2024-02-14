// components/BottomModal.js
import React from 'react';
import {Modal, Paper, Slide} from '@mui/material';
import Spacing from "./Spacing";
import Button from "./Button";
import Text from "./Text"
import {css} from "@emotion/react";
import {useRouter} from "next/router";
import {useRecoilValue} from "recoil";
import {userState} from "@/atoms";
import styled from "styled-components";

const BottomModal = ({ open, onClose, submit }: { open: any, onClose: any, submit: any }) => {
    const user = useRecoilValue(userState)
    const router = useRouter();
    const onConfirm = ()=> {
      onClose
        router.replace({
            pathname:"/user/univ",
            query: {
                uid : user.cifNo
            },
        }, "/user/univ")

    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="bottom-modal"
            aria-describedby="bottom-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
            }}
        >
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <div
                    style={{
                        borderRadius: '16px 16px 0 0', // 상단 둥글게 만들기
                        backgroundColor: 'white',
                        padding: 16,
                        width: '100%',
                        maxWidth: 390,
                    }}
                >
                  <Spacing size={43}/>
                  <Text typography="t3" color="black" fontWeight={700}>대학교를 변경하시겠어요?</Text>
                  <Spacing size={24}/>
                  <Text typography="t7" color="dankanGrayText">변경된 대학교 주변의 단칸과 후기를<br/>홈에서 볼 수 있어요</Text>
                  <Spacing size={48}/>
                  <Button full={true} size="medium" onClick={onConfirm} css={buttonStyle}>확인</Button>
                </div>
            </Slide>
        </Modal>
    );
};

const buttonStyle = css`
    border-radius: 8px;
`

export default BottomModal;