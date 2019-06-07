import React from 'react'
import { InlineDateTimePicker as MUIInlineDateTimePicker } from 'material-ui-pickers/DateTimePicker'
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

const InlineDateTimePicker = ({
    onClearButton,
    onMouseDown,
    ...props
}) => (
    <ThemeProvider>
        <MUIInlineDateTimePicker
            dateRangeIcon={ DateRangeIcon }
            keyboardIcon={ EventIcon }
            labelFunc={ dateTimeLabel }
            leftArrowIcon={ KeyboardArrowLeftIcon }
            rightArrowIcon={ KeyboardArrowRightIcon }
            timeIcon={ AccessTimeIcon }
            { ...props }
        />
        <ClearButton
            onClick={ onClearButton }
            onMouseDown={ onMouseDown }
        />
    </ThemeProvider>
)

InlineDateTimePicker.propTypes = pickerPropTypes

InlineDateTimePicker.defaultProps = pickerDefaultProps

export default InlineDateTimePicker
