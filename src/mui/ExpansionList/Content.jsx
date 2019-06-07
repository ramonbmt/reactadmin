import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { componentPropTypes } from '../../utils/propTypes'

const styles = {
    root: {
        alignItems     : 'center',
        justifyContent : 'center'
    }
}

const ExpansionListContent = ({
    content: Content,
    classes,
    node
}) => (
    <ExpansionPanelDetails
        classes={ classes }
    >
        <Content
            node={ node }
        />
    </ExpansionPanelDetails>
)

ExpansionListContent.propTypes = {
    content : componentPropTypes.isRequired,
    classes : PropTypes.objectOf(PropTypes.string).isRequired,
    node    : PropTypes.object.isRequired
}

export default withStyles(styles)(ExpansionListContent)
