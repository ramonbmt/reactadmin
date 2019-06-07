import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search'
import { Debounce } from 'lodash-decorators/debounce'
import { TableContext } from '../context'

const styles = {
    paperRoot: {
        alignItems      : 'center',
        alignSelf       : 'center',
        backgroundColor : '#FFF',
        borderRadius    : '2rem',
        display         : 'flex',
        gridArea        : 'search',
        height          : '2.5rem',
        justifySelf     : 'center',
        maxWidth        : 350,
        paddingLeft     : '8px',
        paddingRight    : '8px',
        width           : '90%'
    },
    input: {
        padding          : '4px 0 0',
        width            : '80%',
        '&::placeholder' : {
            fontSize: 14
        }
    }
}

const StyledSearch = styled(Search)`
    color: #BDBDBD;
`

const Icon = (
    <InputAdornment position="start">
        <StyledSearch />
    </InputAdornment>
)

// const ClientsSearch = ({
//     classes: {
//         input,
//         inputRoot,
//         paperRoot
//     },
//     handleChange,
//     title
// }) => {
//     const placeholder = `Búsqueda de ${title}`
//     return (
//         <Paper
//             classes={{ root: paperRoot }}
//         >
//             <Input
//                 classes={{ root: inputRoot, input }}
//                 disableUnderline
//                 onChange={ handleChange }
//                 placeholder={ placeholder }
//                 startAdornment={ Icon }
//             />
//         </Paper>
//     )
// }

@withStyles(styles)
class ClientsSearch extends Component {
    static propTypes = {
        classes         : PropTypes.object.isRequired,
        table           : PropTypes.object.isRequired
    }

    state = {
        search: ''
    }

    componentWillUnmount () {
        this._setSearch.cancel()
    }

    _handleChangeSearch = ({ target }) => {
        this._setSearch({ search: target.value })
    }

    _generateWhereSearch = search => {
        const { table, table: { columns } } = this.props
        const queryWhere = columns.reduce((accum, value) => {
            if (value.search) {
                accum[`${value.accessor}_contains`] = search
            }
            return accum
        }, {})
        table.updateWhere(queryWhere)
        console.log(queryWhere)
    }

    @Debounce(350)
    _setSearch ({ search }) {
        this.setState({ search })
        this._generateWhereSearch(search)
    }

    render () {
        const { search } = this.state
        const {
            classes: {
                input,
                inputRoot,
                paperRoot
            },
            table: { title }
        } = this.props
        const placeholder = `Búsqueda de ${title}`
        return (
            <Paper
                classes={{ root: paperRoot }}
            >
                <Input
                    classes={{ root: inputRoot, input }}
                    disableUnderline
                    onChange={ this._handleChangeSearch }
                    placeholder={ placeholder }
                    startAdornment={ Icon }
                    defaultValue={ search }
                />
            </Paper>
        )
    }
}

// ClientsSearch.propTypes = {
//     classes         : PropTypes.object.isRequired,
//     handleChange    : PropTypes.func.isRequired,
//     title           : PropTypes.string.isRequired
// }

// export default withStyles(styles)(ClientsSearch)

export default props => (
    <TableContext.Consumer>
        {table => <ClientsSearch { ...props } table={ table } />}
    </TableContext.Consumer>
)
