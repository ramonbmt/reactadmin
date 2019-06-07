import * as React from 'react'
import { ButtonProps } from '@material-ui/core/Button'
import { CircularProgressProps } from '@material-ui/core/CircularProgress'

interface FormProps {
    errors: Object<string>
    isSubmitting: boolean
}

interface ButtonProps {
    btnProps?: ButtonProps
    checking?: boolean
    children: JSX.Element
    formProps: FormProps
    progressProps?: CircularProgressProps
    withProgress?: boolean
}

declare const Button: React.FunctionComponent<ButtonProps>

export default Button
