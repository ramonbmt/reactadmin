import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import MUIField from '../mui/MUIField'
import MUIFileField from '../mui/MUIFileField'
import { componentTypes } from '../utils/propTypes'

class FormikField extends Component {
    static propTypes = {
        fieldProps     : PropTypes.object.isRequired,
        childProps     : PropTypes.object,
        childComponent : PropTypes.oneOfType(componentTypes)
    }

    static defaultProps = {
        childComponent : null,
        childProps     : {}
    }

    shouldComponentUpdate () {
        return false
    }

    render () {
        const {
            childComponent,
            childProps,
            fieldProps
        } = this.props
        const Child = fieldProps.type === 'file' ? MUIFileField : childComponent || MUIField
        return (
            <Field
                { ...fieldProps }
            >
                { ({ field, form }) => (
                    <Child
                        { ...field }
                        childProps={ childProps }
                        formProps={ form }
                        placeholder={ fieldProps.placeholder }
                        type={ fieldProps.type }
                    />
                ) }
            </Field>
        )
    }
}

export default FormikField
