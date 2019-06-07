import React, { Component, Fragment } from 'react'
// import { Query } from 'react-apollo'
import _ from 'lodash'
import styled from '@emotion/styled'
// import numeral from 'numeral'
import { Debounce } from 'lodash-decorators/debounce'
import PropTypes from 'prop-types'
import { ModuleContext, TableContext } from '../context'
// import TableSearch from './tableSearch'
import Table from './table'
import { componentTypes } from '../utils/propTypes'

const TableContent = styled.div`
    background-color: #FAFAFA;
    display: grid;
    grid-template:
        "info date search" 125px
        "table table table" 1fr
        / 1fr minmax(300px, 1fr) 1fr;
    height: 100%;
    width: 100%;
`

// const TableInfo = styled.div`
//     align-items: center;
//     display: flex;
//     grid-area: info;
//     justify-content: space-around;
//     > span {
//         font-size: 1.375rem;
//     }
//     > div {
//         align-items: flex-end;
//         display: flex;
//         height: 15%;
//         span {
//             font-size: 0.875rem;
//         }
//     }
// `

class BMTTable extends Component {
    static propTypes = {
        module              : PropTypes.object.isRequired,
        title               : PropTypes.string,
        queryConnection     : PropTypes.string,
        query               : PropTypes.string,
        columns             : PropTypes.array.isRequired,
        where               : PropTypes.object,
        children  	        : PropTypes.oneOfType(componentTypes).isRequired
    }

    static defaultProps = {
        title           : '',
        where           : {},
        query           : '',
        queryConnection : ''
    }

    constructor (props) {
        super(props)
        this.state = {
            search      : '',
            where       : {},
            columns     : [],
            loading     : true,
            /* eslint-disable react/no-unused-state */
            count       : 0,
            title       : '',
            updateWhere : this.updateWhere,
            setCount    : this.setCount
            /* eslint-enable */
        }
    }

    // state = {
    //     search  : '',
    //     where   : {},
    //     count   : 0,
    //     columns : []
    // }

    componentWillMount () {
        this._updateParams(this.props)
    }

    componentDidUpdate (prevProps) {
        const { where, columns, title } = this.props
        if (!_.isEqual(where, prevProps.where) || !_.isEqual(columns, prevProps.columns) || title !== prevProps.title) {
            this._updateParams(this.props)
        }
    }

    componentWillUnmount () {
        this._setSearch.cancel()
    }

    _updateParams = async props => {
        const { where, columns, title } = props
        this.setState({
            where,
            columns,
            // eslint-disable-next-line react/no-unused-state
            title,
            loading: false
        })
    }

    // _handleChangeSearch = ({ target }) => {
    //     this._setSearch({ search: target.value })
    // }

    updateWhere = newWhere => {
        this.setState(prevState => ({
            where: {
                ...prevState.where,
                where: {
                    ...prevState.where.where,
                    ...newWhere
                }
            }
        }))
    }

    setCount = count => {
        this.setState({
            // eslint-disable-next-line react/no-unused-state
            count
        })
    }

    @Debounce(350)
    _setSearch ({ search }) {
        this.setState({ search })
    }

    render () {
        const { search, where, columns, loading } = this.state
        const {
            module: { api },
            query,
            queryConnection,
            children
        } = this.props
        return (
            <TableContext.Provider value={ this.state }>
                <TableContent>
                    {/* <TableInfo>
                        <span>{ title }</span>
                        <div>
                            {
                                count > 0
                                    && <span>{ !loading && numeral(count).format('0,0') } total</span>
                            }
                        </div>
                    </TableInfo> */}
                    {
                        children
                    }
                    {/* <TableSearch
                        title={ title }
                        // handleChange={ this._handleChangeSearch }
                    /> */}
                    {
                        !loading
                            ? (
                                <Table
                                    search={ search }
                                    columns={ columns }
                                    api={ api }
                                    query={ query }
                                    queryConnection={ queryConnection }
                                    where={ where }
                                />
                            )
                            : <Fragment />
                    }

                </TableContent>
            </TableContext.Provider>
        )
    }
}

export default props => (
    <ModuleContext.Consumer>
        {module => <BMTTable { ...props } module={ module } />}
    </ModuleContext.Consumer>
)
