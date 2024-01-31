import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import Button from "./Button";
import {css} from "@emotion/react";
import {createPortal} from "react-dom";

interface FixedBottomButtonProps {
    label: string
    onClick: () => void
}

function FixedBottomButton({label, onClick}: FixedBottomButtonProps) {

    //const $portalRoot = document.getElementById("root-portal")

    /*if($portalRoot==null){
        return null
    }*/

    return (
        <Container>
            <Button full={true} size="medium" onClick={onClick} css={buttonStyle}>{label}</Button>
        </Container>
        //$portalRoot,
    )
}

const Container = styled.div`
    min-width: 430px;
    position: absolute;
    left: 0;
    rigtht: 0;
    bottom: 0;
    background-color: ${colors.white};
    padding: 20px 24px 20px 24px
`

const buttonStyle = css`
    border-radius: 8px;
`

export default FixedBottomButton