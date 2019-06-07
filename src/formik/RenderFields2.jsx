import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import Select from './Select'

const shortid = require('shortid')

// @withStyles(MUIStyles)
class RenderFields extends Component {
    static propTypes = {
        classes : PropTypes.object.isRequired,
        inputs  : PropTypes.array.isRequired
    }

    shouldComponentUpdate (nextProps) {
        const {
            inputs
        } = this.props
        const {
            inputs: nextFields
        } = nextProps
        const checkLoadingBefore = inputs.some(({ dataProps = {} }) => !!dataProps.loading),
            checkLoadingAfter = nextFields.some(({ dataProps = {} }) => !!dataProps.loading)
        if (checkLoadingBefore && !checkLoadingAfter) return true
        return false
    }

    render () {
        const { inputs, classes } = this.props
        // eslint-disable-next-line array-callback-return
        return inputs.map(({ childProps, fieldProps, dataProps }) => {
            switch (fieldProps.type) {
                case 'text':
                    // console.log(classes)
                    return (
                        <Field
                            key={ shortid.generate() }
                            childProps={ childProps(classes) }
                            fieldProps={ fieldProps }
                            dataProps={ dataProps }
                        />
                    )
                case 'select':
                    return (
                        <Select
                            key={ shortid.generate() }
                            childProps={ childProps(classes) }
                            fieldProps={ fieldProps }
                            dataProps={ dataProps }
                        />
                    )
            }
        })
    }
}

export default RenderFields
