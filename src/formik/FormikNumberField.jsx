import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import MUIField from '../mui/MUIField'

class FormikNumberField extends PureComponent {
    static propTypes = {
        formProps   : PropTypes.object.isRequired,
        name        : PropTypes.string.isRequired,
        onBlur      : PropTypes.func.isRequired,
        onChange    : PropTypes.func.isRequired,
        childProps  : PropTypes.object,
        placeholder : PropTypes.string,
        type        : PropTypes.string,
        value       : PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }

    static defaultProps = {
        childProps  : {},
        placeholder : '',
        type        : 'text',
        value       : ''
    }

    state = {
        value: ''
    }

    _handleChange = ({ floatValue, value }) => {
        const { childProps, formProps, name } = this.props
        const val = childProps.formatProps.isString ? value : floatValue
        this.setState({ value }, () => {
            formProps.setFieldValue(name, val)
        })
    }

    render () {
        const {
            childProps: {
                formatProps: {
                    isString,
                    ...restFormatProps
                },
                ...restChildProps
            },
            formProps,
            ...restProps
        } = this.props
        const { value } = this.state
        restChildProps.isNumericString = isString || null
        return (
            <NumberFormat
                childProps={ restChildProps }
                formProps={ formProps }
                { ...restProps }
                customInput={ MUIField }
                { ...restFormatProps }
                onValueChange={ this._handleChange }
                value={ value }
            />
        )
    }
}

export default FormikNumberField
