import * as React from 'react'
import { DatePickerInlineProps } from 'material-ui-pickers'

interface MUIInlineDatePickerProps extends DatePickerInlineProps {
    onClearButton: React.EventHandler
    onMouseDown?: React.EventHandler
}

declare const InlineDatePicker: React.FunctionComponent<MUIInlineDatePickerProps>

export default InlineDatePicker
