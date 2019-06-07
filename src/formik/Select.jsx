import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Field } from 'formik'
import MUISelect from '../mui/Select'
import {
    componentPropTypes,
    transformDataPropType
} from '../utils/propTypes'

const Select = ({
    childComponent,
    childProps,
    dataProps,
    fieldProps,
    fieldProps: { placeholder }
}) => {
    const Child = childComponent || MUISelect
    return (
        <Field
            type="select"
            { ...fieldProps }
        >
            { ({
                field,
                form
            }) => (
                <Child
                    { ...field }
                    childProps={ childProps }
                    dataProps={ dataProps }
                    formProps={ form }
                    placeholder={ placeholder }
                />
            ) }
        </Field>
    )
}

Select.propTypes = {
    dataProps: PropTypes.shape({
        data          : PropTypes.arrayOf(PropTypes.object).isRequired,
        getValue      : PropTypes.func,
        loading       : PropTypes.bool,
        transformData : PropTypes.shape({
            id   : transformDataPropType,
            name : transformDataPropType
        })
    }).isRequired,
    fieldProps     : PropTypes.object.isRequired,
    childProps     : PropTypes.object,
    childComponent : componentPropTypes
}

Select.defaultProps = {
    childComponent : null,
    childProps     : {}
}

const compare = (prevProps, nextProps) => {
    const { dataProps } = prevProps
    if (dataProps.loading !== nextProps.dataProps.loading) {
        return true
    }
    if (!_.isEqual(dataProps.data, nextProps.dataProps.data)) {
        return true
    }
    return false
}

export default memo(Select, compare)
