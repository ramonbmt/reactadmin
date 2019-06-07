import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { MuiThemeProvider } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'
import { componentPropTypes } from '../../utils/propTypes'
import theme, { inputTheme } from '../../styles/mui/theme'

const mouseDown = e => {
    e.preventDefault()
}

const PickerContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    > div {
        flex-basis: 75%;
    }
    > button {
        flex-basis: 20%;
        top: 0.5rem;
    }
    span[class*="TabIndicator-root-"] {
        background-color: white;
    }
`
const pickerTheme = { ...theme }

pickerTheme.overrides = {
    ...inputTheme,
    MuiPickersToolbar: {
        toolbar: {
            backgroundColor: 'var(--secondary-color)'
        }
    },
    MuiPickersDay: {
        current: {
            color: 'var(--secondary-color)'
        },
        selected: {
            backgroundColor : 'var(--secondary-color)',
            '&:hover'       : {
                backgroundColor: 'var(--secondary-color)'
            }
        }
    },
    MuiPickersYear: {
        root: {
            '&:focus': {
                color: 'var(--secondary-color)'
            }
        },
        selected: {
            color: 'var(--secondary-color)'
        }
    }
}

const ThemeProvider = ({ children }) => (
    <MuiThemeProvider
        theme={ pickerTheme }
    >
        <PickerContainer>
            { children }
        </PickerContainer>
    </MuiThemeProvider>
)

ThemeProvider.propTypes = {
    children: componentPropTypes.isRequired
}

const dateLabel = date => {
    if (!date) return ''
    return date.format('DD/MM/YYYY')
}

const timeLabel = time => {
    if (!time) return ''
    return time.format('hh:mm A')
}

const dateTimeLabel = date => {
    if (!date) return ''
    return date.format('DD/MM/YYYY hh:mm A')
}

const ClearButton = ({
    onClick,
    onMouseDown
}) => (
    <IconButton
        aria-label="Limpiar fecha actual"
        onClick={ onClick }
        onMouseDown={ onMouseDown }
    >
        <Clear />
    </IconButton>
)

ClearButton.propTypes = {
    onClick     : PropTypes.func.isRequired,
    onMouseDown : PropTypes.func
}

ClearButton.defaultProps = {
    onMouseDown: mouseDown
}

const pickerPropTypes = {
    onClearButton : PropTypes.func.isRequired,
    onMouseDown   : PropTypes.func
}

const pickerDefaultProps = {
    onMouseDown: null
}

export {
    ClearButton,
    dateLabel,
    dateTimeLabel,
    PickerContainer,
    pickerDefaultProps,
    pickerPropTypes,
    ThemeProvider,
    timeLabel
}
