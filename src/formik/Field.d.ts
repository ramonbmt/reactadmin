import * as React from 'react'
import { FormikProps } from 'formik'
import { TextFieldProps } from '@material-ui/core/TextField'
import { CleaveOptions } from 'cleave.js/options'
import { FieldProps } from './utils'

interface ValueShape {
    view: string
    value: string | number
}

type FormikFieldValue = string | number | ValueShape

interface ChildProps extends TextFieldProps {
    formatProps?: CleaveOptions
    formatType?: FormatType
    onChangeFieldValue?: React.EventHandler
}

interface FormikFieldProps {
    childComponent?: JSX.Element
    childProps?: ChildProps
    fieldProps: FieldProps
    value?: FormikFieldValue
}

declare const Field: React.FunctionComponent<FormikFieldProps>

export default Field
