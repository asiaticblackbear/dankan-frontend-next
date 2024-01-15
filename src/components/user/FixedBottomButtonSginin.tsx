import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import Button from "@components/common/Button";
import {css} from "@emotion/react";
import {createPortal} from "react-dom";

interface FixedBottomButtonProps{
    disabled?: boolean
    label?: string
    onClick: () => void
}

function FixedBottomButtonSignin({disabled, label, onClick}:FixedBottomButtonProps){

    //const $portalRoot = document.getElementById("root-portal")

    /*if($portalRoot==null){
        return null
    }*/

    return(
        <Container>
            <Button full={true} size="medium" onClick={onClick} disabled={disabled} css={buttonStyle}>{label}</Button>
        </Container>
        //$portalRoot,
    )
}

const Container = styled.div`
  width: 100%;
  position: fixed; 
  left: 0;
  rigtht: 0;
  bottom: 0;
  border-color:  ${colors.white};
  background-color: ${colors.white};
  padding: 20px 24px 20px 24px
`

const buttonStyle = css`
    border-radius: 8px;
`

export default FixedBottomButtonSignin