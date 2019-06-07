import React from 'react'
import { InlineDatePicker as MUIInlineDatePicker } from 'material-ui-pickers/DatePicker'
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

const InlineDatePicker = ({
    onClearButton,
    onMouseDown,
    ...props
}) => (
    <ThemeProvider>
        <MUIInlineDatePicker
            keyboardIcon={ EventIcon }
            labelFunc={ dateLabel }
            leftArrowIcon={ KeyboardArrowLeftIcon }
            rightArrowIcon={ KeyboardArrowRightIcon }
            { ...props }
        />
        <ClearButton
            onClick={ onClearButton }
            onMouseDown={ onMouseDown }
        />
    </ThemeProvider>
)

InlineDatePicker.propTypes = pickerPropTypes

InlineDatePicker.defaultProps = pickerDefaultProps

export default InlineDatePicker
