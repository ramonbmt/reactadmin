import * as React from 'react'
import { InputProps } from '@material-ui/core/Input'
import { InputLabelProps } from '@material-ui/core/InputLabel'
import { FormikBag } from 'formik'

interface ValueShape {
    name: string
    size: number
    type: string
}

type ValueProp = string | number | ValueShape

interface ChildProps {
    className?: string
    InputProps?: InputProps
    labelProps?: InputLabelProps
}

interface FileFieldProps {
    childProps?: ChildProps
    formProps: FormikBag
    name: string
    onBlur: React.EventHandler
    onChange: React.EventHandler
    placeholder?: string
    value?: ValueProp
}

declare const FileField: React.ComponentClass<FileFieldProps>

export default FileField
