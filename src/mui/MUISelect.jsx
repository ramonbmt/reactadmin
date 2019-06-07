import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select/Select'
import MenuItem from '@material-ui/core/MenuItem'

class MUIField extends PureComponent {
    static propTypes = {
        dataProps: PropTypes.shape({
            data          : PropTypes.arrayOf(PropTypes.object),
            getValue      : PropTypes.func,
            loading       : PropTypes.bool,
            transformData : PropTypes.shape({
                id   : PropTypes.string,
                name : PropTypes.string
            })
        }).isRequired,
        formProps   : PropTypes.object.isRequired,
        name        : PropTypes.string.isRequired,
        onBlur      : PropTypes.func.isRequired,
        onChange    : PropTypes.func.isRequired,
        value       : PropTypes.string.isRequired,
        childProps  : PropTypes.object,
        placeholder : PropTypes.string
    }

    static defaultProps = {
        childProps  : null,
        placeholder : ''
    }

    _handleChangeSelect = e => {
        const { dataProps, onChange } = this.props
        onChange(e)
        if (dataProps.getValue) {
            const { target: { name, value } } = e
            dataProps.getValue({ name, value })
        }
    }

    renderValue = value => {
        const { dataProps, placeholder } = this.props
        if (value !== '' && !dataProps.loading) {
            const item = dataProps.data.find(val => val[_.get(dataProps, 'transformData.id', null) || 'id'] === value)
            return item[_.get(dataProps, 'transformData.name', null) || 'name']
        }
        return <span className="mui-formal-select-placeholder">{ placeholder }</span>
    }

    render () {
        const {
            childProps: {
                className,
                MenuProps,
                SelectDisplayProps,
                ...rest
            },
            dataProps: {
                data,
                loading,
                transformData
            },
            formProps: {
                errors,
                isSubmitting,
                touched: touche
            },
            name,
            onBlur,
            placeholder,
            value
        } = this.props
        const touched = touche[name],
            error = Boolean(touched && errors[name])
        return (
            <FormControl
                className={ className }
                error={ error }
            >
                <Select
                    displayEmpty
                    name={ name }
                    onBlur={ onBlur }
                    onChange={ this._handleChangeSelect }
                    renderValue={ this.renderValue }
                    value={ value }
                    { ...rest }
                    MenuProps={{
                        ...Object.assign({}, MenuProps, {
                            PaperProps: {
                                style: {
                                    transform: 'translate3d(0, 0, 0)'
                                }
                            }
                        })
                    }}
                    SelectDisplayProps={{
                        ...Object.assign({}, SelectDisplayProps, {
                            name,
                            id: name
                        })
                    }}
                    disabled={ isSubmitting }
                >
                    <MenuItem disabled value="">
                        { placeholder }
                    </MenuItem>
                    { !loading
                        ? data.map(val => (
                            <MenuItem key={ val[_.get(transformData, 'id', null) || 'id'] } value={ val[_.get(transformData, 'id', null) || 'id'] }>
                                { val[_.get(transformData, 'name', null) || 'name'] }
                            </MenuItem>
                        ))
                        : null
                    }
                </Select>
                { error && <FormHelperText>{ errors[name] }</FormHelperText> }
            </FormControl>
        )
    }
}

export default MUIField
