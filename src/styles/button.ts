import { css } from '@emotion/react'
import { colors } from './colorPalette'

export const buttonColorMap = {
  primary: css`
    background-color: ${colors.dankanPrimary};
    color: ${colors.white};
  `,
  normal: css`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.black};
  `,
  success: css`
    background-color: ${colors.teal900};
    color: ${colors.white};
  `,
  error: css`
    background-color: ${colors.red};
    color: ${colors.white};
  `,
  kakao: css`
    background-color: ${colors.yellow};
    color: ${colors.black}
  `
}

export const buttonWeakMap = {
  primary: css`
    background-color: ${colors.white};
    color: ${colors.dankanPrimary};
    border: 1px solid ${colors.dankanPrimary};
  `,
  normal: css`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.black};
  `,
  success: css`
    background-color: ${colors.white};
    color: ${colors.teal900};
    border: 1px solid ${colors.teal900};
  `,
  error: css`
    background-color: ${colors.white};
    color: ${colors.red};
    border: 1px solid ${colors.red};
  `,
  kakao: css`
    background-color: ${colors.yellow};
    color: ${colors.black}
  `
}

export const buttonSizeMap = {
  small: css`
    font-size: 13px;
    padding: 8px 9px;
  `,
  medium: css`
    height: 56px;
    font-size: 15px;
    padding: 10px 24px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px 10px;
  `,
}

export type ButtonColor = keyof typeof buttonColorMap
export type ButtonSize = keyof typeof buttonSizeMap
