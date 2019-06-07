import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import RealMUICheckbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class Checkbox extends Component {
    static propTypes = {
        name            : PropTypes.string.isRequired,
        onChange        : PropTypes.func.isRequired,
        formProps       : PropTypes.object.isRequired,
        childProps      : PropTypes.object,
        controlLabel    : PropTypes.object,
        functions       : PropTypes.object.isRequired
    }

    static defaultProps = {
        childProps      : null,
        controlLabel    : null
    }

    shouldComponentUpdate (nextProps) {
        const {
            name,
            formProps: {
                values: { [name]: currentValue = false }
            }
        } = this.props
        const {
            formProps: {
                values: { [name]: nextValue = false }
            }
        } = nextProps
        if (currentValue !== nextValue) {
            const {
                functions: {
                    onChange = undefined
                }
            } = this.props
            if (onChange) onChange(name, nextValue)
        }
        return currentValue !== nextValue
    }

    render () {
        const {
            childProps,
            controlLabel,
            name,
            formProps: {
                values: {
                    [name]: checked = false
                }
            },
            onChange
        } = this.props
        return (
            <Fragment>
                { controlLabel ? (
                    <FormControlLabel
                        control={ (
                            <RealMUICheckbox
                                name={ name }
                                { ...childProps }
                            />
                        ) }
                        checked={ checked }
                        onChange={ onChange }
                        { ...controlLabel }
                    />
                ) : (
                    <RealMUICheckbox
                        checked={ checked }
                        name={ name }
                        onChange={ onChange }
                        { ...childProps }
                    />
                )}
            </Fragment>
        )
    }
}

export default Checkbox
