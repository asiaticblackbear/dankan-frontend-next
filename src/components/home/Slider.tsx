import * as React from 'react';
import {css} from "@emotion/react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import styled from "@emotion/styled";
import {colors} from "@styles/colorPalette";

function valueLabelFormat(value: number) {
    const units = ['개월 이하', '년 이상'];

    let unitIndex = 0;
    let scaledValue = value;

    while (scaledValue >= 12 && unitIndex < units.length - 1) {
        unitIndex += 1;
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

export default function NonLinearSlider() {
    const [value, setValue] = React.useState<number>(3);

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
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
                valueLabelFormat={valueLabelFormat}
                onChange={handleChange}
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