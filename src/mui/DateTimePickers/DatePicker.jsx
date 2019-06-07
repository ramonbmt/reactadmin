import React from 'react'
import { DatePicker as MUIDatePicker } from 'material-ui-pickers'
import {
    EventIcon,
    KeyboardArrowLeftIcon,
    KeyboardArrowRightIcon
} from './icons'
import {
    ClearButton,
    dateLabel,
    pickerDefaultProps,
    pickerPropTypes,
    ThemeProvider
} from './utils'

const DatePicker = ({
    onClearButton,
    onMouseDown,
    ...props
}) => (
    <ThemeProvider>
        <MUIDatePicker
            cancelLabel="Cancelar"
            keyboardIcon={ EventIcon }
            labelFunc={ dateLabel }
            leftArrowIcon={ KeyboardArrowLeftIcon }
            okLabel="OK"
            rightArrowIcon={ KeyboardArrowRightIcon }
            showTodayButton
            todayLabel="Hoy"
            { ...props }
        />
        <ClearButton
            onClick={ onClearButton }
            onMouseDown={ onMouseDown }
        />
    </ThemeProvider>
)

DatePicker.propTypes = pickerPropTypes

DatePicker.defaultProps = pickerDefaultProps

export default DatePicker
