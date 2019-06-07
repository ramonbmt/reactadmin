import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import { collectionPropType } from '../../utils/propTypes'

const styles = {
    paddingNone: {
        textAlign: 'center'
    }
}

const SimpleTableRow = ({
    classes,
    fields,
    keys,
    node
}) => fields.map(({
    component,
    name,
    transform
}, index) => {
    const value = name.constructor === Array
            ? _.get(node, name)
            : node[name],
        result = transform
            ? transform(value, node)
            : value
    return (
        <TableCell
            classes={ classes }
            key={ keys[index] }
            padding="none"
        >
            { component
                ? component(result, node)
                : result
            }
        </TableCell>
    )
})

SimpleTableRow.propTypes = {
    fields : collectionPropType.isRequired,
    node   : PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTableRow)
