import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import { collectionPropType } from '../../utils/propTypes'
import generateId from '../../utils/shortId'
import SimpleTableHead from './Head'
import SimpleTableBody from './Body'

const styles = {
    root: {
        maxWidth: 1000
    }
}

const SimpleTable = ({
    classes,
    fields: {
        values
    },
    fields,
    nodes
}) => {
    const headKeys = useCallback(() => {
        const keys = values.map(({ title }) => `${generateId()}_${title}}`)
        return keys
    }, [values])

    return (
        <Table
            classes={ classes }
        >
            <SimpleTableHead
                keys={ headKeys }
                values={ values }
            />
            <SimpleTableBody
                fields={ fields }
                nodes={ nodes }
            />
        </Table>
    )
}

SimpleTable.propTypes = {
    classes : PropTypes.objectOf(PropTypes.string).isRequired,
    fields  : PropTypes.shape({
        keyName : PropTypes.string.isRequired,
        values  : collectionPropType.isRequired
    }).isRequired,
    nodes: collectionPropType.isRequired
}

export default withStyles(styles)(SimpleTable)
