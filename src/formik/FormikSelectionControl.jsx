import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import MUICheckbox from '../mui/MUICheckbox'
import { componentTypes } from '../utils/propTypes'

const selectInput = type => {
    switch (type) {
        case 'checkbox': return MUICheckbox
        default: return undefined
    }
}

const FormikSelectionControl = ({
    fieldProps,
    childProps,
    childComponent
}) => {
    const Child = selectInput(fieldProps.type) || childComponent
    const { controlLabel } = childProps
    delete childProps.controlLabel
    return (
        <Field
            { ...fieldProps }
        >
            { ({ field, form }) => (
                <Child
                    fieldProps={ field }
                    childProps={ childProps }
                    formProps={ form }
                    controlLabel={ controlLabel }
                />
            ) }
        </Field>
    )
}

FormikSelectionControl.propTypes = {
    fieldProps      : PropTypes.object.isRequired,
    childProps      : PropTypes.object,
    childComponent  : PropTypes.oneOfType(componentTypes)
}

FormikSelectionControl.defaultProps = {
    childProps      : null,
    childComponent  : null
}

export default FormikSelectionControl
