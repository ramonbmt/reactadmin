import * as React from 'react'
import { TimePickerInlineProps } from 'material-ui-pickers'

interface MUIInlineTimePickerProps extends TimePickerInlineProps {
    onClearButton: React.EventHandler
    onMouseDown?: React.EventHandler
}

declare const InlineTimePicker: React.FunctionComponent<MUIInlineTimePickerProps>

export default InlineTimePicker
