import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import RealMUISelect from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import shortId from '../utils/shortId'
import { transformDataPropType } from '../utils/propTypes'
import {
    pickRelevantValues,
    valuesToArray
} from '../utils/formik'

const getFromTransformData = ({ value, transformData, field }) => _.get(value, transformData?.[field] || field, null)

class Select extends Component {
    static propTypes = {
        dataProps: PropTypes.shape({
            data          : PropTypes.arrayOf(PropTypes.object),
            getValue      : PropTypes.func,
            loading       : PropTypes.bool,
            transformData : PropTypes.shape({
                id   : transformDataPropType,
                name : transformDataPropType
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
        childProps  : {},
        placeholder : ''
    }

    shouldComponentUpdate (nextProps) {
        const {
            dataProps: {
                data,
                loading
            },
            formProps,
            name,
            value
        } = this.props
        const prev = valuesToArray(pickRelevantValues(formProps, name)),
            next = valuesToArray(pickRelevantValues(nextProps.formProps, name))
        prev.concat(
            data,
            loading,
            value
        )
        next.concat(
            nextProps.dataProps.data,
            nextProps.dataProps.loading,
            nextProps.value
        )
        if (value && _.isEmpty(data)) {
            formProps.setFieldValue(name, '')
            return false
        }
        return next.some((val, i) => val !== prev[i])
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
        const {
            dataProps: {
                data,
                loading,
                transformData
            } = {},
            placeholder
        } = this.props
        if (value !== '' && !loading && !_.isEmpty(data)) {
            const item = data.find(val => getFromTransformData({ value: val, transformData, field: 'id' }) === value) || {}
            return getFromTransformData({ value: item, transformData, field: 'name' })
        }
        return <span className="mui-formal-select-placeholder">{ placeholder }</span>
    }

    renderMenuItems = ({ data, transformData }) => data.map(i => {
        const key = getFromTransformData({ value: i, transformData, field: 'id' }),
            name = getFromTransformData({ value: i, transformData, field: 'name' })
        return (
            <MenuItem
                key={ key }
                value={ key }
            >
                { name }
            </MenuItem>
        )
    })

    render () {
        const {
            childProps: {
                className,
                MenuProps: menuProps,
                SelectDisplayProps: selectDisplayProps,
                controlProps,
                labelProps: {
                    label,
                    ...restLabelProps
                } = {},
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
        const MenuProps = {
            ...menuProps,
            PaperProps: {
                style: {
                    transform: 'translate3d(0, 0, 0)'
                }
            }
        }
        const SelectDisplayProps = {
            ...selectDisplayProps,
            id: name,
            name
        }
        return (
            <FormControl
                className={ className }
                error={ error }
                { ...controlProps }
            >
                { label && (
                    <InputLabel
                        { ...restLabelProps }
                        htmlFor={ `${shortId}` }
                    >
                        { label }
                    </InputLabel>
                ) }
                <RealMUISelect
                    displayEmpty
                    name={ name }
                    onBlur={ onBlur }
                    onChange={ this._handleChangeSelect }
                    renderValue={ this.renderValue }
                    value={ value }
                    { ...rest }
                    disabled={ isSubmitting && loading }
                    MenuProps={ MenuProps }
                    SelectDisplayProps={ SelectDisplayProps }
                >
                    <MenuItem
                        disabled
                        value=""
                    >
                        { placeholder }
                    </MenuItem>
                    { !loading && this.renderMenuItems({ data, transformData })}
                </RealMUISelect>
                { error && <FormHelperText>{ errors[name] }</FormHelperText> }
            </FormControl>
        )
    }
}

export default Select
