import React from 'react'
import PropTypes from 'prop-types'
import MUIButton from '../mui/MUIButton'
import { componentTypes } from '../utils/propTypes'

const FormikButton = ({
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

FormikButton.propTypes = {
    children       : PropTypes.oneOfType(componentTypes).isRequired,
    formProps      : PropTypes.object.isRequired,
    btnProps       : PropTypes.object,
    checking       : PropTypes.bool,
    childComponent : PropTypes.node,
    progressProps  : PropTypes.object,
    withProgress   : PropTypes.bool
}

FormikButton.defaultProps = {
    btnProps       : {},
    checking       : false,
    childComponent : null,
    progressProps  : {},
    withProgress   : false
}

export default FormikButton
