import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import MUICheckbox from '../mui/Checkbox'
import { componentPropTypes } from '../utils/propTypes'

const selectInput = type => {
    switch (type) {
        case 'checkbox': return MUICheckbox
        default: return undefined
    }
}

const SelectionControl = ({
    fieldProps,
    childProps: {
        controlLabel,
        ...restChildProps
    },
    childComponent,
    functions
}) => {
    const Child = selectInput(fieldProps.type) || childComponent
    return (
        <Field
            { ...fieldProps }
        >
            { ({
                field,
                form
            }) => (
                <Child
                    { ...field }
                    childProps={ restChildProps }
                    formProps={ form }
                    controlLabel={ controlLabel }
                    functions={ functions }
                />
            ) }
        </Field>
    )
}

SelectionControl.propTypes = {
    fieldProps      : PropTypes.object.isRequired,
    childProps      : PropTypes.object,
    childComponent  : componentPropTypes,
    functions       : PropTypes.object
}

SelectionControl.defaultProps = {
    childProps      : null,
    childComponent  : null,
    functions       : {}
}

export default SelectionControl
