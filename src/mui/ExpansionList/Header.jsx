import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { ItemText } from '../../emotion'

const ExpansionListHeader = ({
    titles
}) => {
    const size = 1 / titles.length
    return (
        <ExpansionPanelSummary>
            { titles.map(({ key, title }) => (
                <ItemText
                    key={ key }
                    size={ size }
                >
                    <span>{ title }</span>
                </ItemText>
            )) }
        </ExpansionPanelSummary>
    )
}

ExpansionListHeader.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.shape({
        key   : PropTypes.string,
        title : PropTypes.string
    })).isRequired
}

export default ExpansionListHeader
