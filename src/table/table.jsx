import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { withTheme } from '@material-ui/core/styles'
import _ from 'lodash'
// import memoize from 'memoize-one'
// import _ from 'lodash'
import reactTableDefaults from '../utils/reactTableDefaults'
// import { withClients } from '../../../api/graphql/decorators/users'
// import DetailsButton from '../DetailsButton'
import { TableContext } from '../context'

const TableContainer = styled.div`
    grid-area: table;
    padding-bottom: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    ${({ theme }) => theme.breakpoints.down('md')} {
        padding-left: 1rem;
        padding-right: 1rem;
    }
`

@withTheme()
// @withClients
// @withQuery
class ClientsTable extends Component {
    // filter = memoize(
    //     (list, search) => list.filter(i => i.nombre.includes(search) || i.apellidoP.includes(search) || i.apellidoM.includes(search)),
    //     _.isEqual
    // )

    static propTypes = {
        search          : PropTypes.string.isRequired,
        theme           : PropTypes.object.isRequired,
        queryConnection : PropTypes.string,
        query           : PropTypes.string,
        clients         : PropTypes.arrayOf(PropTypes.object),
        error           : PropTypes.object,
        api             : PropTypes.object,
        columns         : PropTypes.array.isRequired,
        where           : PropTypes.object.isRequired,
        table           : PropTypes.object.isRequired
    }

    static defaultProps = {
        clients         : [],
        error           : null,
        api             : {},
        query           : '',
        queryConnection : ''
    }

    state = {
        loading         : true,
        isConnection    : false,
        data            : [],
        // count           : 0,
        pageSize        : 10,
        pages           : 0,
        page            : 0,
        // eslint-disable-next-line react/no-unused-state
        sorted          : [],
        // eslint-disable-next-line react/no-unused-state
        filtered        : []
    }

    componentDidMount () {
        const { api, queryConnection } = this.props
        // console.log(reactTableDefaults)
        if (reactTableDefaults && reactTableDefaults.defaultPageSize) {
            this.setState({
                pageSize: reactTableDefaults.defaultPageSize
            })
        }
        if (queryConnection) {
            this.setState({
                isConnection: true
            })
        }
        if (api) {
            this._fetchData()
        }
    }

    componentDidUpdate (prevProps) {
        const { api, search, where } = this.props
        if (api !== prevProps.api || search !== prevProps.search || where !== prevProps.where) {
            this._fetchData()
        }
    }

    _handleDot = path => {
        if (path.indexOf('.') > 0) {
            const pathSplit = path.split(/\.(.*)/)
            const trueSecondPath = pathSplit[1].indexOf('.') > 0 ? this._handleDot(pathSplit[1]) : pathSplit[1]
            return `${pathSplit[0]}{
                ${trueSecondPath}
            }`
        }
        return path
    }

    _preFixColumnsForConnection = () => `
        pageInfo{
            hasNextPage
            startCursor
            hasPreviousPage
        }
        edges{
            cursor
            node{
        `

    _postFixColumnsForConnection = () => `
            }
        }
        `

    _makeGraphInfo = columns => {
        const isConnection = this.state
        let info = '{\n'
        if (isConnection) info += this._preFixColumnsForConnection()
        const infoArray = []
        Object.keys(columns).forEach(col => {
            if (typeof columns[col].accessor === 'string') {
                if (!infoArray[columns[col].accessor]) {
                    info += `${this._handleDot(columns[col].accessor)}\n`
                    infoArray.push(columns[col].accessor)
                }
            } else if (typeof columns[col].id === 'string') {
                if (!infoArray[columns[col].id]) {
                    info += `${this._handleDot(columns[col].id)}\n`
                    infoArray.push(columns[col].id)
                }
            }
        })
        if (isConnection) info += this._postFixColumnsForConnection()
        info += '}'
        return info
    }

    _getCountConnection = async where => {
        const { api, queryConnection, table } = this.props
        const info = `
        {
            aggregate{
                count
            }
        }`
        const data = await api[queryConnection](where, info)
        if (data && data.aggregate && data.aggregate.count) {
            const { aggregate: { count } } = data
            const { pageSize } = this.state
            this.setState({
                pages: _.ceil(count / pageSize)
            })
            table.setCount(count)
        }
        return data
    }

    _unfoldDataConnection = data => {
        const { edges } = data
        const unfoldData = edges.map(value => value.node)
        return unfoldData
    }

    _handleFetchMore = async state => {
        await this.setState({
            page        : state.page,
            pageSize    : state.pageSize,
            // eslint-disable-next-line react/no-unused-state
            sorted      : state.sorted,
            // eslint-disable-next-line react/no-unused-state
            filtered    : state.filtered
        })
        this._fetchData()
    }

    async _fetchData () {
        const {
            api,
            // search,
            queryConnection,
            query,
            columns,
            where
        } = this.props
        const { isConnection, page, pageSize } = this.state
        this.setState({
            loading: true
        })
        // console.log(this.props)
        // console.log(sorted, filtered)
        if (!_.isEmpty(api)) {
            const info = this._makeGraphInfo(columns)
            // console.log(info)
            const count = isConnection ? await this._getCountConnection(where) : 0
            const queryWhere = _.clone(where)
            queryWhere.first = !queryWhere.first ? pageSize : queryWhere.first
            queryWhere.skip = page * pageSize
            const data = isConnection ? this._unfoldDataConnection(await api[queryConnection](queryWhere, info)) : await api[query](queryWhere, info)
            // console.log(data, columns, count)
            this.setState({
                loading: false,
                // eslint-disable-next-line react/no-unused-state
                count,
                data
            })
        }
    }

    render () {
        const {
            error,
            theme,
            columns
        } = this.props
        const { loading, data, pages } = this.state
        // console.log(where)
        return (
            <TableContainer
                theme={ theme }
            >
                { !error
                    ? (
                        <ReactTable
                            { ...reactTableDefaults }
                            columns={ columns }
                            data={ data }
                            loading={ loading }
                            manual
                            pages={ pages }
                            onFetchData={ this._handleFetchMore }
                        />
                    )
                    : <span>{ error.message }</span>
                }
            </TableContainer>
        )
    }
}

// export default ClientsTable

export default props => (
    <TableContext.Consumer>
        {table => <ClientsTable { ...props } table={ table } />}
    </TableContext.Consumer>
)
