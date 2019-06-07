import * as React from 'react'
import { FormikProps } from 'formik'
import { ButtonProps } from '@material-ui/core/Button'
import { CircularProgressProps } from '@material-ui/core/CircularProgress'

interface FormikButtonProps {
    btnProps?: ButtonProps
    checking?: boolean
    childComponent?: JSX.Element
    children: JSX.Element
    formProps: FormikProps
    progressProps?: CircularProgressProps
    withProgress?: boolean
}

declare const Button: React.FunctionComponent<FormikButtonProps>

export default Button
