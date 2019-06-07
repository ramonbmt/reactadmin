import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import CleaveInput from '../formik/CleaveInput'

class MUIField extends PureComponent {
    static propTypes = {
        childProps  : PropTypes.object.isRequired,
        formProps   : PropTypes.object.isRequired,
        name        : PropTypes.string.isRequired,
        onBlur      : PropTypes.func.isRequired,
        onChange    : PropTypes.func.isRequired,
        placeholder : PropTypes.string,
        type        : PropTypes.string
    }

    static defaultProps = {
        placeholder : '',
        type        : 'text'
    }

    _handleKeyPress = e => {
        if (e.which === 13) {
            const { formProps } = this.props
            formProps.submitForm()
        }
    }

    _handleChange = e => {
        const { formProps, name } = this.props
        formProps.setFieldValue(name, this.checkChange(e))
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

    render () {
        const {
            childProps: {
                formatProps,
                formatType,
                InputProps,
                ...restChildProps
            },
            formProps,
            name,
            onBlur,
            placeholder,
            type
        } = this.props
        const touched = formProps.touched[name],
            error = formProps.errors[name]
        if (formatProps) {
            InputProps.inputComponent = CleaveInput
            InputProps.inputProps = { formatProps }
        }
        return (
            <TextField
                error={ touched && !!error }
                helperText={ touched && error }
                disabled={ formProps.isSubmitting }
                label={ false }
                name={ name }
                onBlur={ onBlur }
                onChange={ this._handleChange }
                onKeyPress={ this._handleKeyPress }
                placeholder={ placeholder }
                type={ type }
                InputProps={ InputProps }
                { ...restChildProps }
            />
        )
    }
}

export default MUIField
