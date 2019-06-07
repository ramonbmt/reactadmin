import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from '@emotion/styled'
import flexCenter from '../styles/emotion/flexCenter'
import { componentTypes } from '../utils/propTypes'

const ProgressContainer = styled.div`
    ${flexCenter}
    position: absolute;
    top: 0;
    left: 0;
`

const MUIButton = ({
    btnProps,
    formProps: {
        errors,
        isSubmitting
    },
    checking,
    children,
    progressProps,
    withProgress
}) => {
    const hasErrors = Boolean(Object.keys(errors).length)
    return (
        <Button
            type="submit"
            { ...btnProps }
            disabled={ hasErrors || isSubmitting || checking }
        >
            { children }
            { withProgress && (isSubmitting || checking) && (
                <ProgressContainer>
                    <CircularProgress
                        size={ progressProps.size || 24 }
                        { ...progressProps }
                    />
                </ProgressContainer>
            ) }
        </Button>
    )
}

MUIButton.propTypes = {
    children      : PropTypes.oneOfType(componentTypes).isRequired,
    formProps     : PropTypes.object.isRequired,
    btnProps      : PropTypes.object,
    checking      : PropTypes.bool,
    progressProps : PropTypes.object,
    withProgress  : PropTypes.bool
}

MUIButton.defaultProps = {
    btnProps      : {},
    checking      : false,
    progressProps : {},
    withProgress  : false
}

export default MUIButton
