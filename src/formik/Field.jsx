import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Field as RealFormikField } from 'formik'
import MUIField from '../mui/Field'
import MUIFileField from '../mui/FileField'
import { componentPropTypes } from '../utils/propTypes'

const compare = (prevProps, nextProps) => !_.isEqual(nextProps.value, prevProps.value)

const Field = ({
    childComponent,
    childProps,
    fieldProps: {
        placeholder,
        type,
        ...fieldProps
    },
    value
}) => {
    const Child = (
        fieldProps.type === 'file'
            ? MUIFileField
            : childComponent
    ) || MUIField
    return (
        <RealFormikField
            { ...fieldProps }
        >
            { ({
                field: {
                    value: fieldValue,
                    ...fieldRest
                },
                form
            }) => {
                const val = value || fieldValue
                return (
                    <Child
                        { ...fieldRest }
                        childProps={ childProps }
                        formProps={ form }
                        placeholder={ placeholder }
                        type={ type }
                        value={ val }
                    />
                )
            } }
        </RealFormikField>
    )
}

Field.propTypes = {
    fieldProps     : PropTypes.object.isRequired,
    childProps     : PropTypes.object,
    childComponent : componentPropTypes,
    value          : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            view  : PropTypes.string,
            value : PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        })
    ])
}

Field.defaultProps = {
    childComponent : null,
    childProps     : {},
    value          : null
}

export default memo(Field, compare)
