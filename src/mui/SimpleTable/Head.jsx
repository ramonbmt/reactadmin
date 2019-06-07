import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { collectionPropType } from '../../utils/propTypes'

const styles = {
    paddingNone: {
        textAlign: 'center'
    }
}

const SimpleTableHead = ({
    classes,
    keys,
    values
}) => (
    <TableHead>
        <TableRow>
            { values.map(({ title }, index) => (
                <TableCell
                    classes={ classes }
                    key={ keys[index] }
                    padding="none"
                >
                    { title }
                </TableCell>
            )) }
        </TableRow>
    </TableHead>
)

SimpleTableHead.propTypes = {
    classes : PropTypes.objectOf(PropTypes.string).isRequired,
    keys    : PropTypes.arrayOf(PropTypes.string).isRequired,
    values  : collectionPropType.isRequired
}

export default withStyles(styles)(SimpleTableHead)
