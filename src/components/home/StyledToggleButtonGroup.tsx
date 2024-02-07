import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { styled } from '@mui/system'

interface StyledButtonGroupProps {
  backgroundColor?: string;
  color?: string;
  selectedBackgroundColor?: string;
  selectedColor?: string;
}

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)<StyledButtonGroupProps>((
  {
    backgroundColor = '#ffffff',
    color = '#656565',
    selectedBackgroundColor = '#16F1BD',
    selectedColor = '#ffffff',
  }) => ({
  backgroundColor: backgroundColor,
  color: color,
  '& .MuiToggleButton-root.Mui-selected': {
    backgroundColor: selectedBackgroundColor,
    color: selectedColor,
  },
}))

