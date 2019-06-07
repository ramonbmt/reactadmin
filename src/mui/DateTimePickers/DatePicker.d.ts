import * as React from 'react'
import { DatePickerProps } from 'material-ui-pickers'

interface MUIDatePickerProps extends DatePickerProps {
    onClearButton: React.EventHandler
    onMouseDown?: React.EventHandler
}

declare const DatePicker: React.FunctionComponent<MUIDatePickerProps>

export default DatePicker
