import * as React from 'react'
import { CheckboxProps } from '@material-ui/core/Checkbox'
import { FieldProps } from './utils'

interface Functions {
    onChange: (name: string, nextValue: boolean) => void
}

interface FormikSelectionControlProps {
    childComponent?: JSX.Element
    childProps?: CheckboxProps
    fieldProps: FieldProps
    functions?: Functions
}

declare const SelectionControl: React.FunctionComponent<FormikSelectionControlProps>

export default SelectionControl
