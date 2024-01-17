import React from 'react';
import {css} from "@emotion/react";
import Slider from '@mui/material/Slider';
import styled from "@emotion/styled";
import {colors} from "@styles/colorPalette";
import { makeStyles } from '@mui/styles'
import { ReactElement } from 'react'
import { Tooltip, TooltipProps } from '@mui/material'
import { white } from 'next/dist/lib/picocolors'


interface ValueLabelProps {
    children: ReactElement;
    open: boolean;
    value: number;
}

const useStyles = makeStyles({
    root: {
        color: 'white', // 원하는 배경색
    },
});

const ValueLabelComponent = ({ children, open, value }: ValueLabelProps) => {
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
          {children}
      </Tooltip>
    );
};

function valueLabelFormat(value:number) {
    const units = ['개월 이하', '년 이상'];

    let unitIndex = 0;
    let scaledValue = value;

    while (scaledValue >= 12 && unitIndex < units.length - 1) {
        unitIndex += 1;
        console.log(scaledValue)
        if(scaledValue===12){
            scaledValue /= 12;
        }else{
            scaledValue -= 11;
        }
    }

    return `${scaledValue} ${units[unitIndex]}`;
}

function calculateValue(value: number) {
    return value;
}
export default function NonLinearSlider({onNext}: {onNext: (value: number) => void}){
    const [value, setValue] = React.useState<number>(3);

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            onNext(newValue);
            setValue(newValue);
        }
    };

    return (
        <div css={containerStyle}>
            <PrettoSlider
                value={value}
                min={1}
                step={1}
                max={21}
                scale={calculateValue}
                getAriaValueText={valueLabelFormat}
                ValueLabelComponent={ValueLabelComponent}
                onChange={handleChange}
                classes={{
                    root: , // 배경색 적용
                }}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"/>
        </div>
    );
}

const containerStyle = css`
    width: 100%;
`


const PrettoSlider = styled(Slider)({
    color: colors.dankanPrimary,
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },

});