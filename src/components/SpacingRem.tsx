import styled from "@emotion/styled";

interface SpacingProps {
    size: number
    direction?: "vertical" | "horizontal"
}

const SpacingRem = styled.div<SpacingProps>`
  ${({size, direction = "vertical"}) =>
    direction==="vertical" ? `height: ${size}rem`:`width: ${size}rem`
  }
`
export default SpacingRem