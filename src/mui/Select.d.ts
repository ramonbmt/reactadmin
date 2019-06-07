import * as React from 'react'
import { SelectProps } from '@material-ui/core/Select'
import { FormControlProps } from '@material-ui/core/FormControl'
import { InputLabelProps } from '@material-ui/core/InputLabel'
import { FormikBag } from 'formik'

interface GetValueArgs {
    name: string
    value: string
}

type TransformDataArg = string[] | string

interface TransformData {
    id?: TransformDataArg
    name?: TransformDataArg
}

interface DataProps {
    data: Array<Object>
    getValue?: (args: GetValueArgs) => void
    loading?: boolean
    transformData?: TransformData
}

interface ChildProps extends SelectProps {
    className?: string
    controlProps?: FormControlProps
    labelProps?: InputLabelProps
}

interface MUISelectProps {
    childProps?: ChildProps
    dataProps: DataProps
    formProps: FormikBag
    name: string
    onBlur: React.EventHandler
    onChange: React.EventHandler
    placeholder?: string
    value: string
}

declare const Select: React.ComponentClass<MUISelectProps>

export default Select
