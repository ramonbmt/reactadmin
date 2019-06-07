import React from 'react'
import { InlineTimePicker as MUIInlineTimePicker } from 'material-ui-pickers/TimePicker'
import { EventIcon } from './icons'
import {
    ClearButton,
    timeLabel,
    pickerDefaultProps,
    pickerPropTypes,
    ThemeProvider
} from './utils'

const InlineTimePicker = ({
    onClearButton,
    onMouseDown,
    ...props
}) => (
    <ThemeProvider>
        <MUIInlineTimePicker
            keyboardIcon={ EventIcon }
            labelFunc={ timeLabel }
            { ...props }
        />
        <ClearButton
            onClick={ onClearButton }
            onMouseDown={ onMouseDown }
        />
    </ThemeProvider>
)

InlineTimePicker.propTypes = pickerPropTypes

InlineTimePicker.defaultProps = pickerDefaultProps

export default InlineTimePicker
