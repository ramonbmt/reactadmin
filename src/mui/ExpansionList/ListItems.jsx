import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpansionListSummary from './Summary'
import ExpansionListContent from './Content'
import { componentPropTypes } from '../../utils/propTypes'

const ExpansionListItems = ({
    content,
    fields
}) => fields.map(({ id, node, values }) => (
    <ExpansionPanel
        key={ id }
    >
        <ExpansionPanelSummary
            expandIcon={ <ExpandMore /> }
        >
            <ExpansionListSummary
                fields={{ id, values }}
            />
        </ExpansionPanelSummary>
        <ExpansionListContent
            content={ content }
            node={ node }
        />
    </ExpansionPanel>
))

ExpansionListItems.propTypes = {
    content : componentPropTypes.isRequired,
    fields  : PropTypes.arrayOf(PropTypes.shape({
        id     : PropTypes.string,
        node   : PropTypes.object,
        values : PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]))
    })).isRequired
}

export default ExpansionListItems
