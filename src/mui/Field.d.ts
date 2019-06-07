import * as React from 'react'
import { TextFieldProps } from '@material-ui/core/TextField'
import { CleaveOptions } from 'cleave.js/options'
import { FormikBag } from 'formik'

interface ValueShape {
    value?: string | number
    view?: string
}

type ValueProp = string | number | ValueShape

enum FormatType {
    'simple',
    'fancy'
}

interface ChildProps extends TextFieldProps {
    formatProps?: CleaveOptions
    formatType?: FormatType
    onChangeFieldValue?: React.EventHandler
}

interface FieldProps {
    childProps: ChildProps
    formProps: FormikBag
    label?: string
    name: string
    onBlur: React.EventHandler
    onChange: React.EventHandler
    placeholder?: string
    type?: string
    value?: ValueProp
}

declare const Field: React.ComponentClass<FieldProps>

export default Field
