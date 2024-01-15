import { css } from '@emotion/react'

export const typographyMap = {
  t1: css`
    font-size: 30px;
    line-height: 1.35;
  `,
  t2: css`
    font-size: 26px;
    line-height: 1.34;
  `,
  t3: css`
    font-size: 22px;
    line-height: 1.4;
  `,
  t4: css`
    font-size: 20px;
    line-height: 1.45;
  `,
  t5: css`
    font-size: 18px;
    line-height: 1.2;
  `,
  t6: css`
    font-size: 15px;
    line-height: 1.0;
  `,
  t7: css`
    font-size: 14px;
    line-height: 1.0;
  `,
  t8: css`
    font-size: 13px;
    line-height: 1.0;
  `,
  t9: css`
    font-size: 12px;
    line-height: 1.0;
  `,
  t10: css`
    font-size: 11px;
    line-height: 1.0;
  `,
  t11: css`
    font-size: 8px;
    line-height: 1.0;
  `,
}

export type Typography = keyof typeof typographyMap
