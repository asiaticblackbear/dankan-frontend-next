import {FocusEventHandler, forwardRef, InputHTMLAttributes, ReactNode, useState} from "react";
import Text from "./Text"
import Input from "./Input"


interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode
    hasError?: boolean
    helpMessage?: ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    function TextField({label, hasError, helpMessage, onFocus, onBlur, ...props}, ref) {
        const[focused, setFocused] = useState(false)
        const labelColor = hasError ? "red" : focused ? "blue" : "gray"
        const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
            setFocused(true)
            onFocus?.(event)
        }
        const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
            setFocused(false)
            onBlur?.(event)
        }
        return (
            <div>
                {label ? (
                    <Text typography="t7" color={labelColor} display="inline-block" style={{marginBottom:6}}>
                        {label}
                    </Text>
                ) : null}
                <Input ref={ref} aria-invalid={hasError} onFocus={handleFocus} onBlur={handleBlur} {...props}></Input>
                {helpMessage ? (<Text typography="t7" color={labelColor} display="inline-block" style={{marginTop:6, fontSize: 12}}></Text>) : null}
            </div>
        )
    }
)

export default TextField