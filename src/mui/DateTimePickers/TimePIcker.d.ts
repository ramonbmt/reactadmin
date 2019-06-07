import * as React from 'react'
import { TimePickerProps } from 'material-ui-pickers'

interface MUITimePickerProps extends TimePickerProps {
    onClearButton: React.EventHandler
    onMouseDown?: React.EventHandler
}

declare const TimePicker: React.FunctionComponent<MUITimePickerProps>

export default TimePicker
