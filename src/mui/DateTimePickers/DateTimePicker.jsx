import React from 'react'
import { DateTimePicker as MUIDateTimePicker } from 'material-ui-pickers'
import {
    AccessTimeIcon,
    EventIcon,
    DateRangeIcon,
    KeyboardArrowLeftIcon,
    KeyboardArrowRightIcon
} from './icons'
import {
    ClearButton,
    dateTimeLabel,
    pickerDefaultProps,
    pickerPropTypes,
    ThemeProvider
} from './utils'

const DateTimePicker = ({
    onClearButton,
    onMouseDown,
    ...props
}) => (
    <ThemeProvider>
        <MUIDateTimePicker
            cancelLabel="Cancelar"
            dateRangeIcon={ DateRangeIcon }
            keyboardIcon={ EventIcon }
            labelFunc={ dateTimeLabel }
            leftArrowIcon={ KeyboardArrowLeftIcon }
            okLabel="OK"
            rightArrowIcon={ KeyboardArrowRightIcon }
            showTodayButton
            timeIcon={ AccessTimeIcon }
            todayLabel="Hoy"
            { ...props }
        />
        <ClearButton
            onClick={ onClearButton }
            onMouseDown={ onMouseDown }
        />
    </ThemeProvider>
)

DateTimePicker.propTypes = pickerPropTypes

DateTimePicker.defaultProps = pickerDefaultProps

export default DateTimePicker
