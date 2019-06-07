import * as React from 'react'
import { DateTimePickerInlineProps } from 'material-ui-pickers'

interface MUIInlineDateTimePickerProps extends DateTimePickerInlineProps {
    onClearButton: React.EventHandler
    onMouseDown?: React.EventHandler
}

declare const InlineDateTimePicker: React.FunctionComponent<MUIInlineDateTimePickerProps>

export default InlineDateTimePicker
