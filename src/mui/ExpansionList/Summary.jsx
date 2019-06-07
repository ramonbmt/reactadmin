import React from 'react'
import PropTypes from 'prop-types'
import generateId from '../../utils/shortId'
import { ItemText } from '../../emotion'
import { componentPropTypes } from '../../utils/propTypes'

const ExpansionListSummary = ({
    fields: {
        id,
        values
    }
}) => {
    const size = 1 / values.length
    return values.map(i => (
        <ItemText
            key={ `${id}_${generateId()}` }
            size={ size }
        >
            { i.constructor === String
                ? <span>{ i }</span>
                : i
            }
        </ItemText>
    ))
}

ExpansionListSummary.propTypes = {
    fields: PropTypes.shape({
        id     : PropTypes.string,
        values : PropTypes.arrayOf(componentPropTypes)
    }).isRequired
}

export default ExpansionListSummary
