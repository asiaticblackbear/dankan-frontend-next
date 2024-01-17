import * as React from 'react';
import {css} from "@emotion/react";
import Slider from '@mui/material/Slider';
import styled from "@emotion/styled";
import {colors} from "@styles/colorPalette";

function valueLabelFormat(value: number) {
    const units = ['개월 이하', '년 이상'];

    let unitIndex = 0;
    let scaledValue = value;

    while (scaledValue >= 12 && unitIndex < units.length - 1) {
        unitIndex += 1;
        console.log(scaledValue)
        if (scaledValue === 12) {
            scaledValue /= 12;
        } else {
            scaledValue -= 11;
        }
    }

    return `${scaledValue} ${units[unitIndex]}`;
}

function calculateValue(value: number) {
    return value;
}

export default function NonLinearSlider({onNext}: { onNext: (keyword: any) => void }) {
    const [value, setValue] = React.useState<number>(3);

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            onNext(newValue);
            setValue(newValue);
        }
    };

    return (
        <div css={containerStyle}>
            <CustomSlider
                value={value}
                min={1}
                step={1}
                max={21}
                scale={calculateValue}
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="non-linear-slider"/>
        </div>
    );
}

const containerStyle = css`
  width: 100%;
  padding: 0px 4px 0px 4px;
`


const CustomSlider = styled(Slider)({
    color: '#16F1BD',
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
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 10,
        width: 78,
        height: 36,
        color: '#000000',
        borderRadius: '6px',
        border: '1px solid #DADADA',
        backgroundColor: '#FFFFFF',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(0deg) scale(0)',
        '&::before': {display: 'none'},
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(0%, -100%) rotate(0deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(0deg)',
        },
    },
});