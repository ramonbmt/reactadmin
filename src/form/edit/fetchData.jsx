import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ModuleContext } from '../../context'
import { componentTypes } from '../../utils/propTypes'

class FetchData extends PureComponent {
    static propTypes = {
        schema          : PropTypes.object.isRequired,
        children  	    : PropTypes.oneOfType(componentTypes).isRequired,
        query           : PropTypes.string,
        where           : PropTypes.object,
        module          : PropTypes.object.isRequired,
        saveData        : PropTypes.func.isRequired
    }

    static defaultProps = {
        query       : '',
        where       : {}
    }

    static _makeDataColumns (columns, data) {
        const infoArray = []
        let infoData = {}
        if (data || data[0]) {
            [infoData] = data
        }
        Object.keys(columns).forEach(col => {
            if (typeof columns[col].fieldProps.name === 'string') {
                if (!infoArray[columns[col].fieldProps.name]) {
                    infoArray.push({
                        key     : columns[col].fieldProps.name,
                        label   : columns[col].fieldProps.placeholder,
                        value   : infoData[columns[col].fieldProps.name]
                    })
                }
            }
        })
        return infoArray
    }

    componentDidMount () {
        const { module: { api } } = this.props
        if (api) {
            if (!_.isEmpty(api)) {
                this._fetchData()
            }
        }
    }

    componentDidUpdate (prevProps) {
        const { module: { api } } = this.props
        console.log(this.props, prevProps)
        if (api && api !== prevProps.module.api) {
            if (!_.isEmpty(api)) {
                this._fetchData()
            }
        }
    }

    async _fetchData () {
        const { module: { api }, where, query, saveData } = this.props
        const columns = this._parseInputs()
        if (!_.isEmpty(api)) {
            const info = this._makeGraphInfo(columns)
            const data = await api[query](where, info)
            const dataColumns = FetchData._makeDataColumns(columns, data)
            console.log(dataColumns)
            saveData({
                data    : dataColumns,
                column  : false
            })
            // return dataColumns
            // this.setState({
            //     data    : dataColumns,
            //     column  : false
            // })
        }
    }

    _parseInputs () {
        const { schema } = this.props
        const inputs = []
        _.each(schema.fields, v => {
            const field = v._cms
            if (field && field.fieldProps && field.fieldProps.name) {
                inputs.push(field)
            }
            // inputs.push(field)
        })
        return inputs
    }

    _handleDot (path) {
        if (path.indexOf('.') > 0) {
            const pathSplit = path.split(/\.(.*)/)
            const trueSecondPath = pathSplit[1].indexOf('.') > 0 ? this._handleDot(pathSplit[1]) : pathSplit[1]
            return `${pathSplit[0]}{
                ${trueSecondPath}
            }`
        }
        return path
    }

    _makeGraphInfo (columns) {
        let info = '{\n'
        const infoArray = []
        Object.keys(columns).forEach(col => {
            if (typeof columns[col].fieldProps.name === 'string') {
                if (!infoArray[columns[col].fieldProps.name]) {
                    info += `${this._handleDot(columns[col].fieldProps.name)}\n`
                    infoArray.push(columns[col].fieldProps.name)
                }
            }
        })
        info += '}'
        return info
    }

    render () {
        const { children } = this.props
        return (
            <Fragment>
                { children }
            </Fragment>
        )
    }
}

export default props => (
    <ModuleContext.Consumer>
        {module => <FetchData { ...props } module={ module } />}
    </ModuleContext.Consumer>
)
