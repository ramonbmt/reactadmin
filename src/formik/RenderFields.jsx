import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
import shortid from 'shortid'
// import { Query } from 'react-apollo'
import Field from './Field'
import Select from './Select'
// import { MUIStyles } from './Styles'

// @withStyles(MUIStyles)
class RenderFields extends Component {
    static propTypes = {
        classes : PropTypes.object.isRequired,
        fields  : PropTypes.array.isRequired
    }

    shouldComponentUpdate (nextProps) {
        const {
            fields
        } = this.props
        const {
            fields: nextFields
        } = nextProps
        const checkLoadingBefore = fields.some(({ dataProps = {} }) => !!dataProps.loading),
            checkLoadingAfter = nextFields.some(({ dataProps = {} }) => !!dataProps.loading)
        if (checkLoadingBefore && !checkLoadingAfter) return true
        return false
    }

    render () {
        const {
            classes,
            fields
        } = this.props
        return fields.map(({ name, label, type, ...restField }) => {
            const {
                childProps: customChildProps
            } = restField
            let childProps = {}
            switch (type) {
                case 'file':
                    childProps = {
                        className   : classes.input,
                        labelProps  : {
                            label,
                            shrink  : true,
                            classes : {
                                focused     : classes.label,
                                disabled    : classes.label
                            }
                        },
                        InputProps: {
                            className           : classes.inputRoot,
                            disableUnderline    : true,
                            classes             : {
                                input: classes.baseInput
                            }
                        },
                        ...customChildProps
                    }
                    break
                case 'select':
                    childProps = {
                        className           : classes.selectInput,
                        disableUnderline    : true,
                        classes             : {
                            root        : classes.inputRoot,
                            select      : classes.select,
                            icon        : classes.selectIcon
                        },
                        labelProps: {
                            label,
                            shrink  : true,
                            classes : {
                                focused     : classes.label,
                                disabled    : classes.label
                            }
                        }
                    }
                    break
                default:
                    childProps = {
                        className           : classes.input,
                        InputLabelProps     : {
                            // className   : classes.inputLabel,
                            classes: {
                                focused     : classes.label,
                                disabled    : classes.label
                            },
                            shrink: true
                        },
                        InputProps: {
                            className           : classes.inputRoot,
                            disableUnderline    : true,
                            classes             : {
                                input: classes.baseInput
                            }
                        },
                        label,
                        ...customChildProps
                    }
                    break
            }
            switch (type) {
                case 'select': {
                    const {
                        dataProps,
                        placeholder = undefined
                    } = restField
                    return (
                        <Select
                            key={ shortid.generate() }
                            dataProps={ dataProps }
                            childProps={ childProps }
                            fieldProps={{
                                name,
                                placeholder
                            }}
                        />
                    )
                }
                default:
                    return (
                        <Field
                            key={ shortid.generate() }
                            childProps={ childProps }
                            fieldProps={{
                                name,
                                type
                            }}
                        />
                    )
            }
        })
    }
}

export default RenderFields
