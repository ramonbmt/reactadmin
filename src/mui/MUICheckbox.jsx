import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class MUICheckbox extends Component {
    static propTypes = {
        fieldProps      : PropTypes.object.isRequired,
        formProps       : PropTypes.object.isRequired,
        childProps      : PropTypes.object,
        controlLabel    : PropTypes.object
    }

    static defaultProps = {
        childProps      : null,
        controlLabel    : null
    }

    _handleChange = (e, checked) => {
        const { formProps: { setFieldValue } } = this.props
        setFieldValue(e.target.value, checked)
    }

    render () {
        const {
            childProps,
            controlLabel
        } = this.props
        return (
            <Fragment>
                { controlLabel ? (
                    <FormControlLabel
                        control={ (
                            <Checkbox
                                { ...childProps }
                            />
                        ) }
                        onChange={ this._handleChange }
                        { ...controlLabel }
                    />
                ) : (
                    <Checkbox
                        onChange={ this._handleChange }
                        { ...childProps }
                    />
                )}
            </Fragment>
        )
    }
}

export default MUICheckbox
