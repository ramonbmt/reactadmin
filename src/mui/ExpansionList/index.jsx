import React, { useCallback, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionListItems from './ListItems'
import ExpansionListHeader from './Header'
import generateId from '../../utils/shortId'
import {
    collectionPropType,
    componentPropTypes
} from '../../utils/propTypes'

const styles = {
    root: {
        backgroundColor : '#EEE',
        color           : '#000'
    }
}

const ExpansionList = ({
    content,
    classes,
    edges,
    fields,
    loading
}) => {
    const headerTitles = useCallback(() => {
        const titles = fields.map(({ title }) => ({
            key: generateId(),
            title
        }))
        return titles
    }, [fields])

    const itemFields = useCallback(() => {
        const result = edges.map(({
            cursor,
            node
        }) => {
            const values = fields.map(({
                component,
                item,
                transform
            }) => {
                const field = item.constructor === Array
                    ? _.get(node, item)
                    : node[item]
                const value = transform
                    ? transform(field, node)
                    : field
                if (component) return component(value, node)
                return value
            })
            return {
                id: cursor,
                node,
                values
            }
        })
        return result
    }, [edges, fields])

    return (
        <Fragment>
            <ExpansionPanel
                classes={ classes }
                defaultExpanded
                expanded
            >
                <ExpansionListHeader
                    titles={ headerTitles }
                />
            </ExpansionPanel>
            { loading
                ? <span>Loading...</span>
                : (
                    <ExpansionListItems
                        content={ content }
                        fields={ itemFields }
                    />
                )
            }
        </Fragment>
    )
}

ExpansionList.propTypes = {
    classes : PropTypes.object.isRequired,
    content : componentPropTypes.isRequired,
    loading : PropTypes.bool.isRequired,
    fields  : collectionPropType.isRequired,
    edges   : collectionPropType
}

ExpansionList.defaultProps = {
    edges: []
}

export default withStyles(styles)(ExpansionList)
