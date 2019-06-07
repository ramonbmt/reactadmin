import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Field } from 'formik'
import MUISelect from '../mui/MUISelect'
import { componentTypes } from '../utils/propTypes'

class FormikSelect extends Component {
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
        fieldProps     : PropTypes.object.isRequired,
        childProps     : PropTypes.object,
        childComponent : PropTypes.oneOfType(componentTypes)
    }

    static defaultProps = {
        childComponent : null,
        childProps     : {}
    }

    shouldComponentUpdate (nextProps) {
        const { dataProps } = this.props
        if (dataProps.loading !== nextProps.dataProps.loading) {
            return true
        }
        const check = _.intersectionWith(Object.entries(dataProps.data), Object.entries(nextProps.dataProps.data), _.isEqual)
        if (!check.length) {
            return true
        }
        return false
    }

    render () {
        const {
            childComponent,
            childProps,
            dataProps,
            fieldProps
        } = this.props
        const Child = childComponent || MUISelect
        return (
            <Field
                type="select"
                { ...fieldProps }
            >
                { ({ field, form }) => (
                    <Child
                        { ...field }
                        childProps={ childProps }
                        dataProps={ dataProps }
                        formProps={ form }
                        placeholder={ fieldProps.placeholder }
                    />
                ) }
            </Field>
        )
    }
}

export default FormikSelect
