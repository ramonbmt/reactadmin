import React from 'react'
import PropTypes from 'prop-types'
import { TableContext } from '../context'

const TableTitle = ({
    table: { title }
}) => (
    <div>
        <span>{ title }</span>
    </div>
)

TableTitle.propTypes = {
    table: PropTypes.object.isRequired
}

export default props => (
    <TableContext.Consumer>
        {table => <TableTitle { ...props } table={ table } />}
    </TableContext.Consumer>
)

