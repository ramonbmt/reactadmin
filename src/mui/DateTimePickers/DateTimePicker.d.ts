import * as React from 'react'
import { DateTimePickerProps } from 'material-ui-pickers'

interface MUIDateTimePickerProps extends DateTimePickerProps {
    onClearButton: React.EventHandler
    onMouseDown?: React.EventHandler
}

declare const DateTimePicker: React.FunctionComponent<MUIDateTimePickerProps>

export default DateTimePicker
