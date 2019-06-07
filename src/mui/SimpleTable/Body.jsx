import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import { collectionPropType } from '../../utils/propTypes'
import generateId from '../../utils/shortId'
import SimpleTableRow from './Row'

const SimpleTableBody = ({
    fields: {
        keyName,
        values
    },
    nodes
}) => {
    const rowKeys = useCallback(() => {
        const keys = nodes.map(() => values.map(({ title }) => `${generateId()}__${title}`))
        return keys
    }, [nodes, values])

    return (
        <TableBody>
            { nodes.map((node, index) => (
                <TableRow
                    key={ node[keyName] }
                >
                    <SimpleTableRow
                        fields={ values }
                        keys={ rowKeys[index] }
                        node={ node }
                    />
                </TableRow>
            )) }
        </TableBody>
    )
}

SimpleTableBody.propTypes = {
    fields: PropTypes.shape({
        keyName : PropTypes.string.isRequired,
        values  : collectionPropType.isRequired
    }).isRequired,
    nodes: collectionPropType.isRequired
}

export default SimpleTableBody
