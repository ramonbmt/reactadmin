import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { TableContext } from '../context'

const TableCount = ({
    table: { count }
}) => (
    <div>
        {
            count > 0
                && <span>{ numeral(count).format('0,0') } total</span>
        }
    </div>
)

TableCount.propTypes = {
    table: PropTypes.object.isRequired
}

export default props => (
    <TableContext.Consumer>
        {table => <TableCount { ...props } table={ table } />}
    </TableContext.Consumer>
)

