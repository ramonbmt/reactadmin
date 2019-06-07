import React from 'react'
import PropTypes from 'prop-types'
import MUIButton from '../mui/Button'
// import { componentPropTypes } from '../../../lib/utils/client/propTypes'
import { componentPropTypes } from '../utils/propTypes'

const Button = ({
    childComponent,
    children,
    ...rest
}) => {
    const Component = childComponent || MUIButton
    return (
        <Component
            { ...rest }
        >
            { children }
        </Component>
    )
}

Button.propTypes = {
    children       : componentPropTypes.isRequired,
    formProps      : PropTypes.object.isRequired,
    btnProps       : PropTypes.object,
    checking       : PropTypes.bool,
    childComponent : PropTypes.node,
    progressProps  : PropTypes.object,
    withProgress   : PropTypes.bool
}

Button.defaultProps = {
    btnProps       : {},
    checking       : false,
    childComponent : null,
    progressProps  : {},
    withProgress   : false
}

export default Button
