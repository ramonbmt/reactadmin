import React from 'react'
import { TimePicker as MUITimePicker } from 'material-ui-pickers'
import { EventIcon } from './icons'
import {
    ClearButton,
    timeLabel,
    pickerDefaultProps,
    pickerPropTypes,
    ThemeProvider
} from './utils'

const TimePicker = ({
    onClearButton,
    onMouseDown,
    ...props
}) => (
    <ThemeProvider>
        <MUITimePicker
            cancelLabel="Cancelar"
            keyboardIcon={ EventIcon }
            labelFunc={ timeLabel }
            okLabel="OK"
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

TimePicker.propTypes = pickerPropTypes

TimePicker.propTypes = pickerDefaultProps

export default TimePicker
