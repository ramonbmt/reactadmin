import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RealMUISnackbar from '@material-ui/core/Snackbar'
import createStyled from '../utils/MUIStyled'

const StyledSnackbar = createStyled({
    anchorOriginBottomLeft: {
        '@media screen and (min-width: 400px) and (max-width:960px)': {
            borderRadius  : '2px',
            paddingBottom : '24px',
            paddingLeft   : '24px',
            width         : '336px'
        }
    },
    anchorOriginTopRight: {
        '@media screen and (min-width: 400px) and (max-width:960px)': {
            borderRadius : '2px',
            paddingLeft  : '24px',
            paddingTop   : '24px',
            width        : '336px'
        }
    }
})

class Snackbar extends Component {
    static propTypes = {
        message: PropTypes.string
    }

    static defaultProps = {
        message: 'Some text'
    }

    state = {
        open     : false,
        style    : {},
        position : {}
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        const width = window.innerWidth
        const height = window.innerHeight
        let color = ''
        if (nextProps.snackType === 200) {
            color = '#4caf50'
        } else if (nextProps.snackType === 500) {
            color = '#d32f2f'
        } else {
            color = '#FF8C00'
        }
        if (nextProps.open === true && prevState.open === false) {
            if (width <= 1000 || height <= 550) {
                return { open: true, style: { background: color }, position: { vertical: 'bottom', horizontal: 'left' } }
            }
            return { open: true, style: { background: color }, position: { vertical: 'top', horizontal: 'right' } }
        }
        return null
    }

    _handleClose = () => {
        this.setState({ open: false })
    }

    render () {
        const {
            open,
            position,
            style
        } = this.state
        const { message } = this.props
        return (
            <StyledSnackbar>
                { ({ classes }) => (
                    <RealMUISnackbar
                        autoHideDuration={ 2500 }
                        anchorOrigin={ position }
                        classes={{
                            anchorOriginBottomLeft : `${classes.anchorOriginBottomLeft}`,
                            anchorOriginTopRight   : `${classes.anchorOriginTopRight}`
                        }}
                        message={ message }
                        onClose={ this._handleClose }
                        open={ open }
                        SnackbarContentProps={{ style }}
                    />
                ) }
            </StyledSnackbar>
        )
    }
}

export default Snackbar
