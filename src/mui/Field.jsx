import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import CleaveInput from '../formik/CleaveInput'
import { checkRelevantValues } from '../utils/formik'

function FieldWrapperRef (props) {
    const { inputRef, ...other } = props

    return (
        <CleaveInput
            { ...other }
            htmlRef={ inputRef }
            // inputRef={ inputRef }
        />
    )
}

FieldWrapperRef.propTypes = {
    inputRef: PropTypes.func.isRequired
}

class Field extends Component {
    static propTypes = {
        childProps  : PropTypes.object.isRequired,
        formProps   : PropTypes.object.isRequired,
        name        : PropTypes.string.isRequired,
        onBlur      : PropTypes.func.isRequired,
        onChange    : PropTypes.func.isRequired,
        label       : PropTypes.string,
        placeholder : PropTypes.string,
        type        : PropTypes.string,
        value       : PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                ]),
                view: PropTypes.string
            })
        ])
    }

    static defaultProps = {
        label       : '',
        placeholder : '',
        type        : 'text',
        value       : undefined
    }

    shouldComponentUpdate (nextProps) {
        const {
            formProps,
            name
        } = this.props
        return checkRelevantValues({
            name,
            nextProps : nextProps.formProps,
            prevProps : formProps
        })
    }

    checkChange = e => {
        let val = e.target.value
        const { childProps } = this.props
        if (childProps.formatProps) {
            if (e.target.rawValue !== '') {
                switch (childProps.formatType) {
                    case 'simple':
                        val = e.target.rawValue
                        break
                    case 'fancy':
                        val = e.target.value
                        break
                    default:
                        val = parseFloat(e.target.rawValue)
                }
            } else {
                val = undefined
            }
        }
        return val
    }

    _handleKeyPress = e => {
        if (e.which === 13) {
            const { formProps } = this.props
            formProps.submitForm()
        }
    }

    _handleChange = e => {
        const { formProps, name, childProps: { onChangeFieldValue } } = this.props
        if (onChangeFieldValue) {
            onChangeFieldValue(e)
        }
        formProps.setFieldValue(name, this.checkChange(e))
    }

    render () {
        const {
            childProps: {
                formatProps,
                formatType,
                InputProps,
                label = '',
                onChangeFieldValue,
                ...restChildProps
            },
            formProps,
            name,
            onBlur,
            placeholder,
            type,
            value
        } = this.props
        const touched = formProps.touched[name],
            error = formProps.errors[name]
        let fieldValue = formProps.values[name] || ''
        if (formatProps) {
            InputProps.inputComponent = FieldWrapperRef
            InputProps.inputProps = {
                formatProps,
                ...InputProps.inputProps
            }
        }
        if (InputProps?.readOnly) {
            InputProps.inputProps = { onInput: this._handleChange }
            fieldValue = value?.view || ''
        }
        return (
            <TextField
                disabled={ formProps.isSubmitting }
                error={ touched && !!error }
                helperText={ touched && error }
                InputProps={ InputProps }
                label={ label === '' ? false : label }
                name={ name }
                onBlur={ onBlur }
                onChange={ this._handleChange }
                onKeyPress={ this._handleKeyPress }
                placeholder={ placeholder }
                type={ type }
                value={ fieldValue }
                { ...restChildProps }
            />
        )
    }
}

export default Field
