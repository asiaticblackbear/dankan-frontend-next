import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import Button from "@components/common/Button";
import {css} from "@emotion/react";
import {createPortal} from "react-dom";
import Flex from "@components/common/Flex";

interface FixedBottomButtonProps {
    disabled?: boolean
    label?: string
    onClick: () => void
}

function FixedBottomButtonRight({disabled, label, onClick}: FixedBottomButtonProps) {

    //const $portalRoot = document.getElementById("root-portal")

    /*if($portalRoot==null){
        return null
    }*/

    return (
        <Container>
            <Flex direction="row" justify="flex-end" align="center">
                <Button full={false} size="medium" onClick={onClick} disabled={disabled}
                        css={buttonStyle}>{label}</Button>
            </Flex>
        </Container>
        //$portalRoot,
    )
}

const Container = styled.div`
    max-width: 390px;
    width: 100%;
    position: absolute;
    left: 0;
    rigtht: 0;
    bottom: 0;
    border-color: ${colors.white};
    background-color: ${colors.white};
    padding: 20px 24px 20px 24px
`

const buttonStyle = css`
    border-radius: 8px;
`

export default FixedBottomButtonRight